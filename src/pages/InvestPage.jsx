import React from 'react';
import './InvestPage.css';
import InvestmentForm from '../components/InvestmentForm';

const InvestPage = () => {
  return (
    <div className="invest-page">
      <h1>Investir</h1>
      <InvestmentForm />
    </div>
  );
};

export default InvestPage;