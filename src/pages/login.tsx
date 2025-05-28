import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/login.css';

interface LoginPageProps {
  error?: string;
  logout?: string;
  expired?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ error, logout, expired }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error feedback
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = { email, password };
    console.log('Submitting login data:', requestBody);

    try {
      const response = await fetch('http://localhost:8083/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Store token (if provided by backend) in localStorage
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        // Optionally store user info
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        // Redirect to /dashboard
        navigate('/dashboard');
      } else {
        console.error('Login failed:', data.message || data);
        // Show error feedback to the user
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
<div style={{
  fontFamily: "'Roboto', sans-serif",
  background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  overflowX: 'hidden',
  padding: '1rem' // ✅ add padding for mobile spacing
}}>

      <div className="container" style={{
        maxWidth: '28rem',
        width: '100%',
        padding: '1.5rem',
        animation: 'fadeIn 1s ease-in-out',
      }}>
        <div className="form-container" style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideUp 0.8s ease',
        }}>
          <h2 style={{
            color: '#1E40AF',
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            Injira
          </h2>

          {error && (
            <div className="error-message show" style={{
              color: '#EF4444',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
              opacity: 1,
              transition: 'opacity 0.3s ease',
            }}>
              Email cyangwa ijambo ry'ibanga sibyo!
            </div>
          )}
          {logout && (
            <div className="error-message show" style={{
              color: '#EF4444',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
              opacity: 1,
              transition: 'opacity 0.3s ease',
            }}>
              Wavuye muri sisitemu!
            </div>
          )}
          {expired && (
            <div className="error-message show" style={{
              color: '#EF4444',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
              opacity: 1,
              transition: 'opacity 0.3s ease',
            }}>
              Amasezerano yawe yarangiye!
            </div>
          )}
          {errorMessage && (
            <div className="error-message show" style={{
              color: '#EF4444',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
              opacity: 1,
              transition: 'opacity 0.3s ease',
            }}>
              {errorMessage}
            </div>
          )}

          <form method="POST" aria-label="Injira" onSubmit={handleSubmit}>
            <input type="hidden" name="_csrf" value="dummy-csrf-token" />
            <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <label htmlFor="username" style={{
                display: 'block',
                fontSize: '0.9rem',
                color: '#2D3748',
                marginBottom: '0.5rem',
                fontWeight: 500,
              }}>
                Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                required
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: '#F9FAFB',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onFocus={(e) => Object.assign(e.currentTarget.style, {
                  outline: 'none',
                  borderColor: '#1E90FF',
                  boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
                })}
                onBlur={(e) => Object.assign(e.currentTarget.style, {
                  borderColor: '#E2E8F0',
                  boxShadow: 'none',
                })}
              />
              <i className="fas fa-envelope" style={{
                position: 'absolute',
                top: '2.8rem',
                right: '1rem',
                color: '#A0AEC0',
              }}></i>
            </div>
            <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{
                display: 'block',
                fontSize: '0.9rem',
                color: '#2D3748',
                marginBottom: '0.5rem',
                fontWeight: 500,
              }}>
                Ijambo ry'ibanga
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: '#F9FAFB',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onFocus={(e) => Object.assign(e.currentTarget.style, {
                  outline: 'none',
                  borderColor: '#1E90FF',
                  boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
                })}
                onBlur={(e) => Object.assign(e.currentTarget.style, {
                  borderColor: '#E2E8F0',
                  boxShadow: 'none',
                })}
              />
              <i className="fas fa-lock" style={{
                position: 'absolute',
                top: '2.8rem',
                right: '1rem',
                color: '#A0AEC0',
              }}></i>
            </div>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(90deg, #1E90FF, #3B82F6)',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                width: '100%',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.3s',
              }}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, {
                background: 'linear-gradient(90deg, #187BCD, #2563EB)',
                transform: 'translateY(-2px)',
              })}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, {
                background: 'linear-gradient(90deg, #1E90FF, #3B82F6)',
                transform: 'translateY(0)',
              })}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Injira
            </button>
            <div className="signup-text" style={{
              marginTop: '1rem',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'green',
              fontWeight: 700,
            }}>
              Nta konti ufite?  &nbsp;
              <a
                href="/register/step1"
                style={{
                  color: '#1E90FF',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, {
                  textDecoration: 'underline',
                  color: '#2563EB',
                })}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, {
                  textDecoration: 'none',
                  color: '#1E90FF',
                })}
              >
                Iyandikishe hano
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;