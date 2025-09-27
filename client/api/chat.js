// pages/api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const answer = completion.choices[0].message.content;
      res.status(200).json({ answer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ answer: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
