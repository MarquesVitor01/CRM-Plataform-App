import React from "react";

export const FichaMonitoriaAuditoria = () => {
  return (
    <>
        <>
            <h3 className="text-center">Auditoria</h3>
          <div className="row monitoria">
            <div className="col-md-5 box-quest">
              <label>Confirma o nome e o sobrenome do cliente?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="presentationYes"
                />
                <label className="form-check-label" htmlFor="presentationYes">
                  Sim
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="presentationNo"
                />
                <label className="form-check-label" htmlFor="presentationNo">
                  Não
                </label>
              </div>
            </div>
            <div className="col-md-5 box-quest">
              <label>Confirma o valor e a data de vencimento?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="presentationYes"
                />
                <label className="form-check-label" htmlFor="presentationYes">
                  Sim
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="presentationNo"
                />
                <label className="form-check-label" htmlFor="presentationNo">
                  Não
                </label>
              </div>
            </div>
          </div>
        </>
    </>
  );
};
