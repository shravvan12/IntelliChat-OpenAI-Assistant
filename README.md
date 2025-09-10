IntelliChat - OpenAI Assistant
==============================

IntelliChat is an AI-powered chatbot application built with the MERN stack. Chat with an OpenAI-powered assistant, manage chat history, and enjoy a responsive user interface.

Features
--------
- AI chatbot powered by OpenAI API
- User authentication (Signup/Login)
- Store and view chat history
- Clear chat history functionality
- Fully responsive frontend with Material-UI
- Clean and modern UI

Project Structure
-----------------
IntelliChat-OpenAI-Assistant/
  frontend/        # React + Vite frontend
  backend/         # Node.js + Express backend
  .gitignore
  README.md

Getting Started
---------------

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

   Backend `.env` file:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key

   Frontend `.env` file:
   VITE_API_URL=http://localhost:5000

4. Run the application

   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm run dev

5. Open in Browser
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

Usage
-----
1. Signup or login
2. Type your message in the chat input
3. Press Enter to send the message
4. Click Clear Chat to remove chat history
5. Your conversation will persist until cleared

Tech Stack
----------
- Frontend: React, Vite, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, bcrypt
- AI: OpenAI API

License
-------
This project is licensed under the MIT License - see the LICENSE file for details.
