import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/matches?date=YYYY-MM-DD
router.get("/", async (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: "Date query parameter is required" });
  }

  try {
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      {
        params: { date },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

export default router;
