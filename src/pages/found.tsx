import React, { useEffect, useState } from 'react';
interface FoundCredential {
  documentType: string;
  documentId: string;
  description: string;
  foundBy: { name: string } | null; // safer
  foundLocation: string;
  foundDate: string;
}


const FoundPage = () => {
  const [foundCredentials, setFoundCredentials] = useState<FoundCredential[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchFoundCredentials = async () => {
      try {
        const response = await fetch('http://10.12.75.206:8083/api/credentials/found'); // 🔁 Replace with your real endpoint
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setFoundCredentials(data);
      } catch (err) {
        setError('Ntibishobotse kubona ibyabonetse.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundCredentials();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredCredentials = foundCredentials.filter(credential => {
    const foundByName = credential.foundBy?.name || '';
    return `${credential.documentType} ${credential.documentId} ${credential.description} ${foundByName} ${credential.foundLocation} ${credential.foundDate}`
      .toLowerCase()
      .includes(searchText);
  });
  

  const noResults = filteredCredentials.length === 0 && searchText !== '';

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
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', letterSpacing: '1px' }}>
          <span className="highlight" style={{ color: '#FFD700' }}>Shakisha</span> hifashishijwe AI
        </h1>
      </header>

      <div className="search-box" style={{ padding: '15px' }}>
        <input
          type="text"
          placeholder="Shakisha ibyabonetse..."
          value={searchText}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <h2 style={{ paddingLeft: '15px' }}>Ibyangombwa byabonetse</h2>

      {loading && <p style={{ paddingLeft: '15px' }}>Turimo kubishaka...</p>}
      {error && <p style={{ color: 'red', paddingLeft: '15px' }}>{error}</p>}

      {filteredCredentials.map((credential, index) => (
        <div key={index} className="document-card found" style={{
          display: 'flex',
          gap: '10px',
          margin: '10px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          backgroundColor: '#f9f9f9',
        }}>
          <div className="icon id-icon" style={{
            width: '40px',
            height: '40px',
            background: "url('/images/found-icon.png') no-repeat center",
            backgroundSize: 'contain',
            borderRadius: '50%',
          }}></div>
          <div className="text" style={{ fontSize: '16px' }}>
            <strong>{credential.documentType} - {credential.documentId}</strong>
            <p style={{ margin: '5px 0' }}>{credential.description}</p>
            <small>Cyabonywe na: {credential.foundBy?.name || 'Ntabwo bizwi'}</small>

            <small>Aho cyabonetse: {credential.foundLocation}</small><br />
            <small>Itariki cyabonetseho: {credential.foundDate}</small>
          </div>
        </div>
      ))}

      <div id="noResults" style={{
        display: noResults ? 'block' : 'none',
        textAlign: 'center',
        padding: '20px',
      }}>
        <img
          src="/images/not-found.png"
          alt="Nta byangombwa byabonetse"
          style={{ width: '150px', opacity: 0.5 }}
        />
        <p style={{ fontSize: '18px', color: 'gray', marginTop: '10px' }}>
          Nta cyangombwa gihuye n'ibishakishwa cyabonetse.
        </p>
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
        <a href="home" style={{ color: '#444', textDecoration: 'none', fontWeight: 'bold' }}>Ahabanza</a>
        <a href="lost" style={{ color: '#444', textDecoration: 'none', fontWeight: 'bold' }}>Cyabuze</a>
        <a href="found" className="active" style={{ color: '#007AFF', textDecoration: 'none', fontWeight: 'bold' }}>Cyabonetse</a>
        <a href="notifications" style={{ color: '#444', textDecoration: 'none', fontWeight: 'bold' }}>Amakuru</a>
      </footer>
    </div>
  );
};

export default FoundPage;
