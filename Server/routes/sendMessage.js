const express = require("express");
const axios = require("axios");

const router = express.Router();

// Token da API do Whatscale
const WHATSCALE_TOKEN_MKT = "1745899123447-9ae171be83de487be4dbc442e39b5dbe";
const WHATSCALE_TOKEN_VENDAS = "1739444925773-7d49829341d332d43a45e6e399cc8af9";

// Rota para enviar mensagens via Whatscale
router.post("/enviar-texto-mkt", async (req, res) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({ success: false, message: "phone e message são obrigatórios" });
        }
        // URL correta da API com o token na rota
        const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${WHATSCALE_TOKEN_MKT}`;

        // Fazendo requisição para a API do Whatscale
        const response = await axios.post(url, { phone, message }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Mensagem enviada com sucesso de marketing ",
            data: response.data
        });

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Erro ao enviar mensagem", error: error.response?.data });
    }
});

router.post("/enviar-texto-vendas", async (req, res) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({ success: false, message: "phone e message são obrigatórios" });
        }
        // URL correta da API com o token na rota
        const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${WHATSCALE_TOKEN_VENDAS}`;

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
