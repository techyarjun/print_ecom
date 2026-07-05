const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Messages are required",
      });
    }

    const conversation = messages
  .map((msg) => {
    const role = msg.sender === "user" ? "User" : "Assistant";

    return `${role}: ${msg.text}`;
  })
  .join("\n");

    // if (!message || !message.trim()) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Message is required",
    //   });
    // }

    const prompt = `
You are an AI Design Assistant for a custom print e-commerce website.

The store sells customizable products such as:
- T-shirts
- Hoodies
- Mugs
- Bottles
- Phone covers
- Diaries
- Caps
- Gifts

You help customers with:
- Logo ideas
- Slogans
- Product design concepts
- Color combinations
- Typography suggestions
- Cricket team designs
- Company branding
- Friend group merchandise
- Event merchandise

Keep your answers concise and useful.

If the user wants to create a design, help gather:
1. Team, company, group, or event name
2. Preferred colors
3. Design style
4. Product type

Conversation:
${conversation}

Respond naturally to the latest user message while remembering the previous conversation.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
});

module.exports = router;
