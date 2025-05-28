// // import React, { useState } from 'react';
// // import '../styles/register1.css'

// // interface RegisterStep1Props {
// //     initialData?: { name: string; email: string };
// //     error?: string;
// //     onSubmit: (data: { name: string; email: string; password: string }) => void;
// // }

// // const RegisterStep1: React.FC<RegisterStep1Props> = ({ initialData = { name: '', email: '' }, error, onSubmit }) => {
// //     const [formData, setFormData] = useState({
// //         name: initialData.name,
// //         email: initialData.email,
// //         password: '',
// //     });
// //     const [errors, setErrors] = useState({
// //         name: false,
// //         email: false,
// //         password: false,
// //     });

// //     const nameRegex = /^[a-zA-Z\s]*$/;
// //     const emailRegex = /^[a-zA-Z0-9._%+-]*@?gmail\.com?$/;
// //     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;

// //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const { name, value } = e.target;
// //         let sanitizedValue = value;

// //         if (name === 'name' && !nameRegex.test(value)) {
// //             sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
// //             setErrors(prev => ({ ...prev, name: true }));
// //         } else if (name === 'name') {
// //             setErrors(prev => ({ ...prev, name: false }));
// //         }

// //         if (name === 'email' && !emailRegex.test(value)) {
// //             sanitizedValue = value.replace(/[^a-zA-Z0-9._%+-@gmail.com]/g, '');
// //             setErrors(prev => ({ ...prev, email: true }));
// //         } else if (name === 'email') {
// //             setErrors(prev => ({ ...prev, email: false }));
// //         }

// //         if (name === 'password' && !passwordRegex.test(value)) {
// //             sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
// //             setErrors(prev => ({ ...prev, password: true }));
// //         } else if (name === 'password') {
// //             setErrors(prev => ({ ...prev, password: false }));
// //         }

// //         setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
// //     };

// //     const handleSubmit = (e: React.FormEvent) => {
// //         e.preventDefault();

// //         const nameValid = nameRegex.test(formData.name) && formData.name.trim() !== '';
// //         const emailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email);
// //         const passwordValid = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,}$/.test(formData.password);

// //         setErrors({
// //             name: !nameValid,
// //             email: !emailValid,
// //             password: !passwordValid,
// //         });

// //         if (nameValid && emailValid && passwordValid) {
// //             onSubmit(formData);
// //         }
// //     };

