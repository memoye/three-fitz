import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
// import textToImageRoutes from "./routes/dalle.routes.js";
import textToImageRoutes from "./routes/limewire.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// app.use("/api/v1/dalle", textToImageRoutes);
app.use("/api/v1/limewire", textToImageRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Three Fitz" });
});

app.listen(8080, () => console.log("Server started on port 8080"));
