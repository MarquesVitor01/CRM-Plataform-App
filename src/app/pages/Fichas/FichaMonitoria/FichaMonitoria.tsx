import React, { useState } from "react";
import "./Styles/fichamonitoria.css";
import { FichaMonitoriaGrave } from "./Components/FichaMonitoriaGrave";
import { FichaMonitoriaAuditoria } from "./Components/FichaMonitoriaAuditoria";

export const FichaMonitoria: React.FC = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const sairFicha = () => {
    window.history.back();
  };

  return (
    <div className="ficha-monitoria">
      {step === 0 && (
        <>
          <h2 className="text-center">De Olho na Qualidade</h2>
          <div className="container">
            <div className="row monitoria">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="col-md-5 box-quest my-3">
                  <label>
                    {index === 0 && "Se apresenta com nome ou sobrenome?"}
                    {index === 1 && "Informa que somos do Grupo Maps"}
                    {index === 2 && "Confirma com o cliente o endereço, e-mail e telefones para contato?"}
                    {index === 3 && "Informa o valor e a data de vencimento?"}
                    {index === 4 && "Informa as opções para pagamento?"}
                    {index === 5 && "Tem a confirmação do cliente?"}
                    {index === 6 && "Solicita nome e sobrenome do autorizante?"}
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`presentationYes${index}`}
                    />
                    <label className="form-check-label" htmlFor={`presentationYes${index}`}>
                      Sim
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`presentationNo${index}`}
                    />
                    <label className="form-check-label" htmlFor={`presentationNo${index}`}>
                      Não
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {step === 1 && <FichaMonitoriaAuditoria />}
      {step === 2 && <FichaMonitoriaGrave />}

      <div className="text-center mt-4">
        {step === 0 && (
          <button onClick={sairFicha} className="btn btn-danger me-2">
            Sair
          </button>
        )}

        {step > 0 && (
          <button onClick={handleBack} className="btn btn-secondary me-2">
            Voltar
          </button>
        )}
        {step < 2 ? (
          <button onClick={handleNext} className="btn btn-primary">
            Próximo
          </button>
        ) : (
          <button className="btn btn-success">Finalizar</button>
        )}
      </div>
    </div>
  );
};
