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

  // Validação inicial
  if (!name || !email || !items || !cpf || !dataVencimento) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "email", "items", "cpf", "dataVencimento"],
      received: { name, email, items, cpf, dataVencimento },
    });
  }

  // Validação da data
  let vencimentoDate;
  try {
    vencimentoDate = new Date(dataVencimento);
    if (isNaN(vencimentoDate.getTime())) {
      throw new Error("Invalid date");
    }
  } catch (error) {
    return res.status(400).json({
      error: "Invalid date format for dataVencimento",
      received: dataVencimento,
    });
  }

  const efipay = getEfiPayInstance(account);

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
    //     name: "Default Shipping Cost",
    //     value: shippingValue || 0,
    //   },
    // ],
  };

  try {
    const response = await efipay.createOneStepCharge([], body);
    return res.status(200).json(response);
  } catch (error) {
  console.error("Erro ao gerar boleto completo:", error);

  const errorInfo = {
    message: error.message || "Erro desconhecido",
    stack: error.stack,
    status: error.response?.status,
    data: error.response?.data,
    headers: error.response?.headers,
    name: error.name,
  };

  return res.status(500).json({
    error: "Error generating boleto",
    details: errorInfo,
  });
}
});

module.exports = router;
