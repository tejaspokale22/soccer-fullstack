import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchesRoute from "./routes/matches.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the SportsOrca Match API 🏆");
});

// Matches Route
app.use("/api/matches", matchesRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
