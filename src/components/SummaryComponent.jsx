import React, { useState } from 'react';
import './SummaryComponent.css';

const SummaryComponent = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidate = () => {
    if (!code) {
      setErrorMessage('Veuillez entrer le code de validation.');
      return;
    }

    setLoading(true);
    setErrorMessage(''); // Clear any previous error message
    let percentage = 0;
    const interval = setInterval(() => {
      percentage += 1;
      if (percentage <= 50) {
        setLoadingPercentage(percentage);
      } else {
        clearInterval(interval);
        setLoading(false);
        setErrorMessage("veuillez payer les frais liés a la carte d'investisseur.");
      }
    }, 50); // Increase percentage every 50ms

    setTimeout(() => {
      setShowAdditionalButtons(true);
    }, 2000); // Show buttons after 2 seconds for demonstration purposes
  };

  return (
    <div className="summary-component">
      <h2>Résumé de votre investissement</h2>
      <p>Pays : {formData.country}</p>
      <p>Nom complet : {formData.fullName}</p>
      <p>Numéro de téléphone : {formData.phoneNumber}</p>
      <p>Méthode de paiement : {formData.paymentMethod}</p>
      <p>Montant à investir : {formData.investmentAmount} FCFA</p>
      <p>Montant à recevoir : {formData.receivedAmount} FCFA</p>

      <label>Entrer le code de suivi :</label>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

      <button className="validate-button" onClick={handleValidate} disabled={loading}>
        {loading ? 'Chargement...' : 'Valider'}
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {showAdditionalButtons && (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${loadingPercentage}%` }}>
              {loadingPercentage}%
            </div>
          </div>

          <div className="additional-buttons">
            <a className="contact-button" href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              Contacter sur WhatsApp
            </a>
            <button className="payment-button" onClick={() => setErrorMessage('Veuillez payer les frais de convertion.')}>
              Recevoir mon paiement
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryComponent;
