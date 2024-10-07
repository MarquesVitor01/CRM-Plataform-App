import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Condicoes: React.FC = () => {
  return (
    <div className="condicoes">
      <h2>CONDIÇÕES</h2>
      <p>
        1º- ESTOU CIENTE QUE PARA CRIAÇÃO OU ATUALIZAÇÃO DA MINHA PAGÍNA DEVO
        ENCAMINHAR PARA A EMPRESA CONTRATADA QUANDO SOLICITADO POR PARTE DA
        EQUIPE DE SUPORTE TODAS AS INFORMAÇÕES NECESSÁRIAS. 2º- ASSUMO TAMBÉM A
        TOTAL RESPONSABILIDADE E AUTORIZO QUE A EMPRESA CONTRATADA DIVULGUE OS
        MEUS DADOS COMERCIAIS NO SITE DE BUSCA. 3º- SOBRE AS CONDIÇÕES ASSUMO AS
        OBRIGAÇÕES COM ESTA PRESTAÇÃO DE SERVIÇOS DE MARKETING DIGITAL REALIZADA
        PELA EMPRESA G MAPS CONTACT CENTER LTDA CNPJ; 40.407.753/0001-30 TENDO
        CIÊNCIA DO VALOR DE R$ _____ . 4º SABENDO QUE O NÃO PAGAMENTO PODE GERAR
        A NEGATIVAÇÃO DO CPF/CNPJ JUNTO AOS ÓRGÃOS COMPETENTES (SERASA/CARTÓRIO)
        E QUE O ACEITE DOS SERVIÇOS FOI REALIZADA DE FORMA VERBAL CONFORME O
        ARTIGO 107 DO CÓDIGO CIVIL LEI 10406 DE 10 DE JANEIRO DE 2002 E QUE A
        CÓPIA DESTE CONTRATO FOI ENCAMINHADA PARA O E-MAIL PRINCIPAL INFORMADO
        ACIMA. 5º- TODAS AS SOLICITAÇÕES DEVERÃO SER ENCAMINHADAS PARA O
        DEPARTAMENTO DE MARKETING ATRAVÉS DO E-MAIL OU WHATSAPP AQUI
        DISPONIBILIZADOS. 6º- A CONTRATADA ASSUME AS OBRIGAÇÕES JUNTO A
        CONTRATANTE DE CONCLUIR E ENTREGAR OS SERVIÇOS PRESTADOS DENTRO DO
        PERÍODO DE ATÉ 72 HORAS ÚTEIS.
      </p>
      <div className="image-container">
        <FontAwesomeIcon icon={faRightLong} className="arrow right" color="yellow" />
        <a href="https://docs.google.com/document/d/16LfzgC0AeCyj98f4hQftWszwba0_fLSk/edit"><img src="http://localhost:3000/img/img-termos.webp" alt="Imagem dos Termos" /></a>
        <FontAwesomeIcon icon={faLeftLong} className="arrow left" color="yellow"/>
      </div>

      <p className="text-center text-decoration-underline fw-bold">CLIQUE NA IMAGEM ACIMA PARA VERIFICAR OS TERMOS</p>
    </div>
  );
};
