import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvestPage from './pages/InvestPage';
import SummaryPage from './pages/SummaryPage';
import WithdrawPage from './pages/WithdrawPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Popup from './components/Popup';

function CodePage({ onCodeCorrect }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === '1234') { // Remplacez par le code souhaité
      onCodeCorrect(); // Redirige vers la page d'accueil
    } else {
      setError('Code incorrect. Veuillez réessayer.'); // Affiche un message d'erreur
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Entrez le code d'accès</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Valider</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Prend toute la hauteur de la page
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
};

function ProtectedRoute({ isCodeCorrect, children }) {
  if (!isCodeCorrect) {
    return <Navigate to="/" replace />; // Redirige vers la page de code si le code n'est pas correct
  }
  return children; // Affiche la page demandée si le code est correct
}

function App() {
  const [isCodeCorrect, setIsCodeCorrect] = useState(() => {
    // Vérifie si l'état d'authentification est déjà stocké dans le localStorage
    const savedAuth = localStorage.getItem('isCodeCorrect');
    const savedTimestamp = localStorage.getItem('codeTimestamp');
    if (savedAuth === 'true' && savedTimestamp) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(savedTimestamp, 10);
      const twelveHoursInMs = 12 * 60 * 60 * 1000; // 12 heures en millisecondes
      if (elapsedTime < twelveHoursInMs) {
        return true; // Le code est toujours valide
      }
    }
    return false; // Le code est expiré ou n'existe pas
  });

  // Met à jour le localStorage lorsque l'état change
  useEffect(() => {
    if (isCodeCorrect) {
      const currentTime = new Date().getTime();
      localStorage.setItem('isCodeCorrect', 'true');
      localStorage.setItem('codeTimestamp', currentTime.toString());
    } else {
      localStorage.removeItem('isCodeCorrect');
      localStorage.removeItem('codeTimestamp');
    }
  }, [isCodeCorrect]);

  const handleCodeCorrect = () => {
    setIsCodeCorrect(true);
  };

  return (
    <Router>
      {isCodeCorrect && <Header />} {/* Affiche le Header uniquement si le code est correct */}
      <Routes>
        <Route
          path="/"
          element={
            isCodeCorrect ? (
              <Navigate to="/accueil" replace /> // Redirige vers la page d'accueil si le code est déjà correct
            ) : (
              <CodePage onCodeCorrect={handleCodeCorrect} />
            )
          }
        />
        <Route
          path="/accueil"
          element={
            <ProtectedRoute isCodeCorrect={isCodeCorrect}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investir"
          element={
            <ProtectedRoute isCodeCorrect={isCodeCorrect}>
              <InvestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute isCodeCorrect={isCodeCorrect}>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/retirer"
          element={
            <ProtectedRoute isCodeCorrect={isCodeCorrect}>
              <WithdrawPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {isCodeCorrect && <Footer />} {/* Affiche le Footer uniquement si le code est correct */}
      <Popup />
    </Router>
  );
}

export default App;