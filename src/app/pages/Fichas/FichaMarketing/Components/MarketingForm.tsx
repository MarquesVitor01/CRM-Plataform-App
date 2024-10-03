import React, { useState } from 'react';

interface MarketingFormProps {
  onSubmit: (data: any) => void;
}

export const MarketingForm: React.FC<MarketingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    artLink: '',
    creationOrUpdate: 'Criação',
    qrCodeLink: '',
    responsible: '',
    completionDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="card p-4 mb-4" onSubmit={handleSubmit}>
      <h2 className='text-center'>Informações de Marketing</h2>

      <div className="form-group mb-3">
        <label htmlFor="artLink">Link da Arte Personalizada:</label>
        <input
          type="url"
          id="artLink"
          className="form-control"
          name="artLink"
          value={formData.artLink}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="creationOrUpdate">Criação ou Atualização:</label>
        <select
          id="creationOrUpdate"
          className="form-select"
          name="creationOrUpdate"
          value={formData.creationOrUpdate}
          onChange={handleChange}
        >
          <option value="Criação">Criação</option>
          <option value="Atualização">Atualização</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="qrCodeLink">Link do QrCode:</label>
        <input
          type="url"
          id="qrCodeLink"
          className="form-control"
          name="qrCodeLink"
          value={formData.qrCodeLink}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="responsible">Responsável pela Atualização:</label>
        <input
          type="text"
          id="responsible"
          className="form-control"
          name="responsible"
          value={formData.responsible}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="completionDate">Data da Conclusão:</label>
        <input
          type="date"
          id="completionDate"
          className="form-control"
          name="completionDate"
          value={formData.completionDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
};

