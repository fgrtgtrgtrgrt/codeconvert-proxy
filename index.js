import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt, language } = req.body;

  if (!prompt || !language) {
    return res.status(400).json({ error: "Missing prompt or language" });
  }

  try {
    const upstreamResponse = await fetch("https://www.codeconvert.ai/api/free-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": "https://www.codeconvert.ai",
        "Referer": "https://www.codeconvert.ai/lua-code-generator",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({ prompt, language })
    });

    const text = await upstreamResponse.text();
    res.status(upstreamResponse.status).send(text);
  } catch (err) {
    console.error("Error contacting upstream:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

app.get("/", (req, res) => res.send("✅ Proxy is live"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running.");
});
