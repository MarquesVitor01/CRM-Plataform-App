const express = require("express");
const axios = require("axios");

const router = express.Router();

// Token da API do Whatscale
const WHATSCALE_TOKEN_MKT = "1748456767481-771184166057a2f729e16979725420d1";
const WHATSCALE_TOKEN_VENDAS = "1748961163722-cf42c8357e8e586623b2f22508c5c859";

router.post("/enviar-texto-mkt", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res
        .status(400)
        .json({ success: false, message: "phone e message são obrigatórios" });
    }
    const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${WHATSCALE_TOKEN_MKT}`;

    const response = await axios.post(
      url,
      { phone, message },
      {
        headers: {
          "Content-Type": "application/json",
        },
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
    return res
      .status(500)
      .json({
        success: false,
        message: "Erro ao enviar mensagem",
        error: error.response?.data,
      });
  }
});

router.post("/enviar-texto-vendas", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res
        .status(400)
        .json({ success: false, message: "phone e message são obrigatórios" });
    }
    // URL correta da API com o token na rota
    const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${WHATSCALE_TOKEN_VENDAS}`;

    // Fazendo requisição para a API do Whatscale
    const response = await axios.post(
      url,
      { phone, message },
      {
        headers: {
          "Content-Type": "application/json",
        },
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
    return res
      .status(500)
      .json({
        success: false,
        message: "Erro ao enviar mensagem",
        error: error.response?.data,
      });
  }
});

module.exports = router;
