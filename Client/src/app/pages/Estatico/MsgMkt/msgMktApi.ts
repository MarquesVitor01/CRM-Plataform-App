export const gerarMsgApresentacao = (clientData: any) => `
Olá, ${clientData?.responsavel} 
EU me chamo (NOME DO ATENDENTE DO MARKETING)
Vou seguir com seu atendimento ok!
`;

export const gerarMsgSolicitacao = (clientData: any) => `
Lembre-se: durante todo o seu plano ${clientData?.validade}, você pode solicitar as atualizações em sua página! 

Nos envie até 30 fotos e 5 vídeos (máx. 30s) por mês para adicionarmos ao seu perfil. 
Isso ajuda a aumentar seu desempenho e visibilidade no Google!
`;

export const gerarMsgQr = () => `
Agora vou enviar o seu QR-CODE. Você pode:
- Imprimir e colar no balcão da loja
- Usar no cartão digital
- Mandar por WhatsApp para clientes após o atendimento  

Quanto mais avaliações ⭐⭐⭐⭐⭐, mais destaque sua empresa ganha no Google!
`;
