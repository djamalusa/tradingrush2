import React, { useState } from 'react';
import './HomePage.css';

// Import des images depuis un dossier local
import graphiqueImage from '../t.png';
import tradeImage from '../t1.webp';
import ecranImage from '../t2.webp';
import analyserImage from '../t3.webp';
import apprendreImage from '../t4.webp';
import chatImage from '../t5.webp';

// Import de la vidéo depuis un dossier local
import presentationVideo from '../assets/presentation.webm';

const HomePage = () => {
  // Liste des fonctionnalités avec leurs images correspondantes
  const features = [
    { name: "Graphique", image: graphiqueImage },
    { name: "Trade", image: tradeImage },
    { name: "Écran", image: ecranImage },
    { name: "Analyser", image: analyserImage },
    { name: "Apprendre", image: apprendreImage },
    { name: "Chat", image: chatImage },
  ];

  // État pour suivre l'image active, initialisé avec la première image
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <div className="home">
      <h1>LOOK FIRST/ <br/> THEN LEAP.</h1>
      <p>Investissez dès aujourd'hui et obtenez des rendements élevés !</p>
      <a href="/investir" className="cta-button">
        Commencer à Investir
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
      <a href="/retirer" className="cta-button secondary">
        Retirer dès maintenant
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>

      {/* Nouvelle section */}
      <div className="market-section">
        <h2>Là où le monde fait vivre les marchés</h2>
        <p>Rejoignez 100 millions de traders et investisseurs qui prennent leur avenir en mains.</p>
        <div className="features">
          {features.map((feature, index) => (
            <span
              key={index}
              onClick={() => setActiveImage(feature.image)} // Afficher l'image au clic
              className={activeImage === feature.image ? 'active' : ''}
            >
              {feature.name}
            </span>
          ))}
        </div>
        

        {/* Afficher l'image active */}
        {activeImage && (
          <div className="feature-image">
            <img src={activeImage} alt="Fonctionnalité" />
          </div>
        )}
          
        {/* Bloc pour la vidéo */}
        <div className="video-container">
          <video autoPlay muted loop controls>
            <source src={presentationVideo} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      </div>

      {/* Section "Take Your Trading Everywhere with the XM App" */}
      <div className="xm-app-section">
        <h2>Emportez votre trading partout avec Trading Rush</h2>
        <p>Négocier des actions n'a jamais été aussi simple ! Négociez où que vous soyez, à tout moment, avec Trading Rush tout-en-un.</p>
        
        {/* Liste des fonctionnalités */}
        <ul className="xm-features">
          <li>Surveillez vos comptes</li>
          <li>Dépôt et demande de retrait</li>
          <li>Accéder aux outils de trading et à la formation</li>
        </ul>

        {/* QR Code ou bouton de téléchargement */}
        <div className="download-section">
        </div>
      </div>
    </div>
  );
};

export default HomePage;