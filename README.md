# Geography Trivia PWA

This is a Progressive Web App (PWA) that lets users play a geography trivia quiz. The app fetches questions from an OpenAI-powered backend and allows users to submit their answers to track their scores. It also provides a user-friendly interface with features such as score tracking, progress indication, and offline support.

## Features

- Displays trivia questions and tracks answers.
- Submits answers and updates the score in real-time.
- Tracks progress through 10 trivia questions.
- Service Worker and caching for offline functionality.
- Installable as a PWA with icons and manifest.

## Tools & Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces. Used to create the interactive frontend of the app.
- **Tailwind CSS**: A utility-first CSS framework for creating custom, responsive UI elements quickly.
- **Axios**: A promise-based HTTP client for the browser and Node.js. Used to fetch questions and submit answers to the server.
- **PWA (Progressive Web App)**: The app is designed to work offline and be installable on mobile devices using service workers and a `manifest.json` file.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine. Used to create the backend server for serving trivia questions and handling answer submissions.
- **Express**: A minimal and flexible Node.js web application framework. Used to create the backend API for serving trivia questions and receiving user responses.
- **Axios**: Also used in the backend to communicate with the OpenAI API for generating trivia questions and validating answers.

### OpenAI API

- **OpenAI GPT-3.5-turbo**: Used to generate random geography trivia questions and validate user responses. The app sends the current question and user's answer to the OpenAI API to determine if the answer is correct.

### PWA Setup

- **manifest.json**: Provides metadata for the app (such as name, icons, and theme) and makes it installable as a PWA.
- **Service Worker**: Caches assets for offline use, allowing the app to work without an internet connection.
- **Icons**: Custom icons for the app, used when the app is installed on a user's device, I used a random image as Icon.
