import React from 'react';
import SummaryComponent from '../components/SummaryComponent';
import { useLocation } from 'react-router-dom';
import './SummaryPage.css';

const SummaryPage = () => {
  const location = useLocation();
  const formData = location.state;

  return (
    <div className="summary-page">
      <SummaryComponent formData={formData} />
    </div>
  );
};

export default SummaryPage;