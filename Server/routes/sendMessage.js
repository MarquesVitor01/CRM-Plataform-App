const express = require("express");
const axios = require("axios");

const router = express.Router();

// Token da API do Whatscale
const WHATSCALE_TOKEN = "1739370604824-c8a60a4fd57fc04583504efbe68a6c7b";

// Rota para enviar mensagens via Whatscale
router.post("/enviar-texto", async (req, res) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({ success: false, message: "phone e message são obrigatórios" });
        }
        // URL correta da API com o token na rota
        const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${WHATSCALE_TOKEN}`;

        // Fazendo requisição para a API do Whatscale
        const response = await axios.post(url, { phone, message }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Mensagem enviada com sucesso",
            data: response.data
        });

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Erro ao enviar mensagem", error: error.response?.data });
    }
});

module.exports = router;