// //     return (
// //         <div style={{
// //             fontFamily: "'Roboto', sans-serif",
// //             background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
// //             minHeight: '100vh',
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             margin: 0,
// //             overflowX: 'hidden',
// //         }}>
// //             <div className="container" style={{
// //                 maxWidth: '28rem',
// //                 width: '100%',
// //                 padding: '1.5rem',
// //                 animation: 'fadeIn 1s ease-in-out',
// //             }}>
// //                 <img
// //                     src="/images/register1.png"
// //                     alt="Umuntu ufite ikarita"
// //                     className="illustration"
// //                     style={{
// //                         maxWidth: '10rem',
// //                         margin: '0 auto 1.5rem',
// //                         display: 'block',
// //                         transition: 'transform 0.3s ease',
// //                     }}
// //                     onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
// //                     onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
// //                 />
// //                 <div className="form-container" style={{
// //                     background: 'white',
// //                     borderRadius: '1rem',
// //                     padding: '2rem',
// //                     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
// //                     position: 'relative',
// //                     overflow: 'hidden',
// //                     animation: 'slideUp 0.8s ease',
// //                 }}>
// //                     <h2 style={{
// //                         color: '#1E40AF',
// //                         fontSize: '1.8rem',
// //                         fontWeight: 700,
// //                         marginBottom: '1.5rem',
// //                         textAlign: 'center',
// //                     }}>
// //                         Murakaza neza
// //                     </h2>
// //                     {error && (
// //                         <div className="error-message show" style={{
// //                             color: '#EF4444',
// //                             fontSize: '0.85rem',
// //                             marginTop: '0.25rem',
// //                             opacity: 1,
// //                             transition: 'opacity 0.3s ease',
// //                         }}>
// //                             {error}
// //                         </div>
// //                     )}
// //                     <form id="registrationForm" onSubmit={handleSubmit} aria-label="Kwiyandikisha Intambwe ya 1">
// //                         <input type="hidden" name="_csrf" value="dummy-csrf-token" />
// //                         <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
// //                             <label htmlFor="name" style={{
// //                                 display: 'block',
// //                                 fontSize: '0.9rem',
// //                                 color: '#2D3748',
// //                                 marginBottom: '0.5rem',
// //                                 fontWeight: 500,
// //                             }}>
// //                                 Injiza izina ryawe
// //                             </label>
// //                             <input
// //                                 type="text"
// //                                 id="name"
// //                                 name="name"
// //                                 required
// //                                 value={formData.name}
// //                                 onChange={handleInputChange}
// //                                 pattern="[a-zA-Z\s]+"
// //                                 title="Injiza izina ry'umuntu gusa (Oya imibare cyangwa _)"
// //                                 aria-describedby="nameError"
// //                                 style={{
// //                                     width: '100%',
// //                                     padding: '0.75rem 1rem',
// //                                     border: '1px solid #E2E8F0',
// //                                     borderRadius: '0.5rem',
// //                                     fontSize: '1rem',
// //                                     background: '#F9FAFB',
// //                                     transition: 'border-color 0.3s, box-shadow 0.3s',
// //                                 }}
// //                                 onFocus={(e) => Object.assign(e.currentTarget.style, {
// //                                     outline: 'none',
// //                                     borderColor: '#1E90FF',
// //                                     boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
// //                                 })}
// //                                 onBlur={(e) => Object.assign(e.currentTarget.style, {
// //                                     borderColor: '#E2E8F0',
// //                                     boxShadow: 'none',
// //                                 })}
// //                             />
// //                             <i className="fas fa-user" style={{
// //                                 position: 'absolute',
// //                                 top: '2.8rem',
// //                                 right: '1rem',
// //                                 color: '#A0AEC0',
// //                             }}></i>
// //                             <div id="nameError" className={`error-message ${errors.name ? 'show' : ''}`} style={{
// //                                 color: '#EF4444',
// //                                 fontSize: '0.85rem',
// //                                 marginTop: '0.25rem',
// //                                 display: errors.name ? 'block' : 'none',
// //                                 opacity: errors.name ? 1 : 0,
// //                                 transition: 'opacity 0.3s ease',
// //                             }}>
// //                                 Injiza izina ry'umuntu gusa (Oya imibare cyangwa _)
// //                             </div>
// //                         </div>
// //                         <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
// //                             <label htmlFor="email" style={{
// //                                 display: 'block',
// //                                 fontSize: '0.9rem',
// //                                 color: '#2D3748',
// //                                 marginBottom: '0.5rem',
// //                                 fontWeight: 500,
// //                             }}>
// //                                 Injiza aderesi ya email
// //                             </label>
// //                             <input
// //                                 type="email"
// //                                 id="email"
// //                                 name="email"
// //                                 required
// //                                 value={formData.email}
// //                                 onChange={handleInputChange}
// //                                 pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
// //                                 title="Injiza email ya Gmail (example@gmail.com)"
// //                                 aria-describedby="emailError"
// //                                 style={{
// //                                     width: '100%',
// //                                     padding: '0.75rem 1rem',
// //                                     border: '1px solid #E2E8F0',
// //                                     borderRadius: '0.5rem',
// //                                     fontSize: '1rem',
// //                                     background: '#F9FAFB',
// //                                     transition: 'border-color 0.3s, box-shadow 0.3s',
// //                                 }}
// //                                 onFocus={(e) => Object.assign(e.currentTarget.style, {
// //                                     outline: 'none',
// //                                     borderColor: '#1E90FF',
// //                                     boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
// //                                 })}
// //                                 onBlur={(e) => Object.assign(e.currentTarget.style, {
// //                                     borderColor: '#E2E8F0',
// //                                     boxShadow: 'none',
// //                                 })}
// //                             />
// //                             <i className="fas fa-envelope" style={{
// //                                 position: 'absolute',
// //                                 top: '2.8rem',
// //                                 right: '1rem',
// //                                 color: '#A0AEC0',
// //                             }}></i>
// //                             <div id="emailError" className={`error-message ${errors.email ? 'show' : ''}`} style={{
// //                                 color: '#EF4444',
// //                                 fontSize: '0.85rem',
// //                                 marginTop: '0.25rem',
// //                                 display: errors.email ? 'block' : 'none',
// //                                 opacity: errors.email ? 1 : 0,
// //                                 transition: 'opacity 0.3s ease',
// //                             }}>
// //                                 Injiza email ya Gmail (example@gmail.com)
// //                             </div>
// //                         </div>
// //                         <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
// //                             <label htmlFor="password" style={{
// //                                 display: 'block',
// //                                 fontSize: '0.9rem',
// //                                 color: '#2D3748',
// //                                 marginBottom: '0.5rem',
// //                                 fontWeight: 500,
// //                             }}>
// //                                 Ijambo ry'ibanga
// //                             </label>
// //                             <input
// //                                 type="password"
// //                                 id="password"
// //                                 name="password"
// //                                 required
// //                                 value={formData.password}
// //                                 onChange={handleInputChange}
// //                                 pattern="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,}$"
// //                                 title="Ijambo ry'ibanga rigomba kuba rifite nibura inyuguti 5, hamwe n'inyuguti n'imibare"
// //                                 aria-describedby="passwordError"
// //                                 style={{
// //                                     width: '100%',
// //                                     padding: '0.75rem 1rem',
// //                                     border: '1px solid #E2E8F0',
// //                                     borderRadius: '0.5rem',
// //                                     fontSize: '1rem',
// //                                     background: '#F9FAFB',
// //                                     transition: 'border-color 0.3s, box-shadow 0.3s',
// //                                 }}
// //                                 onFocus={(e) => Object.assign(e.currentTarget.style, {
// //                                     outline: 'none',
// //                                     borderColor: '#1E90FF',
// //                                     boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)',
// //                                 })}
// //                                 onBlur={(e) => Object.assign(e.currentTarget.style, {
// //                                     borderColor: '#E2E8F0',
// //                                     boxShadow: 'none',
// //                                 })}
// //                             />
// //                             <i className="fas fa-lock" style={{
// //                                 position: 'absolute',
// //                                 top: '2.8rem',
// //                                 right: '1rem',
// //                                 color: '#A0AEC0',
// //                             }}></i>
// //                             <div id="passwordError" className={`error-message ${errors.password ? 'show' : ''}`} style={{
// //                                 color: '#EF4444',
// //                                 fontSize: '0.85rem',
// //                                 marginTop: '0.25rem',
// //                                 display: errors.password ? 'block' : 'none',
// //                                 opacity: errors.password ? 1 : 0,
// //                                 transition: 'opacity 0.3s ease',
// //                             }}>
// //                                 Ijambo ry'ibanga rigomba kuba rifite nibura inyuguti 5, hamwe n'inyuguti n'imibare
// //                             </div>
// //                         </div>
// //                         <button
// //                             type="submit"
// //                             style={{
// //                                 background: 'linear-gradient(90deg, #1E90FF, #3B82F6)',
// //                                 color: 'white',
// //                                 border: 'none',
// //                                 padding: '0.75rem',
// //                                 width: '100%',
// //                                 borderRadius: '0.5rem',
// //                                 fontSize: '1rem',
// //                                 fontWeight: 600,
// //                                 cursor: 'pointer',
// //                                 transition: 'transform 0.2s, background 0.3s',
// //                             }}
// //                             onMouseOver={(e) => Object.assign(e.currentTarget.style, {
// //                                 background: 'linear-gradient(90deg, #187BCD, #2563EB)',
// //                                 transform: 'translateY(-2px)',
// //                             })}
// //                             onMouseOut={(e) => Object.assign(e.currentTarget.style, {
// //                                 background: 'linear-gradient(90deg, #1E90FF, #3B82F6)',
// //                                 transform: 'translateY(0)',
// //                             })}
// //                             onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
// //                         >
// //                             Komeza
// //                         </button>
// //                     </form>
// //                     <p style={{
// //                         textAlign: 'center',
// //                         marginTop: '1rem',
// //                         fontSize: '0.875rem',
// //                         color: '#4B5563',
// //                     }}>
// //                         Ufite konti?
// //                         <a
// //                             href="/login"
// //                             style={{
// //                                 color: '#1E40AF',
// //                                 fontWeight: 500,
// //                                 textDecoration: 'none',
// //                             }}
// //                             onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
// //                             onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
// //                         >
// //                             Injira hano
// //                         </a>
// //                     </p>
// //                 </div>
// //                 <div className="progress-dots" style={{
// //                     display: 'flex',
// //                     justifyContent: 'center',
// //                     marginTop: '1.5rem',
// //                 }}>
// //                     <div className="dot active" style={{
// //                         width: '0.75rem',
// //                         height: '0.75rem',
// //                         background: '#1E90FF',
// //                         borderRadius: '50%',
// //                         margin: '0 0.5rem',
// //                         transform: 'scale(1.3)',
// //                         transition: 'background 0.3s, transform 0.3s',
// //                     }}></div>
// //                     <div className="dot" style={{
// //                         width: '0.75rem',
// //                         height: '0.75rem',
// //                         background: '#A0AEC0',
// //                         borderRadius: '50%',
// //                         margin: '0 0.5rem',
// //                         transition: 'background 0.3s, transform 0.3s',
// //                     }}></div>
// //                     <div className="dot" style={{
// //                         width: '0.75rem',
// //                         height: '0.75rem',
// //                         background: '#A0AEC0',
// //                         borderRadius: '50%',
// //                         margin: '0 0.5rem',
// //                         transition: 'background 0.3s, transform 0.3s',
// //                     }}></div>
// //                 </div>
// //             </div>

