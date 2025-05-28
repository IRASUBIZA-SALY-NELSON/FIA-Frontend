import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LostCredential {
  documentType: string;
  documentId: string;
  description: string;
  ownerName: string;
  lostLocation: string;
  lostDate: string;
}

interface FoundCredential {
  documentType: string;
  documentId: string;
  description: string;
  foundBy: { name: string } | null;
  foundLocation: string;
  foundDate: string;
}

type Document = LostCredential | FoundCredential & { category: 'lost' | 'found' };

const Home: React.FC = () => {
  const [lostDocuments, setLostDocuments] = useState<LostCredential[]>([]);
  const [foundDocuments, setFoundDocuments] = useState<FoundCredential[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lost' | 'found'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    // Fetch lost documents
    fetch('http://10.12.75.206:8083/api/credentials/lost', {
      headers: { Authorization: `Bearer ${token || ''}` },
    })
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setLostDocuments(data) : setLostDocuments([])))
      .catch((err) => console.error('Error fetching lost documents:', err));

    // Fetch found documents
    fetch('http://10.12.75.206:8083/api/credentials/found', {
      headers: { Authorization: `Bearer ${token || ''}` },
    })
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setFoundDocuments(data) : setFoundDocuments([])))
      .catch((err) => console.error('Error fetching found documents:', err));
  }, []);

  // Filter lost documents based on search and category
  const filteredLostDocs = lostDocuments.filter((doc) => {
    if (selectedCategory === 'found') return false;
    if (searchText.trim() === '') return true;
    const search = searchText.toLowerCase();
    return (
      `${doc.documentType} ${doc.documentId} ${doc.description} ${doc.ownerName} ${doc.lostLocation} ${doc.lostDate}`
        .toLowerCase()
        .includes(search)
    );
  });

  // Filter found documents based on search and category
  const filteredFoundDocs = foundDocuments.filter((doc) => {
    if (selectedCategory === 'lost') return false;
    if (searchText.trim() === '') return true;
    const search = searchText.toLowerCase();
    return (
      `${doc.documentType} ${doc.documentId} ${doc.description} ${doc.foundBy?.name || ''} ${doc.foundLocation} ${doc.foundDate}`
        .toLowerCase()
        .includes(search)
    );
  });

  // Interleave lost and found documents
  const filteredDocuments: Document[] = [];
  const maxLength = Math.max(filteredLostDocs.length, filteredFoundDocs.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < filteredLostDocs.length) filteredDocuments.push({ ...filteredLostDocs[i], category: 'lost' });
    if (i < filteredFoundDocs.length) filteredDocuments.push({ ...filteredFoundDocs[i], category: 'found' });
  }

  const noResults = filteredDocuments.length === 0 && searchText.trim() !== '';

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", margin: 0, overflowX: 'hidden' }}>
      <header
        className="top-header"
        style={{
          background: 'linear-gradient(135deg, #4A90E2, #007AFF)',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '28px',
          letterSpacing: '1px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span style={{ color: '#FFD700' }}>Shakisha</span> na AI
      </header>

      <div className="search-box" style={{ padding: '15px' }}>
        <input
          type="text"
          placeholder="Shakisha ibyangombwa..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div className="categories-section" style={{ padding: '0 15px' }}>
        <br />
        <div className="categories" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: selectedCategory === 'all' ? '#007AFF' : '#eee',
              color: selectedCategory === 'all' ? '#fff' : '#444',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Byose
          </button>
          <button
            onClick={() => setSelectedCategory('lost')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: selectedCategory === 'lost' ? '#007AFF' : '#eee',
              color: selectedCategory === 'lost' ? '#fff' : '#444',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Ibyabuze
          </button>
          <button
            onClick={() => setSelectedCategory('found')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: selectedCategory === 'found' ? '#007AFF' : '#eee',
              color: selectedCategory === 'found' ? '#fff' : '#444',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Ibyabonetse
          </button>
        </div>
      </div>

      <div className="documents-list" style={{ padding: '15px' }}>
        {noResults && (
          <div id="noResults" style={{ textAlign: 'center', padding: '20px' }}>
            <img
              src="/images/not-found.png"
              alt="Nta bisubizo bibonetse"
              style={{ width: '150px', opacity: 0.5 }}
            />
            <p style={{ fontSize: '18px', color: 'gray', marginTop: '10px' }}>
              Nta byangombwa bihuye n'ibyo ushaka bibonetse.
            </p>
          </div>
        )}

        {filteredDocuments.map((doc, index) => {
          if (doc.category === 'lost') {
            const lostDoc = doc as LostCredential & { category: 'lost' };
            return (
              <div
                key={`lost-${index}`}
                className="document-card lost"
                style={{
                  display: 'flex',
                  gap: '10px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div
                  className="icon id-icon"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: "url('/images/id-icon.png') no-repeat center",
                    backgroundSize: 'contain',
                    borderRadius: '50%',
                  }}
                />
                <div className="text" style={{ fontSize: '16px' }}>
                  <strong>
                    {lostDoc.documentType} - {lostDoc.documentId}
                  </strong>
                  <p style={{ margin: '5px 0' }}>{lostDoc.description}</p>
                  <small>Byabuzwe na: {lostDoc.ownerName}</small>
                  <br />
                  <small>Aho byaburiye: {lostDoc.lostLocation}</small>
                  <br />
                  <small>Byabuze kuwa: {lostDoc.lostDate}</small>
                </div>
              </div>
            );
          } else {
            const foundDoc = doc as FoundCredential & { category: 'found' };
            return (
              <div
                key={`found-${index}`}
                className="document-card found"
                style={{
                  display: 'flex',
                  gap: '10px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div
                  className="icon found-icon"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: "url('/images/found-icon.png') no-repeat center",
                    backgroundSize: 'contain',
                    borderRadius: '50%',
                  }}
                />
                <div className="text" style={{ fontSize: '16px' }}>
                  <strong>
                    {foundDoc.documentType} - {foundDoc.documentId}
                  </strong>
                  <p style={{ margin: '5px 0' }}>{foundDoc.description}</p>
                  <small>Cyabonywe na: {foundDoc.foundBy?.name || 'Ntabwo bizwi'}</small>
                  <br />
                  <small>Aho cyabonetse: {foundDoc.foundLocation}</small>
                  <br />
                  <small>Itariki cyabonetseho: {foundDoc.foundDate}</small>
                </div>
              </div>
            );
          }
        })}
      </div>

      <footer
        className="bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid #ccc',
          padding: '10px 0',
          fontWeight: 'bold',
        }}
      >
        <a
          href="/home"
          className="active"
          style={{ color: '#007AFF', textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            navigate('/home');
          }}
        >
          Urugo
        </a>
        <a
          href="/lost"
          style={{ color: '#444', textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            navigate('/lost');
          }}
        >
          Ibyabuze
        </a>
        <a
          href="/found"
          style={{ color: '#444', textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            navigate('/found');
          }}
        >
          Ibyabonetse
        </a>
        <a
          href="/notifications"
          style={{ color: '#444', textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            navigate('/notifications');
          }}
        >
          Amatangazo
        </a>
      </footer>
    </div>
  );
};

export default Home;
