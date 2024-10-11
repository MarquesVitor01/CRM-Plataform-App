import React from 'react';

interface ClientData {
  observacoes: string;
}
interface EditInfoAdicionaisProps {
  form: ClientData | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const EditInfoAdicionais: React.FC<EditInfoAdicionaisProps> = ({ form, handleInputChange }) => {
  if (!form) return null;
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
          style={{ resize: 'both', overflow: 'auto', width: '100%' }}
        />
      </div>
    </div>
  );
};
