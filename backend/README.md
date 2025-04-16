Step 2 – Backend setup

cd backend
npm install
cp .env.example .env
Now open .env and put this:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=abcd1234
Then start the backend:

npm run dev

console output:

MongoDB connected ✅
Server running on http://localhost:3003