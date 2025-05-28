import React, { useState, type ChangeEvent, type FormEvent } from 'react';

interface DashboardProps {
  userName?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const [selectedType, setSelectedType] = useState<'lost' | 'found'>('lost');
  const [formVisible, setFormVisible] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [formData, setFormData] = useState({
    documentType: '', 
    documentId: '',
    ownerName: '',
    description: '',
    lostDate: '',
    lostLocation: '',
    foundDate: '',
    foundLocation: '',
  });

  const setDateTimeLimits = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const maxDateTime = setDateTimeLimits();

  const handleSelectOption = (type: 'lost' | 'found') => {
    setSelectedType(type);
    setFormVisible(true);
    setFormData((prev) => ({
      ...prev,
      lostDate: type === 'lost' ? maxDateTime : '',
      foundDate: type === 'found' ? maxDateTime : '',
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileCount(files ? files.length : 0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('type', selectedType);
    data.append('userId', '1'); // Mock user ID

    const endpoint = selectedType === 'lost' ? '/api/credentials/lost' : '/api/credentials/found';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        window.location.href = '/success';
      } else {
        const errorText = await response.text();
        alert(`Ntibyashobotse gutangaza icyangombwa cyabuze/cyabonetse: ${errorText || 'Ikibazo kitazwi'}`);
      }
    } catch (error) {
      alert(`Ikosa: ${(error as Error).message}`);
    }
  };

  return (
    <html lang="rw">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="ShakishaNaAI - Dashboard: Report lost or found documents using AI-powered technology."
        />
        <title>FindWithAi - Dashboard</title>
        <link rel="icon" type="image/png" href="/images/welcome.png" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                font-family: 'Roboto', sans-serif;
                background: linear-gradient(135deg, #1E90FF, #60A5FA);
                min-height: 100vh;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow-x: hidden;
              }

              .container {
                max-width: 32rem;
                width: 100%;
                padding: 1.5rem;
                animation: fadeIn 1s ease-in-out;
              }

              .header {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 1rem 1rem 0 0;
                padding: 1rem 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }

              .header h1 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #1E40AF;
              }

              .header .user-info {
                display: flex;
                align-items: center;
                gap: 0.75rem;
              }

              .header .user-info span {
                font-size: 0.9rem;
                color: #2D3748;
                font-weight: 500;
              }

              .header .user-info img {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                border: 2px solid #E2E8F0;
                transition: transform 0.3s;
              }

              .header .user-info img:hover {
                transform: scale(1.1);
              }

              .content {
                background: white;
                border-radius: 0 0 1rem 1rem;
                padding: 2rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                animation: slideUp 0.8s ease;
              }

              h2 {
                color: #1E40AF;
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                text-align: center;
              }

              .options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 1.5rem;
              }

              .option {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 1rem;
                border-radius: 0.75rem;
                background: #F9FAFB;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
              }

              .option:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              }

              .option.selected {
                border: 2px solid #1E90FF;
                background: #E6F0FA;
              }

              .option img {
                width: 3.5rem;
                height: 3.5rem;
                margin-bottom: 0.5rem;
              }

              .lost-text {
                color: #EF4444;
                font-weight: 600;
              }

              .found-text {
                color: #10B981;
                font-weight: 600;
              }

              .form-group {
                margin-bottom: 1.5rem;
              }

              label {
                display: block;
                font-size: 0.9rem;
                color: #2D3748;
                margin-bottom: 0.5rem;
                font-weight: 500;
              }

