import React from "react";

export const FichaMonitoriaGrave = () => {
  return (
    <>
          <h2 className="text-center">Questões Graves</h2>
      <div className="row monitoria">
        <div className="col-md-5 box-quest">
          <label>Informa que somos da Google?</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="googleInfoYes"
            />
            <label className="form-check-label" htmlFor="googleInfoYes">
              Sim
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="googleInfoNo"
            />
            <label className="form-check-label" htmlFor="googleInfoNo">
              Não
            </label>
          </div>
        </div>

        <div className="col-md-5 box-quest">
          <label>Vendas sem compromisso?</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="discountWithoutAuthorizationYes"
            />
            <label
              className="form-check-label"
              htmlFor="discountWithoutAuthorizationYes"
            >
              Sim
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="discountWithoutAuthorizationNo"
            />
            <label
              className="form-check-label"
              htmlFor="discountWithoutAuthorizationNo"
            >
              Não
            </label>
          </div>
        </div>

        <div className="col-md-5 box-quest">
          <label>Informa uma data de vencimento e preenche outra na ficha?</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="vencimentoYes"
            />
            <label className="form-check-label" htmlFor="vencimentoYes">
              Sim
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="vencimentoNo"
            />
            <label className="form-check-label" htmlFor="vencimentoNo">
              Não
            </label>
          </div>
        </div>

        <div className="col-md-5 box-quest">
          <label>Digite aqui suas observações:</label>
          <textarea
            className="form-control textarea-obs"
            id="observation"
            cols={4}
            placeholder="Digite aqui suas observações"
          ></textarea>
        </div>
      </div>
      </>
  );
};
