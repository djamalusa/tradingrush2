import React, { useState } from 'react';
import './Header.css';
import logo from '../logo1.png'; // Import the logo image

const Header = () => {
  const items = [
    { name: "Accueil", href: "/" },
    { name: "Investir", href: "/investir" },
    { name: "Retirer", href: "/retirer" },
  ];

  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      {/* Section pour le logo */}
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" /> {/* Use the imported logo image */}
      </div>

      {/* Menu simplifié avec animations */}
      <nav>
        <ul className={`list ${menuOpen ? 'show' : ''}`}>
          {items.map((item, index) => (
            <li key={item.name}>
              <a
                className={`item ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
                href={item.href}
              >
                {item.name}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </a>
            </li>
          ))}
        </ul>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle} id="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;