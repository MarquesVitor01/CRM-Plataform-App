import React, { useState } from "react";
import axios from "axios";
import { useUserData } from "../../../../global/hooks/useUserData";
import { gerarEmailProposta, gerarMsgWppProposta } from "./msgProposta";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatCelular } from "../../../../global/utils/formatters";

interface ModalPropostaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const Proposta = ({ isOpen, onClose, onSave }: ModalPropostaProps) => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  if (!isOpen) return null;

  const handleEnviar = async () => {
    if (!nomeCliente) {
      toast.warn("⚠️ Preencha o nome do cliente.");
      return;
    }
    if (!phone && !email) {
      toast.warn("⚠️ Informe pelo menos um contato (WhatsApp ou e-mail).");
      return;
    }

    setLoading(true);

    try {
      if (phone) {
        await axios.post("http://crm-plataform-app-6t3u.vercel.app/api/enviar-texto", {
          phone: `55${phone.replace(/\D/g, "")}`,
          message: gerarMsgWppProposta(
            nomeCliente,
            userData?.nome,
          ),
          equipeMsg: userData?.equipe_msg,
        });
      }

      if (email) {
        await axios.post("http://crm-plataform-app-6t3u.vercel.app/send-email-brevo-proposta", {
          to: email,
          htmlContent: gerarEmailProposta(
            nomeCliente,
            userData?.nome,
          ).corpo,
        });
      }

      toast.success("✅ Proposta enviada com sucesso!");
      onSave();
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error(error);
      toast.error("❌ Erro ao enviar proposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-content shadow-lg p-4 rounded-4 bg-white">
        <h2 className="text-2xl fw-bold text-dark mb-4 text-center">
          📩 Enviar Proposta
        </h2>

        <div className="mb-3">
          <label className="form-label fw-medium">Nome do Cliente</label>
          <input
            type="text"
            placeholder="Ex: João da Silva"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Número WhatsApp</label>
          <input
            type="text"
            placeholder="Ex: 5599999999999"
            value={formatCelular(phone)}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">E-mail</label>
          <input
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-secondary px-4"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary px-4 shadow-sm"
            onClick={handleEnviar}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Enviando...
              </span>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Proposta;
