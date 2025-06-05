import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const payload = req.body;

    const awsResponse = await fetch("https://wfhbqniijcsamdp2v3i6nts4ke0ebkyj.lambda-url.us-east-1.on.aws/api_ai_playground/ai/playground/ai/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await awsResponse.json();
    res.status(awsResponse.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
