import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

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
        "Referer": "https://www.codeconvert.ai/lua-code-generator",
        "Origin": "https://www.codeconvert.ai"
      },
      body: JSON.stringify({
        prompt,
        language
      })
    });

    const text = await upstreamResponse.text();

    res.status(upstreamResponse.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error" });
  }
});

app.get("/", (req, res) => res.send("✅ Proxy is live"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
