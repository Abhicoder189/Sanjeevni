import { chatWithGemma } from "../services/chatService.js";

export async function followupChat(req, res) {
  try {
    const { history, message } = req.body;

    const reply = await chatWithGemma(history, message);

    res.json({
      reply,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed",
    });
  }
}