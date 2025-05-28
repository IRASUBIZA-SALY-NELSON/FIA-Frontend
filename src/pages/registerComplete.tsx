import React from 'react';
import { Link } from 'react-router-dom';

const RegisterComplete: React.FC = () => {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#1E90FF',
      color: 'white',
      textAlign: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="container" style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        color: 'black',
      }}>
        <div className="checkmark" style={{
          color: '#4CAF50',
          fontSize: '60px',
          marginBottom: '20px',
        }}>
          ✓
        </div>
        <div className="success-message" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: '#4CAF50',
        }}>
          Wakoze neza, ubutumwa bwawe bwasohotse
        </div>
        <Link
          to="/dashboard"
          className="back-button"
          style={{
            backgroundColor: '#1E90FF',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#187BCD')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1E90FF')}
        >
          Subira ku rubuga rwawe
        </Link>
      </div>
    </div>
  );
};

export default RegisterComplete;