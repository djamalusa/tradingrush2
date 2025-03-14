import React, { useState } from 'react';
import './WithdrawForm.css';
import countryData from './countryData';
import { useNavigate } from 'react-router-dom';

const WithdrawForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    fullName: '',
    phoneNumber: '',
    paymentMethod: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

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
    setLoading(true);
    setErrorMessage('');
    let percentage = 0;
    const interval = setInterval(() => {
      percentage += 1;
      if (percentage <= 99) {
        setLoadingPercentage(percentage);
      } else {
        clearInterval(interval);
        setLoading(false);
        setErrorMessage("Les paiements ne sont pas disponibles dans votre région en ce moment. Veuillez essayer à nouveau plus tard.");
      }
    }, 50); // Augmente le pourcentage toutes les 50ms
  };

  return (
    <form className="withdraw-form" onSubmit={handleSubmit}>
      <h2>Formulaire de Retrait</h2>
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
        <option value="">Sélectionnez une méthode de paiement</option>
        <option value="Orange Money">Orange Money</option>
        <option value="MTN Mobile Money">MTN Mobile Money</option>
        <option value="Wave Money">Wave Money</option>
        <option value="TMoney">TMoney</option>
        <option value="Airtel Money">Airtel Money</option>
      </select>

      <label>Montant à retirer :</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

      <button type="submit" disabled={loading}>Retirer</button>

      {loading && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${loadingPercentage}%` }}>
            {loadingPercentage}%
          </div>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default WithdrawForm;