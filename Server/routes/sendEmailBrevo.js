const SibApiV3Sdk = require('sib-api-v3-sdk');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

router.post("/", async (req, res) => {
  try {
    const { to, htmlContent } = req.body;

    if (!to || !htmlContent) {
      return res.status(400).json({ error: "Campos obrigatórios: to htmlContent" });
    }

    const sendSmtpEmail = {
      sender: {
        email: 'lembrete1@grupomapsempresas.com.br',
        name: 'Financeiro',
      },
      to: [{ email: to }],
      subject: "Aviso: Vencimento próximo do seu pagamento",
      htmlContent,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return res.json({ message: "✅ Email enviado com sucesso!", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "❌ Erro ao enviar email", details: error.message });
  }
});

module.exports = router;