import { formatDateToBrazilian, formatValor } from "../../../global/utils/formatters";


export const gerarMsgParcela = (clientData: any) => `
Olá,  ${clientData.responsavel}

Seja bem vindo, ao Grupo Maps! 

Conforme conversamos via ligação, já iniciamos o processo de atualização de sua página na plataforma de buscas do Google Maps e seu plano conosco já está ATIVO.

Seu plano ${clientData.validade} de R$ ${formatValor(
  clientData.valorVenda
)} a ser pago em ${clientData.parcelas} parcela(s) de R$ ${formatValor(
  clientData.valorParcelado
)}, via boleto, ficou com o vencimento para o dia ${formatDateToBrazilian(
  clientData.dataVencimento
)}.

O protocolo de seu atendimento é:
402462535

Abaixo, o termo de uso/autorização para assessoria em divulgação no site Google Maps e prestação dos nossos serviços. 

Os serviços a serem prestados serão: 

1- Criação ou Atualização da página na Plataforma de buscas do Google Maps.  
2- Criação do Qr-Code Direcionador.  
3- PACK com 3 artes para divulgação nas redes sociais.  
4- Suporte para Criação de anúncios Patrocinados no Google Ads.  
5- Adição de 5 bairros para ampliar a visibilidade da página.  
6- Correção do pino localizador do estabelecimento.  
7- Inclusão de 30 fotos e 5 vídeos mensalmente.  
8- Alteração de endereço.  
9- Alteração no horário de funcionamento.  
10- Logotipo personalizada.  

Todos os serviços mencionados acima ⬆ estão inclusos no plano contratado.

Importante ressaltar que para um trabalho bem elaborado é de extrema importância a comunicação com nosso departamento de marketing.

Em caso de desistência será cobrado o valor proporcional dos serviços executados, conforme descrito em cláusula do contrato.

Em caso de dúvidas, estou à disposição ou entre em contato com a central de atendimento 0800 580 2766
`;

export const gerarMsgValorCheio = (clientData: any) => `
Olá,  ${clientData.responsavel}

Seja bem vindo, ao Grupo Maps! 

Conforme conversamos via ligação, já iniciamos o processo de atualização de sua página na plataforma de buscas do Google Maps e seu plano conosco já está ATIVO.

Seu plano *${clientData.validade}* de R$ ${formatValor(
  clientData.valorVenda
)} a ser pago via boleto, ficou com o vencimento para o dia ${formatDateToBrazilian(
  clientData.dataVencimento
)}.

O protocolo de seu atendimento é:
402462535

Abaixo, o termo de uso/autorização para assessoria em divulgação no site Google Maps e prestação dos nossos serviços. 

Os serviços a serem prestados serão: 

1- Criação ou Atualização da página na Plataforma de buscas do Google Maps.  
2- Criação do Qr-Code Direcionador.  
3- PACK com 3 artes para divulgação nas redes sociais.  
4- Suporte para Criação de anúncios Patrocinados no Google Ads.  
5- Adição de 5 bairros para ampliar a visibilidade da página.  
6- Correção do pino localizador do estabelecimento.  
7- Inclusão de 30 fotos e 5 vídeos mensalmente.  
8- Alteração de endereço.  
9- Alteração no horário de funcionamento.  
10- Logotipo personalizada.  

Todos os serviços mencionados acima ⬆ estão inclusos no plano contratado.

Importante ressaltar que para um trabalho bem elaborado é de extrema importância a comunicação com nosso departamento de marketing.

Em caso de desistência será cobrado o valor proporcional dos serviços executados, conforme descrito em cláusula do contrato.

Em caso de dúvidas, estou à disposição ou entre em contato com a central de atendimento 0800 580 2766
`;

export const gerarMsgRecorrencia = (clientData: any) => `
Olá,  ${clientData.responsavel}

Seja bem vindo, ao Grupo Maps! 

Conforme conversamos via ligação, já iniciamos o processo de atualização de sua página na plataforma de buscas do Google Maps e seu plano conosco já está ATIVO.

Apenas reforçando que a adesão do seu plano *${clientData.validade}* ficou no valor de R$ ${formatValor(
  clientData.valorVenda
)} a ser pago via boleto, com vencimento para o dia ${formatDateToBrazilian(
  clientData.dataVencimento
)}.

Lembrando que as demais 11 parcelas de R$ 19,90 terão vencimento todo dia ${
  clientData.diaData
} de cada mês.  

O protocolo de seu atendimento é:
402462535

Abaixo, o termo de uso/autorização para assessoria em divulgação no site Google Maps e prestação dos nossos serviços. 

Os serviços a serem prestados serão: 

1- Criação ou Atualização da página na Plataforma de buscas do Google Maps.  
2- Criação do Qr-Code Direcionador.  
3- PACK com 3 artes para divulgação nas redes sociais.  
4- Suporte para Criação de anúncios Patrocinados no Google Ads.  
5- Adição de 5 bairros para ampliar a visibilidade da página.  
6- Correção do pino localizador do estabelecimento.  
7- Inclusão de 30 fotos e 5 vídeos mensalmente.  
8- Alteração de endereço.  
9- Alteração no horário de funcionamento.  
10- Logotipo personalizada.  

Todos os serviços mencionados acima ⬆ estão inclusos no plano contratado.

Importante ressaltar que para um trabalho bem elaborado é de extrema importância a comunicação com nosso departamento de marketing.

Em caso de desistência será cobrado o valor proporcional dos serviços executados, conforme descrito em cláusula do contrato.

Em caso de dúvidas, estou à disposição ou entre em contato com a central de atendimento 0800 580 2766
`;
