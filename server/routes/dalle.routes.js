import express from "express";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from /api/v1/dalle" });
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt)
    return res.status(400).json({ message: "Please enter a prompt!" });

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    let image_data = response.data[0].b64_json;
    res.status(200).json({ photo: image_data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;
