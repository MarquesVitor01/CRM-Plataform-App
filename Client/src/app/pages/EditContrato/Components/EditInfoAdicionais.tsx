import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ClientData {
  observacoes: string;
  qrcodeText: string;
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

      <div className="form-group mb-3">
        <label htmlFor="qrcode">Texto para QR Code</label>
        <input
          type="text"
          id="qrcode"
          className="form-control"
          name="qrcodeText" // Adicione o nome correto aqui
          value={form.qrcodeText}
          onChange={handleInputChange} 
          placeholder="Digite o texto para gerar o QR Code..."
        />
      </div>

      {form.qrcodeText && (
        <div className="mt-3">
          <h5>QR Code:</h5>
          <QRCodeSVG value={form.qrcodeText} size={128} />
        </div>
      )}
    </div>
  );
};
