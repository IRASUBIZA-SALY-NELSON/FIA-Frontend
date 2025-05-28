import React, { useEffect, useState } from 'react';

interface LostCredential {
  documentType: string;
  documentId: string;
  ownerName: string;
}

interface Match {
  lostCredential: LostCredential;
  verified: boolean;
  returned: boolean;
  matchDetails?: string;
  contactInfo?: string;
  formattedDate: string;
}

const NotificationsPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:8083/api/credentials/matches/all');
        if (!res.ok) throw new Error('Failed to load matches');
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        setError('Ntibishobotse kubona amatangazo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <header className="top-header" style={{
        background: 'linear-gradient(135deg, #4A90E2, #007AFF)',
        padding: '20px',
        textAlign: 'center',
        color: 'white',
        fontFamily: "'Segoe UI', sans-serif",
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
          <span style={{ color: '#FFD700' }}>Shaka</span> na AI
        </h1>
      </header>

      <div style={{ padding: '15px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Amatangazo</h2>
        {loading && <p>Turimo kubishaka...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && matches.length === 0 && !error && (
          <p>Nta tangazo ribonetse.</p>
        )}
        {matches.map((match, index) => (
          <div key={index} className="document-card" style={{
            display: 'flex',
            gap: '10px',
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#f1f8ff',
          }}>
            <div className="icon" style={{
              width: '40px',
              height: '40px',
              background: "url('/images/id-icon.png') no-repeat center",
              backgroundSize: 'contain',
              borderRadius: '50%',
            }}></div>
            <div style={{ fontSize: '16px' }}>
              <strong>
                {match.lostCredential.documentType} - {match.lostCredential.documentId}
              </strong>
              <p>Nyirabyo: {match.lostCredential.ownerName}</p>
              {match.matchDetails && <p>{match.matchDetails}</p>}
              {match.contactInfo && <p>Kontaro: {match.contactInfo}</p>}
              <small>{match.formattedDate}</small><br />

              {/* Status Badges */}
              <div style={{ marginTop: '8px' }}>
                {match.verified && (
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '4px',
                    marginRight: '5px',
                  }}>
                    BIRAMENYEKANYE
                  </span>
                )}
                {!match.verified && (
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: '#FFC107',
                    color: 'black',
                    fontSize: '12px',
                    borderRadius: '4px',
                    marginRight: '5px',
                  }}>
                    BIRACYATEGEREJWE
                  </span>
                )}
                {match.returned && (
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '4px',
                  }}>
                    BYASUBIWE
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid #ccc',
        padding: '10px 0',
      }}>
        <a href="/home" style={{ fontWeight: 'bold', textDecoration: 'none' }}>Ahabanza</a>
        <a href="/lost" style={{ fontWeight: 'bold', textDecoration: 'none' }}>Ibyabuze</a>
        <a href="/found" style={{ fontWeight: 'bold', textDecoration: 'none' }}>Babonetse</a>
        <a href="/notifications" className="active" style={{ fontWeight: 'bold', color: '#007AFF', textDecoration: 'none' }}>Amatangazo</a>
      </footer>
    </div>
  );
};

export default NotificationsPage;
