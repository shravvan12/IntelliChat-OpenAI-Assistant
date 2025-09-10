IntelliChat - OpenAI Assistant

An AI-powered chatbot application built with MERN stack. The app allows users to chat with an OpenAI-powered assistant.

🚀 Features

AI chatbot powered by OpenAI API

User authentication (signup/login)

Store and view chat history

Fully responsive frontend

📂 Project Structure
IntelliChat-OpenAI-Assistant/
├─ frontend/        # React + Vite frontend
├─ backend/         # Node.js + Express backend
├─ .gitignore
└─ README.md

⚡ Getting Started
1. Clone the repository
git clone https://github.com/shravvan12/IntelliChat-OpenAI-Assistant.git
cd IntelliChat-OpenAI-Assistant

2. Install dependencies
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

3. Setup environment variables

Backend .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key


Frontend .env:

VITE_API_URL=http://localhost:5000

4. Run the application
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev

5. Open in Browser

Frontend is available at:

http://localhost:5173


Backend API runs on:

http://localhost:5000

🔧 Tech Stack

Frontend: React, Vite, MUI

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT, bcrypt

AI: OpenAI API

📌 Usage

Signup or login

Chat with the AI assistant

View chat history
