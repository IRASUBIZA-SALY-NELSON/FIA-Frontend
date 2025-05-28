import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/welcomePage';
import Welcome from './pages/welcome';
import RegisterStep1 from './pages/registerStep1';
import RegisterStep2 from './pages/registerStep2';
import RegisterStep3 from './pages/registerStep3';
import RegisterComplete from './pages/registerComplete';
import UserProfile from './pages/userProfile';
import LostPage from './pages/LostPage';
import NotificationsPage from './pages/Notification';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import Success from './pages/success';
import Home from './pages/Home';  
import UnderDevelopmentPage from './pages/underDevelopmentPage';
import FoundPage from './pages/found';
import Contact  from './pages/Contact';
import Error from './pages/error';

const App: React.FC = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone: string;
    role: string;
    verified: boolean;
    createdAt: string;
  } | null>(null);

  const [lostCredentials, setLostCredentials] = useState([]);
  const [matches, setMatches] = useState([]);


  // Fetch lost credentials and matches on app load
  useEffect(() => {
    const fetchLostCredentials = async () => {
      try {
        const res = await fetch('http://10.12.75.206:8083/api/credentials/lost'); // Update URL to your API
        const data = await res.json();
        setLostCredentials(data);
      } catch (err) {
        console.error('Failed to load lost credentials', err);
      }
    };

    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:8083/api/credentials/matches/all'); // Update URL to your API
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error('Failed to load matches', err);
      }
    };

    fetchLostCredentials();
    fetchMatches();
  }, []);

  const RegisterStep1Wrapper = () => {
    const navigate = useNavigate();
    const handleSubmit = (data: { name: string; email: string; password: string }) => {
      setRegistrationData(prev => ({ ...prev, ...data }));
      navigate('/register/step2');
    };
    return <RegisterStep1 initialData={{ name: registrationData.name, email: registrationData.email }} onSubmit={handleSubmit} />;
  };

  const RegisterStep2Wrapper = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (phone: string) => {
      try {
        const response = await fetch('http://10.12.75.206:8083/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
        });

        if (response.ok) {
          setRegistrationData(prev => ({ ...prev, phone }));
          navigate('/register/step3');
        } else {
          const data = await response.text();
          setError(data);
        }
      } catch {
        setError('Failed to send OTP. Please try again.');
      }
    };

    return <RegisterStep2 initialPhone={registrationData.phone} onSubmit={handleSubmit} error={error} />;
  };

  const RegisterStep3Wrapper = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleResendOTP = async () => {
      try {
        const response = await fetch('http://10.12.75.206:8083/api/auth/resend-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: registrationData.phone }),
        });

        if (!response.ok) {
          const data = await response.text();
          setError(data);
        }
      } catch {
        setError('Failed to resend OTP. Please try again.');
      }
    };

    const handleVerifyOTP = async (phone: string, otp: string) => {
      try {
        const response = await fetch('http://10.12.75.206:8083/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp }),
        });

        if (response.ok) return true;

        const data = await response.json();
        setError(data.message || 'Invalid OTP');
        return false;
      } catch {
        setError('Failed to verify OTP.');
        return false;
      }
    };

    const handleRegister = async () => {
      try {
        const requestBody = {
          ...registrationData,
          role: 'USER',
          isVerified: true,
        };

        const response = await fetch('http://10.12.75.206:8083/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        const text = await response.text();

        if (response.ok) {
          try {
            const data = JSON.parse(text);
            setUser(data);
            navigate('/register/complete');
          } catch {
            setError('Unexpected response format.');
          }
        } else {
          setError(text);
        }
      } catch {
        setError('Registration failed.');
      }
    };

    return (
      <RegisterStep3
        phone={registrationData.phone}
        initialFormData={{
          name: registrationData.name,
          email: registrationData.email,
          password: registrationData.password,
        }}
        onResendOTP={handleResendOTP}
        onVerifyOTP={handleVerifyOTP}
        onRegister={handleRegister}
        error={error}
      />
    );
  };

  const UserProfileWrapper = () => {
    const navigate = useNavigate();
    if (!user) {
      navigate('/');
      return null;
    }

    return (
      <UserProfile
        name={user.name}
        email={user.email}
        phone={user.phone}
        role={user.role}
        verified={user.verified}
        createdAt={user.createdAt}
        onLogout={() => {
          setUser(null);
          navigate('/');
        }}
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/register/step1" element={<RegisterStep1Wrapper />} />
        <Route path="/register/step2" element={<RegisterStep2Wrapper />} />
        <Route path="/register/step3" element={<RegisterStep3Wrapper />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/found" element={<FoundPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/admin/under-development" element={<UnderDevelopmentPage />} />
        <Route path="/user/profile" element={<UserProfileWrapper />} />
        <Route path="*" element={< Error /> } />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
