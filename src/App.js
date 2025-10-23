import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfessionalsList from './pages/ProfessionalsList';
import CreatePortfolio from './pages/CreatePortfolio';
import PortfolioPage from './pages/PortfolioPage';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';

// Simple navigation component
function Navigation() {
  const location = useLocation();

  // Don't show navigation on the portfolio page itself
  if (location.pathname.startsWith('/portfolio/')) {
    return null;
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#fff',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#1f2937', fontWeight: 'bold' }}>
        PortfolioBuilder
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/dashboard" style={{
          textDecoration: 'none',
          color: '#fff',
          background: '#2563eb',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: '600'
        }}>
          Dashboard
        </Link>
        <Link to="/create" style={{
          textDecoration: 'none',
          color: '#fff',
          background: '#ef4444',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: '600'
        }}>
          Create Profile
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProfessionalsList />} />
        <Route path="/create" element={<CreatePortfolio />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
        <Route path="/edit/:id" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
