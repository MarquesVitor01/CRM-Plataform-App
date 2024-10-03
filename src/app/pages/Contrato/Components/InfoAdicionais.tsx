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
        <label htmlFor="observacoes">Observações</label>
        <textarea
          className="form-control textarea-resizable"
          id="observacoes"
          name="observacoes"
          value={form.observacoes}
          onChange={handleInputChange}
          rows={3}
          placeholder="Adicione observações ou comentários relevantes..."
          style={{ resize: 'both', overflow: 'auto', width: '100%' }} // Adicionando largura de 100%
        />
      </div>

      <div className="mb-3">
        <label className='text-white'>Selecione opções adicionais:</label>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input me-2" 
            id="opcao1"
            name="opcao1"
            checked={form.opcao1}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="opcao1">
            Criação de Página
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input me-2" // Classe 'me-2' adiciona margem à direita
            id="opcao2"
            name="opcao2"
            checked={form.opcao2}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="opcao2">
            Anúncio
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input me-2" // Classe 'me-2' adiciona margem à direita
            id="opcao3"
            name="opcao3"
            checked={form.opcao3}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="opcao3">
            Cartão Digital
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="opcao4"
            name="opcao4"
            checked={form.opcao4}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="opcao4">
            Logotipo
          </label>
        </div>
      </div>
    </div>
  );
};