              input, select, textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #E2E8F0;
                border-radius: 0.5rem;
                font-size: 1rem;
                background: #F9FAFB;
                transition: border-color 0.3s, box-shadow 0.3s;
              }

              input:focus, select:focus, textarea:focus {
                outline: none;
                border-color: #1E90FF;
                box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.2);
              }

              textarea {
                height: 5rem;
                resize: none;
              }

              .file-upload {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px dashed #E2E8F0;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                cursor: pointer;
                background: #F9FAFB;
                transition: border-color 0.3s;
              }

              .file-upload:hover {
                border-color: #1E90FF;
              }

              .file-upload input {
                display: none;
              }

              .file-upload span {
                color: #2D3748;
                font-size: 0.9rem;
                font-weight: 500;
              }

              button {
                background: linear-gradient(90deg, #1E90FF, #3B82F6);
                color: white;
                border: none;
                padding: 0.75rem;
                width: 100%;
                border-radius: 0.5rem;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, background 0.3s;
              }

              button:hover {
                background: linear-gradient(90deg, #187BCD, #2563EB);
                transform: translateY(-2px);
              }

              button:active {
                transform: translateY(0);
              }

              small {
                color: #6B7280;
                font-size: 0.85rem;
                display: block;
                margin-top: 0.25rem;
              }

              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }

              @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }

              @media (max-width: 640px) {
                .container {
                  padding: 1rem;
                }

                .content {
                  padding: 1.5rem;
                }

                .options {
                  grid-template-columns: 1fr;
                }

                h2 {
                  font-size: 1.5rem;
                }
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>FIA</h1>
            <div className="user-info">
              {userName && <span>Murakaza neza, {userName}!</span>}
              <a href="/profile">
                <img src="/images/person.png" alt="Umwirondoro" style={{ cursor: 'pointer' }} />
              </a>
            </div>
          </div>

          <div className="content">
            <h2>Wabuze ikintu? Tangaza hano</h2>

            <div className="options">
              <div
                className={`option ${selectedType === 'lost' ? 'selected' : ''}`}
                onClick={() => handleSelectOption('lost')}
              >
                <img src="/images/welcome.png" alt="Icyangombwa cyabuze" />
                <span className="lost-text">Icyangombwa cyabuze</span>
              </div>
              <div
                className={`option ${selectedType === 'found' ? 'selected' : ''}`}
                onClick={() => handleSelectOption('found')}
              >
                <img src="/images/welcome.png" alt="Icyangombwa cyabonetse" />
                <span className="found-text">Icyangombwa cyabonetse</span>
              </div>
            </div>

            <form
              id="credentialForm"
              style={{ display: formVisible ? 'block' : 'none' }}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              aria-label="Tangaza icyangombwa"
            >
              <input type="hidden" name="type" value={selectedType} />

              <div className="form-group">
                <label htmlFor="documentType">Ubwoko bw’icyangombwa</label>
                <select
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Hitamo ubwoko bw’icyangombwa</option>
                  <option value="National ID">Indangamuntu</option>
                  <option value="Passport">Pasiporo</option>
                  <option value="Driver's License">Perimi y’Ububasha bwo Gutwara</option>
                  <option value="Mutuelle Card">Ikarita y’Umutekano w’Ubuzima (Mutuelle)</option>
                  <option value="Voter ID">Ikarita y’Itora</option>
                  <option value="Employee ID">Ikarita y’Umukozi</option>
                  <option value="Student ID">Ikarita y’Ishuri</option>
                  <option value="Diploma/Certificate">Impamyabumenyi</option>
                  <option value="Residence Certificate">Icyemezo cy’Aho utuye</option>
                  <option value="Work Permit">Icyemezo cy’Aho Ukorera</option>
                  <option value="Insurance Card">Ikarita y’Ubwishingizi</option>
                  <option value="TIN Number">Nomero y’Umusoro (TIN)</option>
                  <option value="Birth Certificate">Icyemezo cy’Amavuko</option>
                  <option value="Other">Ibindi</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="documentId">Nomero y’icyangombwa</label>
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
                <label htmlFor="ownerName">Amazina nyayo nyir’icyangombwa</label>
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
                  placeholder="nka: Pasiporo y’ubururu yaburiye i Nyamirambo Y'uwitwa Nelson"
                  maxLength={200}
                />
                <small>Inyuguti ntarengwa: 200</small>
              </div>

              <div id="lostFields" className="form-group" style={{ display: selectedType === 'lost' ? 'block' : 'none' }}>
                <label htmlFor="lostDate">Itariki cyaburiyeho</label>
                <input
                  type="datetime-local"
                  id="lostDate"
                  name="lostDate"
                  value={formData.lostDate}
                  onChange={handleInputChange}
                  max={maxDateTime}
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

              <div id="foundFields" className="form-group" style={{ display: selectedType === 'found' ? 'block' : 'none' }}>
                <label htmlFor="foundDate">Itariki cyabonetseho</label>
                <input
                  type="datetime-local"
                  id="foundDate"
                  name="foundDate"
                  value={formData.foundDate}
                  onChange={handleInputChange}
                  max={maxDateTime}
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

              <div className="form-group">
                <label>Shyiraho amwe mu amafoto y’icyangombwa</label>
                <div
                  className="file-upload"
                  onClick={() => document.getElementById('pictures')?.click()}
                >
                  <span id="fileUploadText">
                    {fileCount > 0 ? `${fileCount} ifoto${fileCount > 1 ? 's' : ''} zahiswemo` : 'Ohereza amafoto'}
                  </span>
                  <input
                    type="file"
                    id="pictures"
                    name="pictures"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <input type="hidden" id="userId" name="userId" value="1" />

              <button type="submit">Komeza</button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Dashboard;