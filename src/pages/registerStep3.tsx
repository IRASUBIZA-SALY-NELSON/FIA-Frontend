// import React, { useState, useEffect, useRef } from 'react'
// import '../styles/register3.css'

// interface RegisterStep3Props {
//     phone: string;
//     initialFormData: { name: string; email: string; password: string };
//     onResendOTP: (phone: string) => Promise<boolean>;
//     onVerifyOTP: (phone: string, otp: string) => Promise<boolean>;
//     onRegister: (formData: { name: string; email: string; phone: string; password: string; role: string }) => Promise<boolean>;
//     onComplete: () => void;
// }

// const RegisterStep3: React.FC<RegisterStep3Props> = ({ phone, initialFormData, onResendOTP, onVerifyOTP, onRegister, onComplete }) => {
//     const [otp, setOtp] = useState(['', '', '', '']);
//     const [timeLeft, setTimeLeft] = useState(60);
//     const [isExpired, setIsExpired] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(prev => {
//                 if (prev <= 1) {
//                     clearInterval(timer);
//                     setIsExpired(true);
//                     setErrorMessage('OTP yarangiye. Kanda "Subiramo OTP" kugirango woherezwe indi.');
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     const handleOtpChange = (index: number, value: string) => {
//         const newOtp = [...otp];
//         newOtp[index] = value.replace(/\D/g, '').slice(0, 1);
//         setOtp(newOtp);

//         if (value && index < 3) {
//             inputRefs.current[index + 1]?.focus();
//         }

//         if (!value && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Backspace' && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     const isOtpComplete = otp.every(digit => digit.length === 1);

//     const handleResend = async (e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault();
//         if (timeLeft > 0) return;

//         setIsSubmitting(true);
//         setErrorMessage('');
//         try {
//             const success = await onResendOTP(phone);
//             if (success) {
//                 setOtp(['', '', '', '']);
//                 setTimeLeft(60);
//                 setIsExpired(false);
//                 setErrorMessage('');
//                 alert(`OTP yongeye yoherejwe kuri ${phone}`);
//             } else {
//                 setErrorMessage('Ntabwo OTP yashoboye gusoherezwa');
//             }
//         } catch (error) {
//             setErrorMessage(`Ikosa: ${error instanceof Error ? error.message : 'Unknown error'}`);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (isExpired) {
//             setErrorMessage('OTP yarangiye. Subiramo OTP.');
//             return;
//         }

//         const otpCode = otp.join('');
//         setIsSubmitting(true);
//         setErrorMessage('');

//         try {
//             const otpValid = await onVerifyOTP(phone, otpCode);
//             if (!otpValid) {
//                 setErrorMessage('OTP itariyo. Gerageza kongera.');
//                 return;
//             }

//             const formData = { ...initialFormData, phone, role: 'USER' };
//             const registerSuccess = await onRegister(formData);
//             if (registerSuccess) {
//                 onComplete();
//             } else {
//                 setErrorMessage('Iyandikisha byanze');
//             }
//         } catch (error) {
//             setErrorMessage(`Ikosa: ${error instanceof Error ? error.message : 'Unknown error'}`);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const formatTimer = () => {
//         const minutes = Math.floor(timeLeft / 60);
//         const seconds = timeLeft % 60;
//         return `(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')})`;
//     };

//     return (
//         <div style={{
//             fontFamily: "'Roboto', sans-serif",
//             background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
//             minHeight: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             margin: 0,
//             overflowX: 'hidden',
//         }}>
//             <div className="container" style={{
//                 maxWidth: '28rem',
//                 width: '100%',
//                 padding: '1.5rem',
//                 animation: 'fadeIn 1s ease-in-out',
//             }}>
//                 <img
//                     src="/images/register3.png"
//                     alt="Karakteri ifite OTP"
//                     className="illustration"
//                     style={{
//                         maxWidth: '10rem',
//                         margin: '0 auto 1.5rem',
//                         display: 'block',
//                         transition: 'transform 0.3s ease',
//                     }}
//                     onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                     onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                 />
//                 <div className="form-container" style={{
//                     background: 'white',
//                     borderRadius: '1rem',
//                     padding: '2rem',
//                     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
//                     position: 'relative',
//                     overflow: 'hidden',
//                     animation: 'slideUp 0.8s ease',
//                 }}>
//                     <h2 style={{
//                         color: '#1E40AF',
//                         fontSize: '1.8rem',
//                         fontWeight: 700,
//                         marginBottom: '1rem',
//                         textAlign: 'center',
//                     }}>
//                         Shyiramo OTP
//                     </h2>
//                     <p style={{
//                         color: '#2D3748',
//                         fontSize: '0.9rem',
//                         marginBottom: '1.5rem',
//                         textAlign: 'center',
//                     }}>
//                         OTP y'igitsimibare 4 yoherejwe kuri<br />{phone}
//                     </p>
//                     <div
//                         id="expiredMessage"
//                         className={`error-message ${errorMessage ? 'show' : ''}`}
//                         style={{
//                             color: '#EF4444',
//                             fontSize: '0.85rem',
//                             marginBottom: '1rem',
//                             textAlign: 'center',
//                             display: errorMessage ? 'block' : 'none',
//                             opacity: errorMessage ? 1 : 0,
//                             transition: 'opacity 0.3s ease',
//                         }}
//                     >
//                         {errorMessage}
//                     </div>
//                     <form id="otpForm" onSubmit={handleSubmit} aria-label="Shyiramo OTP">
//                         <input type="hidden" name="_csrf" value="dummy-csrf-token" />
//                         <div className="otp-inputs" style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             marginBottom: '1.5rem',
//                         }}>
//                             {[0, 1, 2, 3].map(index => (
//                                 <input
//                                     key={index}
//                                     type="text"
//                                     maxLength={1}
//                                     required
//                                     name={`otp${index + 1}`}
//                                     id={`otp${index + 1}`}
//                                     value={otp[index]}
//                                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                                     onKeyDown={(e) => handleKeyDown(index, e)}
//                                     pattern="[0-9]"
//                                     title="Injiza imibare gusa"
//                                     ref={el => (inputRefs.current[index] = el)}
//                                     style={{
//                                         width: '3rem',
//                                         height: '3rem',
//                                         textAlign: 'center',
//                                         fontSize: '1.25rem',
//                                         border: '1px solid #E2E8F0',
//                                         borderRadius: '0.5rem',
//                                         background: '#F9FAFB',
//                                         transition: 'border-color 0.3s, box-shadow 0.3s',
//                                     }}
//                                     onFocus={(e) => Object.assign(e.currentTarget.style, {
//                                         outline: 'none',
//                                         borderColor: '#1E90FF',
//                                         boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
//                                     })}
//                                     onBlur={(e) => Object.assign(e.currentTarget.style, {
//                                         borderColor: '#E2E8F0',
//                                         boxShadow: 'none',
//                                     })}
//                                 />
//                             ))}
//                         </div>
//                         <button
//                             type="submit"
//                             id="submitBtn"
//                             disabled={!isOtpComplete || isExpired || isSubmitting}
//                             style={{
//                                 background: !isOtpComplete || isExpired || isSubmitting
//                                     ? '#A0AEC0'
//                                     : 'linear-gradient(90deg, #1E90FF, #3B82F6)',
//                                 color: 'white',
//                                 border: 'none',
//                                 padding: '0.75rem',
//                                 width: '100%',
//                                 borderRadius: '0.5rem',
//                                 fontSize: '1rem',
//                                 fontWeight: 600,
//                                 cursor: !isOtpComplete || isExpired || isSubmitting ? 'not-allowed' : 'pointer',
//                                 transition: 'transform 0.2s, background 0.3s',
//                                 transform: !isOtpComplete || isExpired || isSubmitting ? 'none' : undefined,
//                             }}
//                             onMouseOver={(e) => {
//                                 if (isOtpComplete && !isExpired && !isSubmitting) {
//                                     Object.assign(e.currentTarget.style, {
//                                         background: 'linear-gradient(90deg, #187BCD, #2563EB)',
//                                         transform: 'translateY(-2px)',
//                                     });
//                                 }
//                             }}
//                             onMouseOut={(e) => {
//                                 if (isOtpComplete && !isExpired && !isSubmitting) {
//                                     Object.assign(e.currentTarget.style, {
//                                         background: 'linear-gradient(90deg, #1E90FF, #3B82F6)',
//                                         transform: 'translateY(0)',
//                                     });
//                                 }
//                             }}
//                         >
//                             {isSubmitting ? 'Subira...' : 'Komeza'}
//                         </button>
//  <a
//     href="#"
//     className="resend"
//     id="resendLink"
//     onClick={handleResend}
//     style={{
//         display: 'block',
//         marginTop: '1rem',
//         fontSize: '0.85rem',
//         textAlign: 'center',
//         color: isExpired ? '#EF4444' : '#1E90FF',
//         textDecoration: 'underline',
//         cursor: timeLeft > 0 || isSubmitting ? 'not-allowed' : 'pointer',
//         pointerEvents: timeLeft > 0 || isSubmitting ? 'none' : 'auto',
//         transition: 'color 0.3s ease',
//     }}
// >
//     {isExpired
//         ? 'Subiramo OTP'
//         : `Tegereza gato... ${formatTimer()}`}
// </a>

//                         <div className="go-back-text" style={{
//                             marginTop: '1rem',
//                             textAlign: 'center',
//                             fontSize: '0.875rem',
//                             color: '#374151',
//                         }}>
//                             Byanze?
//                             <a
//                                 href="/register/step1"
//                                 style={{
//                                     color: '#1E90FF',
//                                     fontWeight: 500,
//                                     textDecoration: 'none',
//                                     transition: 'color 0.3s ease',
//                                 }}
//                                 onMouseOver={(e) => Object.assign(e.currentTarget.style, {
//                                     textDecoration: 'underline',
//                                     color: '#2563EB',
//                                 })}
//                                 onMouseOut={(e) => Object.assign(e.currentTarget.style, {
//                                     textDecoration: 'none',
//                                     color: '#1E90FF',
//                                 })}
//                             >
//                                 ← Subira Inyuma
//                             </a>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="progress-dots" style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     marginTop: '1.5rem',
//                 }}>
//                     <div className="dot" style={{
//                         width: '0.75rem',
//                         height: '0.75rem',
//                         background: '#A0AEC0',
//                         borderRadius: '50%',
//                         margin: '0 0.5rem',
//                         transition: 'background 0.3s, transform 0.3s',
//                     }}></div>
//                     <div className="dot" style={{
//                         width: '0.75rem',
//                         height: '0.75rem',
//                         background: '#A0AEC0',
//                         borderRadius: '50%',
//                         margin: '0 0.5rem',
//                         transition: 'background 0.3s, transform 0.3s',
//                     }}></div>
//                     <div className="dot active" style={{
//                         width: '0.75rem',
//                         height: '0.75rem',
//                         background: '#1E90FF',
//                         borderRadius: '50%',
//                         margin: '0 0.5rem',
//                         transform: 'scale(1.3)',
//                         transition: 'background 0.3s, transform 0.3s',
//                     }}></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterStep3;


import React, { useState, useEffect, useRef } from 'react'
import '../styles/register3.css'

interface RegisterStep3Props {
    phone: string;
    initialFormData: { name: string; email: string; password: string };
    onResendOTP: (phone: string) => Promise<boolean>;
    onVerifyOTP: (phone: string, otp: string) => Promise<boolean>;
    onRegister: (formData: { name: string; email: string; phone: string; password: string; role: string }) => Promise<boolean>;
    onComplete: () => void;
}

const RegisterStep3: React.FC<RegisterStep3Props> = ({ phone, initialFormData, onResendOTP, onVerifyOTP, onRegister, onComplete }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isExpired, setIsExpired] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    setErrorMessage('OTP yarangiye. Kanda "Subiramo OTP" kugirango woherezwe indi.');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/\D/g, '').slice(0, 1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const isOtpComplete = otp.every(digit => digit.length === 1);

    const handleResend = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (timeLeft > 0) return;

        setIsSubmitting(true);
        setErrorMessage('');
        try {
            const success = await onResendOTP(phone);
            if (success) {
                setOtp(['', '', '', '']);
                setTimeLeft(60);
                setIsExpired(false);
                setErrorMessage('');
                alert(`OTP yongeye yoherejwe kuri ${phone}`);
            } else {
                setErrorMessage('Ntabwo OTP yashoboye koherezwa');
            }
        } catch (error) {
            setErrorMessage(`Ikosa: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isExpired) {
            setErrorMessage('OTP yarangiye. Subiramo OTP.');
            return;
        }

        const otpCode = otp.join('');
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            console.log("OTP Code entered:", otpCode);
            const otpValid = await onVerifyOTP(phone, otpCode);
            if (!otpValid) {
                setErrorMessage('OTP itariyo. Gerageza kongera.');
                return;
            }

            const formData = { ...initialFormData, phone, role: 'USER' };
            const registerSuccess = await onRegister(formData);
            if (registerSuccess) {
                onComplete();
            } else {
                setErrorMessage('Kwiyandikisha byanze');
            }
        } catch (error) {
            setErrorMessage(`Ikosa: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')})`;
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
                    src="/images/register3.png"
                    alt="Karakteri ifite OTP"
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
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}>
                        Shyiramo OTP
                    </h2>
                    <p style={{
                        color: '#2D3748',
                        fontSize: '0.9rem',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                    }}>
                        OTP y'igitsimibare 4 yoherejwe kuri<br />{phone} {formatTimer()}
                    </p>
                    {errorMessage && (
                        <div
                            className="error-message show"
                            style={{
                                color: '#EF4444',
                                fontSize: '0.85rem',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            {errorMessage}
                        </div>
                    )}
                    <form id="otpForm" onSubmit={handleSubmit} aria-label="Shyiramo OTP">
                        <div className="otp-inputs" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '1.5rem',
                        }}>
                            {[0, 1, 2, 3].map(index => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    required
                                    name={`otp${index + 1}`}
                                    value={otp[index]}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    pattern="[0-9]"
                                    title="Injiza imibare gusa"
                                    ref={el => (inputRefs.current[index] = el)}
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        textAlign: 'center',
                                        fontSize: '1.25rem',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '0.5rem',
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
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={!isOtpComplete || isExpired || isSubmitting}
                            style={{
                                background: !isOtpComplete || isExpired || isSubmitting
                                    ? '#A0AEC0'
                                    : 'linear-gradient(90deg, #1E90FF, #3B82F6)',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem',
                                width: '100%',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: !isOtpComplete || isExpired || isSubmitting ? 'not-allowed' : 'pointer',
                            }}
                        >
                            Emeza
                        </button>
                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <a
                                href="#"
                                onClick={handleResend}
                                style={{
                                    color: '#1E40AF',
                                    textDecoration: 'underline',
                                    fontSize: '0.9rem',
                                    cursor: timeLeft === 0 ? 'pointer' : 'not-allowed',
                                }}
                            >
                                {timeLeft === 0 ? 'Subiramo OTP' : `Subiramo OTP ${formatTimer()}`}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterStep3;
