import React from 'react';
import '../styles/error.css';

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
        height: '100vh',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="error-box"
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
          maxWidth: '28rem',
          width: '100%',
          textAlign: 'center',
          animation: 'fadeIn 0.8s ease-out',
        }}
      >
        <img
          src="/images/not-found.png"
          alt="Ikosa"
          style={{
            width: '8rem',
            height: '8rem',
            marginBottom: '1.5rem',
          }}
        />
        <h1
          style={{
            fontSize: '1.875rem',
            color: '#dc2626',
            marginBottom: '1rem',
            fontWeight: 700,
          }}
        >
          Oops! Ikosa ryabaye
        </h1>
        <p
          style={{
            color: '#4B5563',
            fontSize: '0.95rem',
            marginBottom: '1.5rem',
          }}
        >
          {errorMessage || 'Paji mwashatse ishobora kuba itabaho cyangwa mwagerageje kugera ku paji mutemerewe.'}
        </p>
        <a
          href="/"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Subira ku rubuga nyamukuru
        </a>
      </div>
      
    </div>
  );
};

export default ErrorPage;