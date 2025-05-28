import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnderDevelopmentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: 0, fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#f9fafb', textAlign: 'center' }}>
      <div className="avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundImage: `url('/images/home.png')`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '30px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}></div>
      <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>Mwihangane mu gihe iyi page ikiri gukorwa neza.</h1>
      <p style={{ color: '#666', fontSize: '20px' }}>Turi gukora cyane kugirango tuzarushyire ku mugaragaro vuba. Nyamuneka subira hano nyuma y'igihe!</p>
      <footer className="bottom-nav" style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #ccc', padding: '10px 0' }}>
        <a href="home" className="active" onClick={(e) => { e.preventDefault(); navigate('/home'); }}>Home</a>
        <a href="lost" onClick={(e) => { e.preventDefault(); navigate('/lost'); }}>Lost</a>
        <a href="found" onClick={(e) => { e.preventDefault(); navigate('/found'); }}>Found</a>
        <a href="notifications" onClick={(e) => { e.preventDefault(); navigate('/notifications'); }}>Notifications</a>
      </footer>
    </div>
  );
};

export default UnderDevelopmentPage;