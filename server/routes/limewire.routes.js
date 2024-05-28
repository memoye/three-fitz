import express from "express";
import axios from "axios";
import OpenAI from "openai";
import * as dotenv from "dotenv";

const router = express.Router();

dotenv.config();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from /api/v1/lime-wire" });
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  const options = {
    method: "POST",
    url: `https://api.limewire.com/api/image/generation`,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`,
    },
    data: {
      prompt: prompt,
      aspect_ratio: "1:1",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    if (data.status == "COMPLETED")
      return res.json({ data: data.data[0].asset_url });
    else throw new Error("Something went wrong!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error || "Something went wrong" });
  }
});

export default router;
