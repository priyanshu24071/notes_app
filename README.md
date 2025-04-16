# Simple Notes App

Hey this is a simple notes app where you can signup, login and create your notes. Just like personal todo but for notes. 
---

## 💻 Tech Used

- **Backend:** Node + Express + MongoDB
- **Frontend:** React + Redux Toolkit + Tailwind CSS
- JWT for login tokens (expire in 1 hour), bcrypt for password, and rate limiter

## ⚙️ How to Run it Locally

Make sure you have **Node.js** and **MongoDB** installed and mongo is running (use Compass or terminal).

Step 1 – Clone it

git clone https://github.com/priyanshu24071/notes_app.git


cd notes-app

Step 2 – Backend setup

cd backend

npm install

cp .env.example .env

Now open .env and put this:

PORT=3003

MONGODB_URI=mongodb://localhost:27017/notesapp

JWT_SECRET=abcd1234

Then start the backend:

npm run dev

It should say something like:


MongoDB connected ✅

Server running on http://localhost:3003

Step 3 – Frontend setup

cd ../frontend

npm install

npm run start

 App will open at http://localhost:5173
