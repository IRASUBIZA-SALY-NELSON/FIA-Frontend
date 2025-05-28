import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://10.12.75.206:8083/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Murakoze! Ubutumwa bwanyu bwoherejwe.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Hari ikibazo cyo kohereza ubutumwa, gerageza nyuma.');
      }
    } catch (error) {
      alert('Hari ikibazo cyo kohereza ubutumwa, gerageza nyuma.');
      console.error('Error submitting feedback:', error);
    }
  };
  

  return (
    <section
      id="contact"
      style={{
        padding: '40px',
        maxWidth: '700px',
        margin: 'auto',
        animation: 'fadeIn 1s ease-in-out'
      }}
    >
      <h2>Tuvugishe</h2>

      <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
        <i className="fas fa-phone" style={{ color: '#004aad', marginRight: '10px' }}></i>
        <a
          href="tel:+250798963223"
          style={{ color: '#004aad', textDecoration: 'none' }}
        >
          +250 798 963 223
        </a>
      </p>

      <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
  <i className="fas fa-envelope" style={{ color: '#004aad', marginRight: '10px' }}></i>
  <a
    href="mailto:nelson.irasubiza@rca.ac.rw?subject=Ikibazo&body=Ndagirango%20mbabaze..."
    style={{ color: '#004aad', textDecoration: 'none' }}
  >
    nelson.irasubiza@rca.ac.rw
  </a>
</p>


      <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
        <i className="fas fa-map-marker-alt" style={{ color: '#004aad', marginRight: '10px' }}></i>
        <a
          href="https://maps.app.goo.gl/Nf3DNjGnhCgREL4S7"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#004aad', textDecoration: 'none' }}
        >
          Reba kuri Google Maps
        </a>
      </p>

      <hr style={{ margin: '30px 0' }} />

      <h3>Tanga ibitekerezo cyangwa ikibazo</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Izina ryawe:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Injiza izina"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        /><br />

        <label htmlFor="email">Imeli yawe:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Injiza imeli"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        /><br />

        <label htmlFor="message">Ubutumwa bwawe:</label><br />
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Andika ubutumwa hano..."
          value={formData.message}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        ></textarea><br />

        <button
          type="submit"
          style={{
            backgroundColor: '#004aad',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          Ohereza
        </button>
      </form>

      {/* Inline animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
