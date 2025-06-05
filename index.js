import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { prompt, language } = req.body;

    const response = await fetch("https://www.codeconvert.ai/api/free-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, language })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Upstream error:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

app.get("/", (req, res) => res.send("✅ Proxy is live"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
