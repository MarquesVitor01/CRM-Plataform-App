const express = require("express");
const getEfiPayInstance = require("../config/efipayConfig");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    email,
    birth,
    name,
    cpf,
    phone_number,
    items,
    shippingValue,
    account,
    dataVencimento,
    address,
  } = req.body;

  // ✅ Validação básica de campos obrigatórios
  if (!name || !email || !items || !cpf || !dataVencimento) {
    return res.status(400).json({
      message: "Missing required fields.",
      missing: { name, email, items, cpf, dataVencimento },
    });
  }

  // ✅ Cria instância do Efipay
  const efipay = getEfiPayInstance(account);
  if (!efipay || typeof efipay.createOneStepCharge !== "function") {
    console.error("❌ Instância do Efipay inválida:", efipay);
    return res.status(500).json({
      message: "Falha ao inicializar o serviço Efipay.",
    });
  }

  // ✅ Valida data de vencimento
  let vencimentoDate;
  try {
    vencimentoDate = new Date(dataVencimento);
    if (isNaN(vencimentoDate)) {
      throw new Error("Invalid date");
    }
  } catch (error) {
    return res.status(400).json({
      message: "Formato de data inválido para dataVencimento.",
      recebido: dataVencimento,
    });
  }

  // ✅ Monta payload para API Efipay
  const body = {
    payment: {
      banking_billet: {
        expire_at: vencimentoDate.toISOString().split("T")[0],
        customer: {
          name,
          email,
          cpf,
          birth,
          phone_number,
          address,
        },
      },
    },
    items,
    // shippings: [
    //   {
    //     name: "Frete padrão",
    //     value: shippingValue || 0,
    //   },
    // ],
  };

  console.log("→ Payload enviado para Efipay:");
  console.log(JSON.stringify(body, null, 2));

  try {
    const response = await efipay.createOneStepCharge([], body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Erro ao gerar boleto:");

    if (error?.response) {
      console.error("→ Status:", error.response.status);
      console.error("→ Data:", JSON.stringify(error.response.data, null, 2));
      console.error("→ Headers:", error.response.headers);
    } else if (error?.request) {
      console.error("→ Requisição feita, mas sem resposta:", error.request);
    } else if (error?.message) {
      console.error("→ Mensagem do erro:", error.message);
    } else {
      console.error("→ Erro desconhecido:", error);
    }

    return res.status(500).json({
      message: "Erro ao gerar boleto.",
      detalhes: error?.response?.data || error?.message || "Erro desconhecido.",
    });
  }
});

module.exports = router;
