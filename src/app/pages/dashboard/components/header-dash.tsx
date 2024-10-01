import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HeaderDash = () => {
  return (
    <>
      <section>
        <div className="">
          <div className="header-dash">
            <div className="row">
              <div className="col-md-6 bemvindo-text">
                <h3>Olá, Guilherme</h3>
               
              </div>
              <div className="col-md-6">
                
              </div>
              <div className="header-info">
                <div className="col-md-4 info-item">
                  <h3>Total de Clientes</h3>
                  <p>500</p>
                </div>
                <div className="col-md-4 info-item">
                  <h3>Nota Geral</h3>
                  <p>93.56</p>

                </div>
                <div className="col-md-4 info-item">
                  <h3>Total Pagos</h3>
                  <p>400</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