// //         </div>
// //     );
// // };

// // export default RegisterStep1;


// import React, { useState } from 'react';
// import '../styles/register1.css'

// interface RegisterStep1Props {
//     initialData?: { name: string; email: string };
//     error?: string;
//     onSubmit: (data: { name: string; email: string; password: string }) => void;
// }

// const RegisterStep1: React.FC<RegisterStep1Props> = ({ initialData = { name: '', email: '' }, error, onSubmit }) => {
//     const [formData, setFormData] = useState({
//         name: initialData.name,
//         email: initialData.email,
//         password: '',
//     });
//     const [errors, setErrors] = useState({
//         name: false,
//         email: false,
//         password: false,
//     });

//     const nameRegex = /^[a-zA-Z\s]*$/;
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,}$/;

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;

//         setFormData(prev => ({ ...prev, [name]: value }));

//         if (name === 'name') {
//             setErrors(prev => ({ ...prev, name: !nameRegex.test(value) || value.trim() === '' }));
//         }

//         if (name === 'email') {
//             setErrors(prev => ({ ...prev, email: !emailRegex.test(value) }));
//         }

//         if (name === 'password') {
//             setErrors(prev => ({ ...prev, password: !passwordRegex.test(value) }));
//         }
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const nameValid = nameRegex.test(formData.name) && formData.name.trim() !== '';
//         const emailValid = emailRegex.test(formData.email);
//         const passwordValid = passwordRegex.test(formData.password);

