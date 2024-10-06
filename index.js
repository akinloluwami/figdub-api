import express from "express";
import dotenv from "dotenv";
import { Dub } from "dub";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

export const dub = new Dub({
  token: process.env.DUB_API_KEY,
});

app.post("/create-link", async (req, res) => {
  const { url, key } = req.query;

  if (!url) {
    return res.status(400).json({ message: "Please provide a URL." });
  }

  try {
    const result = await dub.links.create({
      url,
      domain: "fig.page",
      key,
    });

    res.status(200).json({ shortLink: result.shortLink });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
