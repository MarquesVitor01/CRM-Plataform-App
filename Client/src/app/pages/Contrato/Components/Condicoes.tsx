import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";

export const Condicoes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente: ", error);
      }
    };

    fetchClientData();
  }, [id]);
  const formatValor = (value: string | number | undefined): string => {
    if (!value) return "0,00"; // Retorna um valor padrão caso seja undefined ou null
    const num = typeof value === "number" ? value.toFixed(2) : value.replace(/\D/g, "");
    return num.replace(/(\d)(\d{2})$/, "$1,$2");
  };
  return (
    clientData && (
      <div className="condicoes card p-4">
        <h5 className="text-center">CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE MARKETING DIGITAL</h5>
        <p className="text-condicoes">
          {" "}
          As partes têm entre si justo e acordado celebrar o presente “CONTRATO DE PRESTAÇÃO DE SERVIÇOS
 PUBLICITÁRIOS E MARKETING DIGITAL”, que seguirá as cláusulas e condições abaixo estabelecidas. <br /><br />
          CLÁUSULA PRIMEIRA – DAS DECLARAÇÕES E OBJETO <br />
 1.1 A contratada é uma credenciada que trabalha com tráfego orgânico e/ou tráfego pago. <br />
 1.2 Constitui objeto do presente contrato a prestação dos seguintes serviços, pela contratada, em
 favor da contratante: <br /><br />
 i. Inserção de mapeamento na plataforma Google Maps; <br />
 ii. Adição de 5 bairros escolhidos pela contratante para ampliar a cobertura e divulgação na
 plataforma de pesquisa do Google; <br />
 iii. Criação e/ou aprimoramento do perfil da contratante junto ao Google; <br />
 iv. Criação e/ou aprimoramento e/ou atualização do cartão de visita digital (Quando solicitado) <br />
 v. Inclusão do Botão direcionador do WhatsApp <br />
 vi. Inclusão da redes sociais Facebook/ Instagrm / TikTok / Youtube  <br />
vii. Envio de Certificado em PDF de perfil atualizado junto a Plataforma. <br />
 viii. Envio de arte em PDF personalizada para recebr avaliações na pagina.  ix. Durante o periodo do
 plano contratado a contratada ira receber mensalmente mediante solicitação 3 imagens meramente
 ilustrativas para auxiliar com a divulgação em suas redes sociais.  x. Inclusão de 30 fotos e 5 videos
 mensalmente durante o periodo do plano contratado <br /><br />
 
1.2.1 Os serviços descritos no item anterior, que são serviços de “meio”, tem como finalidade aprimorar as
 informações e a imagem da contratante junto ao Google, com vistas a melhorar sua visibilidade
 perante os usuários dos serviços oferecidos pelo Google. 1.2.2 A contratante deverá apresentar para a
 contratada seu endereço completo, seus meios de contato, seus ramos de atuação profissional e/ou
 comercial e todas as informações que sejam possíveis se serem inseridas junto ao Google. 1.2.3 Em
 razão do serviço prestado pela contratada, todas as pessoas que, dentro de um raio de 15 (quinze)
 quilômetros do estabelecimento comercial da contratante, realizarem pesquisas junto ao Google
 utilizando as palavras chaves de busca/engajamento indicadas encontrarão aos dados e as
 informações da contratante.<br />
 1.2.4 As fotos e videos enviadas a contratada , não receberão nenhum tipo de tratamento, por regras do
 Google.<br />
 1.2.5 A título de cortesia, a contratada dará suporte profissional de atualização para a contratante
 durante o período do seu plano contratado, a contar do seu aceite verbal conforme gravação do
 atendimento disponivel neste documento de Forma Online. Para acionar o suporte, a contratante
 deverá entrar em contato através do telefone Whatsapp 11 4200-6110  ou através da central de
 atendimento 0800 580 2766  e/ou e-mail; marketing@grupomapsempresas.com.br<br />
 1.2.6 Este contrato é um CONTRATO DE PRESTAÇÃO DE SERVIÇOS, e reiteramos que a empresa G Maps
 Contact Center Eireli não possui vínculos com a Google Brasil, sendo somente uma empresa que presta
 serviços técnicos<br /><br />

 CLÁUSULA SEGUNDA – DAS OBRIGAÇÕES DAS PARTES<br /><br />
 2.1 As partes obrigam-se, na execução do presente contrato, a:<br /><br />
 a. Adimplir integral e tempestivamente todas as obrigações descritas neste contrato; b. Informar a outra
 parte sobre qualquer ocorrência que possa vir a afetar ou que possa, de alguma forma, interferir no bom
 andamento dos serviços contratados; c. A contratante é responsável por todas as informações
 apresentadas à contratada; d. A contratada, após aceite deste contrato conforme mencionado em
 gravação do atendimento, terá o prazo de até 30 (trinta) dias para a realização dos serviços
 contratados. e. Eventuais alterações cadastrais devem ser informadas e requeridas pelo contratante à
 contratada, que terá o prazo de até 10 dias para executá-los. f. Caso haja reforma significativa que
 descaracterize o ambiente externo e/ou interno e/ou caso haja alteração de endereço e/ou qualquer
 outra informação da contratante, esta deverá comunicar à contratada e requerer que sejam feitas as
 respectivas alterações. A contrata, por sua vez, terá o prazo de até 30 (trinta) dias para realizar tais
 serviços.<br /><br />
 CLÁUSULA TERCEIRA – DO PRAZO CONTRATUAL 3.1 O presente contrato entra em vigor a partir de sua
 assinatura e se encerrará quando do adimplemento das obrigações aqui descritas, podendo ser
 prorrogado, de maneira expressa, por meio de termo aditivo celebrado pelas partes. <br /><br />
 <div className="page-break"></div>
 CLÁUSULA QUARTA – DO PAGAMENTO 4.1 A contratante pagará à contratada a importância mencionada
 no ITEM (Condições de Pagamento), de acordo com o meio de pagamento escolhido mediante adesão.
 4.2 Caso a contratante opte por realizar o pagamento integral do plano contratado o mesmo terá um
 desconto de 5%. 4.3 Utilizando cartão de crédito como parcelamento, fica ciente que cobranças futuras
 serão realizadas pela operadora do cartão de crédito e não pela contratada, que não tem nenhum
 poder de gerência sobre a cobrança de pagamentos parcelados através de cartão de crédito.<br /><br />
 CLÁUSULA QUINTA – DA RESCISÃO 5.1 Caso a contratante requeira a rescisão deste contrato, aplicar
se-ão as seguintes condições: a. Independentemente da data dessa desistência e da antecedência
 dessa data em relação ao início da execução dos serviços, a contratante estará sempre obrigada a
 assumir integralmente todos os custos e/ou despesas que já tenham comprovadamente sido
 despendidos pela contratada para a execução dos serviços contratados; b. Caso a desistência ocorra
 em até 7 (Sete) dias úteis após o início da execução dos serviços contratados e os serviços ainda não
 tenham sido concluídos, a contratante deverá pagar, à título de multa, o valor correspondente a 50%
 (cinquenta por cento) da importância descrita no item (Condições de Pagamento). c. Após a realização
 dos serviços por parte da contratada, caso a contratante queira rescindir o contrato, aplicar-se-á multa
 compensatória correspondente à importância descrita na CLÁUSULA QUARTA –DO PAGAMENTO no item
 4.1, motivo pelo qual nenhum valor será devolvido à contratante. Essa condição contratual é prevista
 considerando que após a execução dos serviços contratados a contratada terá consumado suas
 obrigações e a contratante estará usufruindo e beneficiando se dos serviços contratados.<br /><br />

 CLÁUSULA SEXTA - LEI GERAL DE PROTEÇÃO DE DADOS<br />
 6.1As partes comprometem-se a manter dados sensíveis tratados na Lei 13.709/18 a que tiver acesso em
 decorrência do cumprimento do objeto deste contrato, dando o justo tratamento aos referidos dados no que
 tange à coleta, registro, armazenamento e divulgação.<br /><br />
 6.2 As partes comprometem-se a cumprir, e fazer com que seus funcionários cumpram, integralmente a Lei
 13.709/18 no que for cabível ao objeto do presente contrato, obtendo o consentimento do titular da
 informação para análise e coleta de dados sensíveis e informando à contratada acerca de quaisquer incidentes
 relativo à perda, acesso indevido, invasão de hackers, detecção de malwares ou quaisquer outros eventos que
 possam comprometer a privacidade de dados dos usuários do software.<br />
 6.3 As partes poderão exigir umas das outras, a qualquer tempo, que a outra demonstre estar cumprindo os
 termos da Lei Geral de Proteção de Dados e obtendo os consentimentos dos titulares das informações,
 podendo rescindir imediatamente o presente contrato caso a parte contrária não comprove estar cumprindo
 os termos da Legislação em vigor.<br /><br />
 CLÁUSULA SETIMA – DAS DISPOSIÇÕES GERAIS<br />
 7.1 As obrigações e/ou direitos decorrentes deste contrato não poderão ser cedidos ou transferidos por
 qualquer das partes, nem dados como garantia de obrigações sem a prévia e expressa anuência, por escrito,
 da outra parte.<br />
 7.2 Fica expressamente estipulado que não se estabelece por força do presente contrato verbal qualquer
 espécie de vínculo empregatício, associação e/ou parceria entre as partes.<br />
 7.3 O presente contrato é celebrado em caráter irrevogável e irretratável, obrigando as partes, seus herdeiros
 e sucessores a qualquer título.<br />
 7.4 Fica desde já eleito o foro da comarca de SÃO PAULO – SP para dirimir quaisquer litígios, contendas e/ou
 discussões oriundas deste contrato, com renúncia expressa a qualquer outro foro, por mais privilegiado que
 seja. E por estarem justas e contratadas.
        </p>
        {/* <div className="image-container">
          <FontAwesomeIcon
            icon={faRightLong}
            className="arrow right"
            color="yellow"
          />
          <a href="https://drive.google.com/file/d/17YZoqz97bDo_1fWqzaDggmdN1iQSnMtn/view">
            <img src="/img/img-termos.webp" alt="Imagem dos Termos" />
          </a>
          <FontAwesomeIcon
            icon={faLeftLong}
            className="arrow left"
            color="yellow"
          />
        </div> */}

        {/* <p className="text-center text-decoration-underline fw-bold">
          CLIQUE NA IMAGEM ACIMA PARA VERIFICAR OS TERMOS
        </p> */}
        <div className="mx-auto w-100 text-center">
          <h5 className="mt-2">CENTRAL DE ATENDIMENTO</h5>
          <p>0800 580 2766</p>
          <p>
            <a href="mailto:MARKETING@GRUPOMAPSEMPRESAS.com.br">
              MARKETING@GRUPOMAPSEMPRESAS.com.br
            </a>
            <br />
            <a href="mailto:CONTATO@GRUPOMAPSEMPRESAS.com.br">
              CONTATO@GRUPOMAPSEMPRESAS.com.br
            </a>
          </p>
        </div>
      </div>
    )
  );
};
