
import React, { useState } from 'react';
import '../styles/register1.css'

interface RegisterStep1Props {
    initialData?: { name: string; email: string };
    error?: string;
    onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const RegisterStep1: React.FC<RegisterStep1Props> = ({ initialData = { name: '', email: '' }, error, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: initialData.name,
        email: initialData.email,
        password: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    });


    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/ ;  // Corrected regex
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,}$/;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'name') {
            setErrors(prev => ({ ...prev, name: !nameRegex.test(value) || value.trim() === '' }));
        }

        if (name === 'email') {
            setErrors(prev => ({ ...prev, email: !emailRegex.test(value) }));
        }

        if (name === 'password') {
            setErrors(prev => ({ ...prev, password: !passwordRegex.test(value) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nameValid = nameRegex.test(formData.name) && formData.name.trim() !== '';
        const emailValid = emailRegex.test(formData.email);
        const passwordValid = passwordRegex.test(formData.password);

        setErrors({
            name: !nameValid,
            email: !emailValid,
            password: !passwordValid,
        });

        if (nameValid && emailValid && passwordValid) {
            onSubmit(formData);
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
            // height:'700px',
            // width:'830px'
        }}>
            <div className="container" style={{
                maxWidth: '28rem',
                width: '100%',
                padding: '1.5rem',
                animation: 'fadeIn 1s ease-in-out',
            }}>
                <img
                    src="/images/register1.png"
                    alt="Umuntu ufite ikarita"
                    className="illustration"
                    style={{
                        maxWidth: '10rem',
                        margin: '0 auto 1.5rem',
                        display: 'block',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
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
                        Murakaza neza
                    </h2>
                    {error && (
                        <div className="error-message show" style={{
                            color: '#EF4444',
                            fontSize: '0.85rem',
                            marginTop: '0.25rem',
                            opacity: 1,
                            transition: 'opacity 0.3s ease',
                        }}>
                            {error}
                        </div>
                    )}
                    <form id="registrationForm" onSubmit={handleSubmit} aria-label="Kwiyandikisha Intambwe ya 1">
                        <input type="hidden" name="_csrf" value="dummy-csrf-token" />
                        <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <label htmlFor="name">Injiza izina ryawe</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                pattern="[a-zA-Z\s]+"
                                title="Only letters and spaces are allowed (No numbers or underscores)"
                                aria-describedby="nameError"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '0.5rem',
                                    background: '#F9FAFB',
                                }}
                            />
                            <div id="nameError" className={`error-message ${errors.name ? 'show' : ''}`} style={{ color: '#EF4444', display: errors.name ? 'block' : 'none' }}>
                                Injiza izina ry'umuntu gusa (Oya imibare cyangwa _)
                            </div>
                        </div>
                        <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <label htmlFor="email">Injiza aderesi ya email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                pattern="[a-zA-Z0-9._%+\-]+@gmail\.com$"
                                title="Injiza email ya Gmail (example@gmail.com)"
                                aria-describedby="emailError"
                                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', background: '#F9FAFB' }}
                            />
                            <div id="emailError" className={`error-message ${errors.email ? 'show' : ''}`} style={{ color: '#EF4444', display: errors.email ? 'block' : 'none' }}>
                                Injiza email ya Gmail (example@gmail.com)
                            </div>
                        </div>
                        <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <label htmlFor="password">Injiza ijambo ry’ibanga</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                title="Ijambo ry’ibanga rigomba kugira byibuze inyuguti n’imibare, nibura 5"
                                aria-describedby="passwordError"
                                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', background: '#F9FAFB' }}
                            />
                            <div id="passwordError" className={`error-message ${errors.password ? 'show' : ''}`} style={{ color: '#EF4444', display: errors.password ? 'block' : 'none' }}>
                                Ijambo ry’ibanga rigomba kugira byibuze inyuguti n’imibare, nibura 5
                            </div>
                        </div>
                        <button type="submit" style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            backgroundColor: '#1E40AF',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}>
                            Komeza
                        </button>
                        <div className="signup-text" style={{
              marginTop: '1rem',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'green',
              fontWeight: 700,
            }}>
               ufite konti?
               &nbsp;
              <a
                href="/login"
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
                Injira hano
              </a>
            </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterStep1;
