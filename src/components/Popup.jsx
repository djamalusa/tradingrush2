import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({ bottom: 20, left: '50%' });

  const names = [
    'Jean', 'Alice', 'Paul', 'Marie', 'Luc', 'Emma', 'Noah', 'Léa', 'Louis', 'Chloé',
    'Hugo', 'Anna', 'Liam', 'Sofia', 'Gabriel', 'Manon', 'Ethan', 'Camille', 'Lucas', 'Sarah',
    'Nathan', 'Juliette', 'Tom', 'Laura', 'Jules', 'Elise', 'Mathis', 'Lina', 'Arthur', 'Eva',
    'Maxime', 'Zoé', 'Oscar', 'Mila', 'Victor', 'Nina', 'Théo', 'Lola', 'Adam', 'Louise',
    'Alex', 'Clara', 'Enzo', 'Nora', 'Eliott', 'Rose', 'Bastien', 'Jeanne', 'Raphaël', 'Louna'
  ];

  const amounts = [
    5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
    55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
    105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000,
    155000, 160000, 165000, 170000, 175000, 180000, 185000, 190000, 195000, 200000,
    205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 245000, 250000
  ];

  const generateRandomMessage = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    return `${randomName} a retiré ${randomAmount} FCFA !`;
  };

  const generateRandomPosition = () => {
    const bottom = Math.floor(Math.random() * 100) + 20; // Between 20px and 120px
    const left = Math.floor(Math.random() * 80) + 10 + '%'; // Between 10% and 90%
    return { bottom, left };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage('');
      setTimeout(() => {
        setMessage(generateRandomMessage());
        setPosition(generateRandomPosition());
      }, 10); // Delay before showing new message
    }, 1000); // Change every 1 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="popup" style={{ bottom: position.bottom, left: position.left }}>
      {message}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Popup;