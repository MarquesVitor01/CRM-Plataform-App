import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import QRCode from "qrcode";
import { formatValor } from "../../../../global/utils/formatters";

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
  const [htmlContent, setHtmlContent] = React.useState<string>("Carregando...");

  React.useEffect(() => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;  border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2c3e50; text-align: center;">📌 Lembrete de Pagamento</h2>
      <p>Olá, <strong>${clientData?.responsavel || "Nome do Responsavel"}</strong></p>
      <p>Este é um lembrete que seu pagamento está <strong>próximo do vencimento</strong>. Seguem os detalhes:</p>
      <p>Inclusão de dados e atualização na plataforma de busca do Google Maps</p>
      <p><strong>Plano:</strong> ${clientData?.contrato}</p>
      <p><strong>Valor:</strong> R$ ${formatValor(clientData?.valorVenda)}</p>

      <div style="background:#f8f9fa; padding:10px; border-radius:6px; border:1px solid #ddd; margin-bottom:15px;">
        <p><strong>📄 Código PIX:</strong></p>
        <input type="text" value="${clientData?.boleto?.[0]?.pix || ''}" readonly 
               style="width:100%; padding:4px; font-size:12px; font-family: monospace; border:1px dashed #aaa; border-radius:3px;">
        <p style="font-size:10px; color:#555; margin-top:2px;">Selecione e copie o código acima para pagamento.</p>
      </div>

      <p><strong>🔗 Link do boleto:</strong><br/>
        <a href="${clientData?.boleto?.[0]?.billetLink || '#'}" target="_blank" style="color: #0d6efd; text-decoration: none;">
          Clique aqui para acessar seu boleto
        </a>
      </p>

      <p><strong>📄 Código de Barras:</strong><br/>
        <span style="font-family: monospace; background: #fff; padding: 10px; display: inline-block; border: 1px dashed #aaa; border-radius: 5px;">
          ${clientData?.boleto?.[0]?.barcode || "Não disponível"}
        </span>
      </p>

      <p style="font-size: 14px; color: #555;">Se já realizou o pagamento, por favor, desconsidere este aviso.</p>
      <p style="margin-top: 20px;">Atenciosamente,<br/><strong>Grupo Maps Empresas</strong></p>
    </div>
  `;
  setHtmlContent(html);
}, [clientData]);


  const sendEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/send-email-brevo",
        {
          to,
          htmlContent,
        }
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
    <div
      className="card shadow-lg border-0 my-4"
    >
      <div className="card-body">
        <h5 className="card-title text-primary mb-3">
          📧 Pré-visualização do Email
        </h5>
        <div className="mb-3">
          <h6 className="text-muted">Conteúdo:</h6>
          <div
            className="border rounded bg-light"
            style={{ minHeight: "100px" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={sendEmail}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Email"}
        </button>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            ❌ {error}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
