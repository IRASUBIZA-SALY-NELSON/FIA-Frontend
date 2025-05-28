import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard.css';

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    type: 'lost',
    documentType: '',
    documentId: '',
    ownerName: '',
    description: '',
    lostDate: '',
    lostLocation: '',
    foundDate: '',
    foundLocation: '',
    userId: 1
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setDateTimeLimits();
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    setUserName('Mugisha');
  };

  const setDateTimeLimits = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const localNow = `${year}-${month}-${day}T${hours}:${minutes}`;
    setFormData(prev => ({
      ...prev,
      lostDate: '',
      foundDate: localNow
    }));
  };

  const selectOption = (type) => {
    setSelectedType(type);
    setFormData(prev => ({ ...prev, type }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitFormData = new FormData();

    Object.keys(formData).forEach(key => {
      submitFormData.append(key, formData[key]);
    });

    selectedFiles.forEach((file) => {
      submitFormData.append('pictures', file);
    });

    try {
      const endpoint = selectedType === "lost"
        ? "http://10.12.75.206:8083/api/credentials/lost"
        : "http://10.12.75.206:8083/api/credentials/found";

      const response = await fetch(endpoint, {
        method: "POST",
        body: submitFormData
      });

      if (response.ok) {
        navigate('/success');
      } else {
        const errorText = await response.text();
        console.error("Ntibyagenze neza:", errorText);
        alert(`Ntibyashobotse gutangaza icyangombwa cyabuze/cyabonetse: ${errorText || "Ikibazo kitazwi"}`);
      }
    } catch (error) {
      console.error("Ikibazo mu kohereza:", error);
      alert("Ikosa: " + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>FIA</h1>
        <div className="user-info">
          {userName && <span>Murakaza neza, {userName}!</span>}
          <a href="/profile">
            <img src="/images/person.png" alt="Umwirondoro" />
          </a>
        </div>
      </div>

      <div className="content">
        <h2>Wabuze ikintu? Tangaza hano</h2>

        <div className="options">
          <div 
            className={`option ${selectedType === 'lost' ? 'selected' : ''}`} 
            onClick={() => selectOption('lost')}
          >
            <img src="/images/welcome.png" alt="Icyangombwa cyabuze" />
            <span className="lost-text">Icyangombwa cyabuze</span>
          </div>
          <div 
            className={`option ${selectedType === 'found' ? 'selected' : ''}`} 
            onClick={() => selectOption('found')}
          >
            <img src="/images/welcome.png" alt="Icyangombwa cyabonetse" />
            <span className="found-text">Icyangombwa cyabonetse</span>
          </div>
        </div>

        {selectedType && (
          <form id="credentialForm" onSubmit={handleSubmit} aria-label="Tangaza icyangombwa">
            <div className="form-group">
              <label htmlFor="documentType">Ubwoko bw'icyangombwa</label>
              <select 
                id="documentType" 
                name="documentType" 
                value={formData.documentType}
                onChange={handleInputChange}
                required
              >
                <option value="">Hitamo ubwoko bw'icyangombwa</option>
                <option value="National ID">Indangamuntu</option>
                <option value="Passport">Pasiporo</option>
                <option value="Driver's License">Perimi y'Ububasha bwo Gutwara</option>
                <option value="Mutuelle Card">Ikarita y'Umutekano w'Ubuzima (Mutuelle)</option>
                <option value="Voter ID">Ikarita y'Itora</option>
                <option value="Employee ID">Ikarita y'Umukozi</option>
                <option value="Student ID">Ikarita y'Ishuri</option>
                <option value="Diploma/Certificate">Impamyabumenyi</option>
                <option value="Residence Certificate">Icyemezo cy'Aho utuye</option>
                <option value="Work Permit">Icyemezo cy'Aho Ukorera</option>
                <option value="Insurance Card">Ikarita y'Ubwishingizi</option>
                <option value="TIN Number">Nomero y'Umusoro (TIN)</option>
                <option value="Birth Certificate">Icyemezo cy'Amavuko</option>
                <option value="Other">Ibindi</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="documentId">Nomero y'icyangombwa</label>
              <input 
                type="text" 
                id="documentId" 
                name="documentId" 
                value={formData.documentId}
                onChange={handleInputChange}
                required 
                placeholder="nka: AB1234567" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerName">Amazina nyayo nyir'icyangombwa</label>
              <input 
                type="text" 
                id="ownerName" 
                name="ownerName" 
                value={formData.ownerName}
                onChange={handleInputChange}
                required 
                placeholder="nka: Saly Nelson" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Sobanura icyangombwa</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="nka: Pasiporo y'ubururu yaburiye i Nyamirambo Y'uwitwa Nelson" 
                maxLength="200" 
              />
              <small>Inyuguti ntarengwa: 200</small>
            </div>

            {selectedType === 'lost' && (
              <div className="form-group">
                <label htmlFor="lostDate">Itariki cyaburiyeho</label>
                <input 
                  type="datetime-local" 
                  id="lostDate" 
                  name="lostDate" 
                  value={formData.lostDate}
                  onChange={handleInputChange}
                  max={new Date().toISOString().slice(0, -8)}
                />
                <label htmlFor="lostLocation">Aho cyaburiye</label>
                <input 
                  type="text" 
                  id="lostLocation" 
                  name="lostLocation" 
                  value={formData.lostLocation}
                  onChange={handleInputChange}
                  placeholder="nka: Gare ya Nyabugogo, Kigali" 
                />
              </div>
            )}

            {selectedType === 'found' && (
              <div className="form-group">
                <label htmlFor="foundDate">Itariki cyabonetseho</label>
                <input 
                  type="datetime-local" 
                  id="foundDate" 
                  name="foundDate" 
                  value={formData.foundDate}
                  onChange={handleInputChange}
                  max={new Date().toISOString().slice(0, -8)}
                />
                <label htmlFor="foundLocation">Aho cyabonetse</label>
                <input 
                  type="text" 
                  id="foundLocation" 
                  name="foundLocation" 
                  value={formData.foundLocation}
                  onChange={handleInputChange}
                  placeholder="nka: Gare ya Nyabugogo, Kigali" 
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="pictures">Shyiraho ifoto y’icyangombwa</label>
              <input 
                type="file" 
                id="pictures" 
                name="pictures" 
                multiple 
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="submit-button">Tangaza</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
