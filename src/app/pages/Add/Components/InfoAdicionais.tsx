import React from 'react';

interface InfoAdicionaisProps {
  form: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const InfoAdicionais: React.FC<InfoAdicionaisProps> = ({ form, handleInputChange }) => {
  return (
    <div>
      <h4 className='text-white'>Informações Adicionais</h4>

<div className="form-group mb-3">
  <label htmlFor="observacoes" className='form-label text-white'>Observações</label>
  <textarea
    className="form-control textarea-resizable"
    id="observacoes"
    name="observacoes"
    value={form.observacoes}
    onChange={handleInputChange}
    rows={3}
    placeholder="Adicione observações ou comentários relevantes..."
    style={{ resize: 'both', overflow: 'auto' }}
  />
</div>

<div className="card text-start mb-3 p-3">
  <label className='text-dark text-center'>Selecione opções adicionais:</label>
  {["opcao1", "opcao2", "opcao3", "opcao4"].map((opcao, index) => (
    <div className="form-check" key={opcao}>
      <input
        type="checkbox"
        className="form-check-input me-2 border-black"
        id={opcao}
        name={opcao}
        onChange={handleInputChange}
      />
      <label className="form-check-label text-dark" htmlFor={opcao}>
        {opcao === "opcao1" && "Criação de Página"}
        {opcao === "opcao2" && "Anúncio"}
        {opcao === "opcao3" && "Cartão Digital"}
        {opcao === "opcao4" && "Logotipo"}
      </label>
    </div>
  ))}
</div>
    </div>
  );
};
