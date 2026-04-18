const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/webhook", async (req, res) => {
  try {
    const text = req.body.queryResult.queryText;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: text }]
    });

    res.json({
      fulfillmentText: completion.choices[0].message.content
    });
  } catch (error) {
    res.json({
      fulfillmentText: "Sorry, I had an issue."
    });
  }
});

app.get("/", (req,res)=>res.send("Running"));

app.listen(process.env.PORT || 3000);
