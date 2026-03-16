import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());

app.use(express.json()); 
app.use(pino()); 

app.use((req, res, next) => {
  next();
});

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  res
    .status(200)
    .json({ message: `Retrieved note with ID ${req.params.noteId}` });
});

app.get("/test-error", (req, res) => {
  throw new Error("Simulated server error");
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: "Internal Server Error",
    error: isProd ? undefined : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});