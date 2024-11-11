import React, { useState, useEffect } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [answer, setAnswer] = useState('');

  const fetchQuestion = async () => {
    try {
      const res = await fetch('http://localhost:3001/question');
      const data = await res.json();
      if (data.message) {
        alert(data.message);
        setQuestion("You have completed the quiz!!!");
        setCurrentQuestionIndex(0);
        setScore(data.score);
        return;
      }
      setQuestion(data.question);
      setCurrentQuestionIndex((data.currentQuestionIndex || 0) + 1);
      setResponse('');
      setAnswer('');
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      });

      const data = await res.json();
      setResponse(data.answer);
      setScore(data.score);
      fetchQuestion();
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4 font-alata">
        Geography Trivia
      </h1>
      <div id="trivia-box" className="bg-green-100 p-4 rounded mb-4 shadow-inner">
        <h2 className="text-2xl font-semibold text-green-700 mb-2 font-alata">
          Trivia Question:
        </h2>
        <div id="question" className="text-lg bg-green-100 p-4 rounded mb-4 shadow-inner">
          {question}
        </div>
      </div>
      <form id="chat-form" className="mb-4" onSubmit={handleSubmit}>
        <textarea
          id="answer"
          rows="4"
          placeholder="Type your answer here..."
          className="w-full p-3 border border-gray-300 rounded mb-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
      <h2 className="text-xl font-semibold text-green-700 mb-2 font-alata">Response:</h2>
      <div id="response" className="text-lg bg-green-100 p-4 rounded mb-4 shadow-inner">
        {response}
      </div>
      <h2 className="text-xl font-semibold text-green-700 mb-2 font-alata">Score:</h2>
      <div id="score" className="text-lg bg-green-100 p-4 rounded mb-4 shadow-inner">
        {score}
      </div>
      <h2 className="text-xl font-semibold text-green-700 mb-2 font-alata">Progress:</h2>
      <div id="progress" className="text-lg bg-green-100 p-4 rounded shadow-inner">
        {currentQuestionIndex}/10
      </div>
    </div>
  );
}

export default App;
