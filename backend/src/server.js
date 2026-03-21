const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // ✅ FIRST load env

const connectDB = require("./config/db");

// connect DB
console.log("Connecting to DB...");
connectDB();

const app = express();

// ✅ UPDATED CORS (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://mern-todo-app-frontend-tau.vercel.app", // ✅ live frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});