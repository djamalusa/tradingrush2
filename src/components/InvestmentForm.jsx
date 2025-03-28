import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentForm.css';
import countryData from './countryData'; // Import the country data (assuming you have a countryData.js file)

const InvestmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    fullName: '',
    phoneNumber: '',
    paymentMethod: '',
    investmentAmount: '',
    receivedAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    const countryInfo = countryData.find((c) => c.name === country);
    const phoneNumber = countryInfo ? `+${countryInfo.dialCode}` : '';
    setFormData({ ...formData, country, phoneNumber });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/resume', { state: formData });
  };

  return (
    <form className="investment-form" onSubmit={handleSubmit}>
      <label>Pays :</label>
      <input
        list="country-list"
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
      />
      <datalist id="country-list">
        {countryData.map((country) => (
          <option key={country.code} value={country.name} />
        ))}
      </datalist>

      <label>Nom complet :</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Numéro de téléphone :</label>
      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

      <label>Méthode de paiement :</label>
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
        <option value="">Sélectionnez une méthode</option>
        <option value="Orange Money">Orange Money</option>
        <option value="MTN Mobile Money">MTN Mobile Money</option>
        <option value="Wave Money">Wave Money</option>
        <option value="TMoney">TMoney</option>
        <option value="Airtel Money">Airtel Money</option>
      </select>

      <label>Montant à investir :</label>
      <input
        type="number"
        name="investmentAmount"
        value={formData.investmentAmount}
        onChange={handleChange}
        required
      />

      <label>Montant à recevoir :</label>
      <input
        type="number"
        name="receivedAmount"
        value={formData.receivedAmount}
        onChange={handleChange} // Permet maintenant à l'utilisateur de modifier ce champ
        required
      />

      <button type="submit">Soumettre</button>
    </form>
  );
};

export default InvestmentForm;
