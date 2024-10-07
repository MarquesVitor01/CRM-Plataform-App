import React, { useState } from "react";
import { EditOperador } from "./Components/EditOperador";
import { EditEmpresa } from "./Components/EditEmpresa";
import { EditInfoAdicionais } from "./Components/EditInfoAdicionais";
import "../Add/Components/Styles/add.css";

export const EditContrato = () => {
    const [form, setForm] = useState({
        numeroContrato: "",
        data: "",
        operador: "",
        equipe: "G MARKETING DIGITAL",
        razaoSocial: "",
        cpf: "",
        nomeFantasia: "",
        enderecoComercial: "",
        bairro: "",
        cep: "",
        estado: "",
        cidade: "",
        validade: "",
      });
    
      const [step, setStep] = useState(0);
    
      const handleInputChange = (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
      };
    
      const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
      };
    
      const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
      };
    
      const sairFicha = () => {
        window.history.back()
      }
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data: ", form);
      };
  return (
    <div>
      <div className="contrato text-center">
      <div className="container">
        <h2 className="title-contrato">Editar Informações do Cliente</h2>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <EditOperador form={form} handleInputChange={handleInputChange} />
          )}
          {step === 1 && (
            <EditEmpresa form={form} handleInputChange={handleInputChange} />
          )}
          {step === 2 && (
            <EditInfoAdicionais
              form={form}
              handleInputChange={handleInputChange}
            />
          )}

          <div className="mt-4">
            {step === 0 && (
              <button
              type="button"
              className="btn btn-danger me-2"
              onClick={sairFicha}
            >
              Sair
            </button>
            )}
            {step > 0 && (
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleBack}
              >
                Voltar
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Próximo
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Salvar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

