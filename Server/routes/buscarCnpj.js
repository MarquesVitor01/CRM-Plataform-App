const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    let { cnpj } = req.query;

    if (!cnpj) {
        return res.status(400).json({ message: "O valor do CNPJ é obrigatório" });
    }

    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, "");

    // Validação básica de CNPJ
    if (cnpj.length !== 14) {
        return res.status(400).json({ message: "CNPJ inválido" });
    }

    try {
        const response = await axios.get(
            `https://api.casadosdados.com.br/v4/cnpj/${cnpj}`,
            {
                headers: {
                    "api-key": process.env.API_TOKEN_CASAS_DOS_DADOS,
                },
            }
        );

        const data = response.data;

        // Log para ver a estrutura dos dados recebidos
        console.log("Resposta da API Casa dos Dados:", data);

        const filteredData = {
            quadro_societario: data.quadro_societario?.map((socio) => ({
                nome: socio.nome,
            })) || [],
            razao_social: data.razao_social || "",
            nome_fantasia: data.nome_fantasia || "",
            situacao_cadastral: {
                situacao_atual: data.situacao_cadastral?.situacao_atual || "", // Ajustado para evitar erro se for undefined
            },
            cnpj: data.cnpj || "",
            endereco: {
                logradouro: data.endereco?.logradouro || "",
                cep: data.endereco?.cep || "", // Corrigido, removendo duplicação
                bairro: data.endereco?.bairro || "",
                cidade: data.endereco?.municipio || "",
                estado: data.endereco?.uf || "",
            },
            atividade_principal: data.atividade_principal?.descricao || "",
            contato: {
                telefone: data.contato_telefonico?.[0]?.completo || "",
                email: data.contato_email?.[0]?.email || "",
            },
        };

        return res.status(200).json(filteredData);
    } catch (error) {
        if (error.response) {
            console.error("Erro na requisição à API Casa dos Dados:", error.response.data);
            return res.status(error.response.status).json({ error: error.response.data });
        }
        console.error("Erro interno no servidor:", error.message);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});

module.exports = router;