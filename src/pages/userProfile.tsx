import React from 'react';
import '../styles/userProfile.css'

interface UserProfileProps {
    name: string;
    email: string;
    phone: string;
    role: string;
    verified: boolean;
    createdAt: string;
    onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, phone, role, verified, createdAt, onLogout }) => {
    return (
        <div style={{
            margin: 0,
            padding: 0,
            fontFamily: "'Segoe UI', sans-serif",
            background: 'linear-gradient(-45deg, #e0f7fa, #80deea, #b2ebf2, #4dd0e1)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 12s ease infinite',
            minHeight: '100vh',
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px 20px',
                minHeight: '100vh',
            }}>
                <div className="profile-card" style={{
                    background: '#ffffffdd',
                    padding: '2rem',
                    borderRadius: '20px',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                    maxWidth: '450px',
                    width: '100%',
                    animation: 'fadeIn 1s ease forwards',
                    opacity: 0,
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '1rem',
                    }}>
                        Welcome, {name}
                    </h2>
                    <div className="info" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Email:</label>
                        <span style={{ color: '#222' }}>{email}</span>
                    </div>
                    <div className="info" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Phone:</label>
                        <span style={{ color: '#222' }}>{phone}</span>
                    </div>
                    <div className="info" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Role:</label>
                        <span style={{ color: '#222' }}>{role}</span>
                    </div>
                    <div className="info" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Verified:</label>
                        <span style={{ color: '#222' }}>{verified ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="info" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#555' }}>Joined:</label>
                        <span style={{ color: '#222' }}>{createdAt}</span>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); onLogout(); }}>
                        <button
                            className="btn"
                            type="submit"
                            style={{
                                background: '#00796b',
                                color: 'white',
                                padding: '12px 16px',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                                width: '100%',
                                fontSize: '16px',
                                marginTop: '20px',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = '#004d40')}
                            onMouseOut={(e) => (e.currentTarget.style.background = '#00796b')}
                        >
                            <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;