//         setErrors({
//             name: !nameValid,
//             email: !emailValid,
//             password: !passwordValid,
//         });

//         if (nameValid && emailValid && passwordValid) {
//             onSubmit(formData);
//         }
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
//                     src="/images/register1.png"
//                     alt="Umuntu ufite ikarita"
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
//                         marginBottom: '1.5rem',
//                         textAlign: 'center',
//                     }}>
//                         Murakaza neza
//                     </h2>
//                     {error && (
//                         <div className="error-message show" style={{
//                             color: '#EF4444',
//                             fontSize: '0.85rem',
//                             marginTop: '0.25rem',
//                             opacity: 1,
//                             transition: 'opacity 0.3s ease',
//                         }}>
//                             {error}
//                         </div>
//                     )}
//                     <form id="registrationForm" onSubmit={handleSubmit} aria-label="Kwiyandikisha Intambwe ya 1">
//                         <input type="hidden" name="_csrf" value="dummy-csrf-token" />
//                         <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
//                             <label htmlFor="name">Injiza izina ryawe</label>
//                             <input
//   type="text"
//   id="name"
//   name="name"
//   required
//   value={formData.name}
//   onChange={handleInputChange}
//   pattern="[a-zA-Z\s]+"
//   title="Only letters and spaces are allowed (No numbers or underscores)"
//   aria-describedby="nameError"
//   style={{
//     width: '100%',
//     padding: '0.75rem 1rem',
//     border: '1px solid #E2E8F0',
//     borderRadius: '0.5rem',
//     background: '#F9FAFB',
//   }}
// />

//                             <div id="nameError" className={`error-message ${errors.name ? 'show' : ''}`} style={{ color: '#EF4444', display: errors.name ? 'block' : 'none' }}>
//                                 Injiza izina ry'umuntu gusa (Oya imibare cyangwa _)
//                             </div>
//                         </div>
//                         <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
//                             <label htmlFor="email">Injiza aderesi ya email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 required
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
//                                 title="Injiza email ya Gmail (example@gmail.com)"
//                                 aria-describedby="emailError"
//                                 style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', background: '#F9FAFB' }}
//                             />
//                             <div id="emailError" className={`error-message ${errors.email ? 'show' : ''}`} style={{ color: '#EF4444', display: errors.email ? 'block' : 'none' }}>
//                                 Injiza email ya Gmail (example@gmail.com)
//                             </div>
//                         </div>
//                         <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
//                             <label htmlFor="password">Injiza ijambo ry’ibanga</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 required
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 title="Ijambo ry’ibanga rigomba kugira byibuze inyuguti n’imibare, nibura 5"
//                                 aria-describedby="passwordError"
//                                 style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', background: '#F9FAFB' }}
//                             />
//                             <div id="passwordError" className={`error-message ${errors.password ? 'show' : ''}`} style={{ color: '#EF4444', display: errors.password ? 'block' : 'none' }}>
//                                 Ijambo ry’ibanga rigomba kugira byibuze inyuguti n’imibare, nibura 5
//                             </div>
//                         </div>
//                         <button type="submit" style={{
//                             width: '100%',
//                             padding: '0.75rem 1rem',
//                             backgroundColor: '#1E40AF',
//                             color: '#FFFFFF',
//                             fontWeight: 600,
//                             fontSize: '1rem',
//                             border: 'none',
//                             borderRadius: '0.5rem',
//                             cursor: 'pointer',
//                             transition: 'background-color 0.3s ease',
//                         }}>
//                             Komeza
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterStep1;


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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;  // Corrected regex
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
            height:'700px',
            width:'830px'
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
