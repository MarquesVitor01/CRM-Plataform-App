import { useCallback } from "react";
import axios from "axios";

export function useMensagem() {
  const enviarMensagem = useCallback(
    async (mensagem: string, celularComCodigo: string, equipeMsg: string) => {
      try {
        const response = await axios.post(
          "http://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
          { phone: celularComCodigo, message: mensagem, equipeMsg }
        );
        alert(response.data.success ? "Mensagem enviada com sucesso!" : "Falha ao enviar a mensagem.");
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("Ocorreu um erro ao enviar a mensagem.");
      }
    },
    []
  );

  return { enviarMensagem };
}
