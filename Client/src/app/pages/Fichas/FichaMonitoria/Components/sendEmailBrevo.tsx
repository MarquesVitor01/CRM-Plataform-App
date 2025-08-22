import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  formatarCentavosParaReais,
  formatarDataParaBR,
  formatarNomeOperador,
} from "../../../../global/utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

interface SendEmailBrevoProps {
  to: string;
  clientData: any;
}

export default function SendEmailBrevo({
  to,
  clientData,
}: SendEmailBrevoProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; background: #f9f9f9; border: 1px solid #ddd; border-radius: 12px; padding: 25px; max-width: 600px; margin: auto;">
    
    <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">📄 Contrato dos Serviços</h2>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
      Olá <strong>${
        clientData?.responsavel || "[NOME DO RESPONSÁVEL]"
      }</strong>,<br><br>
      Eu me chamo <strong>${
        formatarNomeOperador(clientData?.operador) || "[NOME OPERADOR]"
      }</strong> e será um prazer ajudar a melhorar a sua página no Google Maps! 🚀
    </p>

    <div style="background: #fff; border-radius: 8px; padding: 15px; border: 1px solid #eee; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 15px;">
        ✅ Plano escolhido: <strong>${
          clientData?.validade || "[TIPO DE PLANO]"
        }</strong><br>
        💰 Valor: <strong>R$ ${
          formatarCentavosParaReais(clientData?.valorVenda) ||
          "[VALOR DA VENDA]"
        }</strong><br>
        📅 Vencimento: <strong>${
          formatarDataParaBR(clientData?.dataVencimento) ||
          "[DATA DE VENCIMENTO]"
        }</strong>
      </p>
    </div>

    <h3 style="color: #2c3e50; margin-bottom: 10px;">📌 Serviços inclusos no plano:</h3>
    <ul style="padding-left: 20px; margin-bottom: 20px; line-height: 1.6;">
      <li>Atualização ou criação dos dados comerciais no Google Maps</li>
      <li>Otimização de palavras-chave</li>
      <li>Inclusão de até 5 bairros para ampliar a divulgação do estabelecimento</li>
      <li>QR Code direcionador para receber avaliações no Google</li>
      <li>Atualização de fotos e vídeos (mediante envio da contratante)</li>
      <li>Inclusão de redes sociais (mediante envio da contratante)</li>
      <li>Criação de artes personalizadas para postagens (mediante solicitação da contratante)</li>
      <li>Criação de logotipo (mediante solicitação da contratante)</li>
      <li>Criação de cartão digital interativo (mediante solicitação da contratante)</li>
    </ul>

    <p style="text-align: center; margin-bottom: 20px; font-size: 15px;">
      📥 Baixe seu contrato através do link abaixo:<br><br>
      <a href=${
        clientData.linkParaAssinatura
      } target="_blank" style="color: #25bfb2; font-weight: bold; text-decoration: none;">
        🔗 ${clientData.linkParaAssinatura}
      </a>
    </p>

    <div style="background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; padding: 15px; margin-bottom: 20px; font-size: 14px; line-height: 1.6; color: #856404;">
      ⚠️ <strong>Importante:</strong> Como se trata de prestação de serviços executados mediante aceite verbal, todos os serviços serão realizados antes da conclusão do pagamento.<br>
      Ressaltamos que não é possível cancelar o serviço após sua execução, visto que os benefícios já terão sido entregues à empresa.
    </div>

    <p style="font-size: 14px; margin-bottom: 20px;">
      📑 Protocolo do atendimento: <strong>2025150717</strong><br>
      📞 Central de atendimento: <strong>0800 580 2766</strong>
    </p>

    <p style="margin-top: 20px; font-size: 15px; text-align: right;">
      Atenciosamente,<br/>
      <strong style="color: #2c3e50;">Grupo Maps Empresas</strong>
    </p>
  </div>
`;

  const sendEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://crm-plataform-app-6t3u.vercel.app/send-email-brevo",
        { to, htmlContent }
      );

      if (response.status === 200) {
        toast.success("✅ Email enviado com sucesso!");
      } else {
        toast.error("❌ Erro ao enviar email");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <button
        className="btn-email-auditoria w-100"
        onClick={sendEmail}
        disabled={loading}
      >
        {loading ? (
          "Enviando..."
        ) : (
          <>
            <span>Enviar e-mail do contrato</span>
            <FontAwesomeIcon icon={faMailBulk} size="lg"  />
          </>
        )}
      </button>

      {error && <p className="text-danger mt-2">❌ {error}</p>}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
