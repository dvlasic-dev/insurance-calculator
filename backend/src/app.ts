import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import coverage from "./routes/coverage";
import discount from "./routes/discount";
import city from "./routes/city";
import ageGroup from "./routes/ageGroup";
import estimate from "./routes/estimate";

const app = express();
const port = 3000;

app.use(json());
app.use(cors());
dotenvConfig();

async function main() {
  //replace with .env
  await mongoose.connect(process.env.DB_URL);
}

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!22");
});

app.use("/api/coverage", coverage);
app.use("/api/discount", discount);
app.use("/api/age-group", ageGroup);
app.use("/api/city", city);
app.use("/api/estimate", estimate);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
