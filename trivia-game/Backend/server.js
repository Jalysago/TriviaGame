const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let score = 0;
let currentQuestion = "";
let currentQuestionIndex = 0;
const totalQuestions = 10;


async function getRandomQuestion() {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "You are a geography expert." },
        { role: 'user', content: "Ask a random easy geography trivia question appropriate for a teenager. Do not repeat any question, and only respond with the question." }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching question:', error.response ? error.response.data : error.message);
    return "Error: Unable to fetch question.";
  }
}


app.get('/question', async (req, res) => {
  if (currentQuestionIndex >= totalQuestions) {
    res.json({ question: "You have completed the quiz!", score });
    return;
  }

  currentQuestion = await getRandomQuestion();
  res.json({ question: currentQuestion, currentQuestionIndex });
});


app.post('/chat', async (req, res) => {
  const userResponse = req.body.answer;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "You are a geography expert." },
        { role: 'user', content: currentQuestion },
        { role: 'user', content: `The user responded '${userResponse}'. Is this correct? Answer only true or false, do not add a final point to your answer.` }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = response.data.choices[0].message.content.trim().toLowerCase();
    if (result === "true" || result === "true.") {
      score++;
    }

    currentQuestionIndex++;
    res.json({ answer: result, score });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error communicating with OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});