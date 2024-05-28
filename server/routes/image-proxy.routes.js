import express from "express";
import axios from "axios";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl)
    return res.status(400).json({ message: "No image URL provided" });

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(response.data);
    res.status(200).json({ message: imageUrl });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send(JSON.stringify(error));
  }
});

export default router;
