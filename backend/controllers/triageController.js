import { analyzeSymptoms } from "../services/gemmaService.js";

export const triage = async (req, res) => {
  try {
    const { message, language } = req.body;

    const result = await analyzeSymptoms(
      message,
      language
    );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};