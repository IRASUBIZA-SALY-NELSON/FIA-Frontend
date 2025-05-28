import React, { useState } from 'react';
import '../styles/register2.css'

interface RegisterStep2Props {
    initialPhone?: string;
    error?: string;
    onSubmit: (phone: string) => Promise<boolean>;
}

const RegisterStep2: React.FC<RegisterStep2Props> = ({ initialPhone = '', error, onSubmit }) => {
    const [phone, setPhone] = useState(initialPhone.replace('+250', ''));
    const [phoneError, setPhoneError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePhone = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length > 0 && !digits.startsWith('7')) {
            return 'Nimero igomba gutangira na 7';
        }
        if (digits.length > 1 && !['2', '3', '8', '9'].includes(digits[1])) {
            return 'Injiza 2, 3, 8 cyangwa 9 nyuma ya 7';
        }
        if (digits.length > 0 && digits.length < 9) {
            return 'Nimero igomba kuba ifite imibare 9';
        }
        if (digits.length === 9 && !/^7[2389]/.test(digits)) {
            return 'Nimero ya terefone ntabwo ari yo. Injiza nimero nziza (7x xxxxxxx)';
        }
        return '';
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhone(value);
        const errorMessage = validatePhone(value);
        setPhoneError(errorMessage);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const digits = phone.replace(/\D/g, '');
        const fullPhone = '+250' + digits;

        const errorMessage = validatePhone(digits);
        if (errorMessage || !/^7[2389]\d{7}$/.test(digits)) {
            setPhoneError('Nimero ya terefone ntabwo ari yo. Injiza nimero nziza (7x xxxxxxx)');
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await onSubmit(fullPhone);
            if (!success) {
                setPhoneError('Kwohereza OTP birakunze. Gerageza kongera.');
            }
        } catch (err) {
            setPhoneError('Ikosa ryabaye: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsSubmitting(false);
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
        }}>
            <div className="container" style={{
                maxWidth: '28rem',
                width: '100%',
                padding: '1.5rem',
                animation: 'fadeIn 1s ease-in-out',
            }}>
                <img
                    src="/images/register2.png"
                    alt="Karakteri ifite Terefone"
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
                        Kwemeza Terefone
                    </h2>
                    {error && (
                        <div className="server-error" style={{
                            color: '#EF4444',
                            fontSize: '0.9rem',
                            marginBottom: '1rem',
                            textAlign: 'center',
                            animation: 'fadeIn 0.5s ease',
                        }}>
                            {error === 'invalid_phone'
                                ? 'Nimero ya terefone ntabwo ari yo. Injiza nimero nziza (7x xxxxxxx)'
                                : `Ikosa ryabaye: ${error}`}
                        </div>
                    )}
                    <form id="phoneForm" onSubmit={handleSubmit} aria-label="Kwemeza Terefone">
                        <input type="hidden" name="_csrf" value="dummy-csrf-token" />
                        <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <label htmlFor="phone" style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                color: '#2D3748',
                                marginBottom: '0.5rem',
                                fontWeight: 500,
                            }}>
                                Shyiramo nimero ya terefone
                            </label>
                            <div className="phone-input" style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #E2E8F0',
                                borderRadius: '0.5rem',
                                background: '#F9FAFB',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                            }}
                                onFocus={(e) => Object.assign(e.currentTarget.style, {
                                    borderColor: '#1E90FF',
                                    boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
                                })}
                                onBlur={(e) => Object.assign(e.currentTarget.style, {
                                    borderColor: '#E2E8F0',
                                    boxShadow: 'none',
                                })}
                            >
                                <span style={{
                                    padding: '0.75rem',
                                    color: '#2D3748',
                                    fontSize: '1rem',
                                    background: '#E2E8F0',
                                    borderRadius: '0.5rem 0 0 0.5rem',
                                }}>
                                    +250
                                </span>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    maxLength={9}
                                    placeholder="7x xxxxxxx"
                                    pattern="7[2389]\d{7}"
                                    title="Injiza nimero ya MTN, Airtel cyangwa Tigo (7x xxxxxxx)"
                                    aria-describedby="phoneError"
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        border: 'none',
                                        background: 'transparent',
                                        fontSize: '1rem',
                                        outline: 'none',
                                    }}
                                />
                                <i className="fas fa-phone" style={{
                                    position: 'absolute',
                                    top: '2.8rem',
                                    right: '1rem',
                                    color: '#A0AEC0',
                                }}></i>
                            </div>
                            <div id="phoneError" className={`error-message ${phoneError ? 'show' : ''}`} style={{
                                color: '#EF4444',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                                display: phoneError ? 'block' : 'none',
                                opacity: phoneError ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                            }}>
                                {phoneError || 'Nimero ya terefone ntabwo ari yo. Injiza nimero nziza (7x xxxxxxx)'}
                            </div>
                        </div>
                        <button
                            type="submit"
                            id="submitBtn"
                            disabled={isSubmitting}
                            style={{
                                background: isSubmitting ? '#A0AEC0' : 'linear-gradient(90deg, #1E90FF, #3B82F6)',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem',
                                width: '100%',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.2s, background 0.3s',
                                transform: isSubmitting ? 'none' : undefined,
                            }}
                            onMouseOver={(e) => {
                                if (!isSubmitting) {
                                    Object.assign(e.currentTarget.style, {
                                        background: 'linear-gradient(90deg, #187BCD, #2563EB)',
                                        transform: 'translateY(-2px)',
                                    });
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isSubmitting) {
                                    Object.assign(e.currentTarget.style, {
                                        background: 'linear-gradient(90deg, #1E90FF, #3B82F6)',
                                        transform: 'translateY(0)',
                                    });
                                }
                            }}
                        >
                            {isSubmitting ? 'Subira...' : 'Komeza'}
                        </button>
                    </form>
                </div>
                <div className="progress-dots" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1.5rem',
                }}>
                    <div className="dot" style={{
                        width: '0.75rem',
                        height: '0.75rem',
                        background: '#A0AEC0',
                        borderRadius: '50%',
                        margin: '0 0.5rem',
                        transition: 'background 0.3s, transform 0.3s',
                    }}></div>
                    <div className="dot active" style={{
                        width: '0.75rem',
                        height: '0.75rem',
                        background: '#1E90FF',
                        borderRadius: '50%',
                        margin: '0 0.5rem',
                        transform: 'scale(1.3)',
                        transition: 'background 0.3s, transform 0.3s',
                    }}></div>
                    <div className="dot" style={{
                        width: '0.75rem',
                        height: '0.75rem',
                        background: '#A0AEC0',
                        borderRadius: '50%',
                        margin: '0 0.5rem',
                        transition: 'background 0.3s, transform 0.3s',
                    }}></div>
                </div>
            </div>


        </div>
    );
};

export default RegisterStep2;