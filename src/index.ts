import express from "express";
import cors from "cors";
import "dotenv/config";
import { generateLead } from "./controller/lead-controller";

const app = express();

app.use(express.json());

console.log("Origin", process.env.CLIENT_ENDPOINT);

app.use(
  cors({
    origin: process.env.CLIENT_ENDPOINT,
  })
);

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.post("/generate-lead", generateLead);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
