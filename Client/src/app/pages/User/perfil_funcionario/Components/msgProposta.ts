import { formatarNomeOperador } from "../../../../global/utils/formatters";

export const gerarMsgWppProposta = (
  nomeCliente: string,
  nomeOperador: string,
) => {
  return `Oi ${nomeCliente}! Tudo bem? 🙂
Me chamo ${formatarNomeOperador(nomeOperador)}, do Grupo Maps.

Preparei sua proposta e já deixei disponível neste link:
👉 https://drive.google.com/file/d/1itHhGgOo0MkSqDLejb0cv3rjI0_NNUZ5/view?usp=sharing

Dá uma olhadinha e me fala o que achou! 😉`;
};

export const gerarEmailProposta = (
  nomeCliente: string,
  nomeOperador: string,
) => {
  const assunto = "Proposta Comercial – Gestão de Perfil no Google";

  const corpo = `Olá ${nomeCliente},

Sou o ${formatarNomeOperador(nomeOperador)}, do Grupo Maps.
Conforme conversamos, preparei a Proposta Comercial para Gestão e Otimização do Perfil da sua empresa no Google, que você pode acessar através do link abaixo:
</br>
👉 <a href = "https://drive.google.com/file/d/1itHhGgOo0MkSqDLejb0cv3rjI0_NNUZ5/view?usp=sharing">Clique aqui para visualizar a proposta</a>
</br></br>
Este projeto foi estruturado para aumentar a visibilidade do seu negócio, atrair novos clientes e melhorar o posicionamento da sua empresa nas buscas do Google.
</br>
Estou à disposição para esclarecer dúvidas e seguir com os próximos passos.
</br>
</br>
</br>
Atenciosamente,  </br>
${nomeOperador}  </br>
MARKETING – Grupo Maps  </br>
📞 0800 580 2766  </br>
📧 comercial@grupomapsempresas.com.br`;

  return { assunto, corpo };
};
