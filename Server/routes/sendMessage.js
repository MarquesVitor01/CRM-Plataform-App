const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_KEYS = {
  equipe_nova: "1757002495125-6ca9eb169caec4c3eecb21d6e40898f8",
  equipe_supervisao: "1757002495125-6ca9eb169caec4c3eecb21d6e40898f8",
};

router.post("/enviar-texto", async (req, res) => {
  try {
    const { phone, message, equipeMsg } = req.body;

    if (!phone || !message || !equipeMsg) {
      return res.status(400).json({
        success: false,
        message: "Campos phone, message e equipeMsg são obrigatórios",
      });
    }

    const API_KEY = API_KEYS[equipeMsg];

    if (!API_KEY) {
      return res.status(400).json({
        success: false,
        message: `Equipe ${equipeMsg} não possui chave de API configurada.`,
      });
    }

    const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${API_KEY}`;

    const response = await axios.post(
      url,
      { phone, message },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Mensagem enviada com sucesso",
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Erro ao enviar mensagem",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
