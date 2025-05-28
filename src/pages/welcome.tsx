import React, { useState, useEffect } from 'react';
// ✅ Correct import (adjust path if needed)
import Contact from './Contact';


const Welcome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking a menu link
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleScroll);
    });

    // Lazy load images
    const images = document.querySelectorAll('img');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    images.forEach((img) => observer.observe(img));

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Roboto', sans-serif;
              background-color: #f4f7fa;
              color: #2d3748;
              line-height: 1.7;
              scroll-behavior: smooth;
            }

            a {
              text-decoration: none;
              color: inherit;
            }

            header {
              background: linear-gradient(135deg, #004aad, #2b6cb0);
              color: white;
              padding: 1.5rem 2rem;
              position: fixed;
              width: 100%;
              top: 0;
              z-index: 1000;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .header-container {
              max-width: 1400px;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .logo {
              font-size: 1.8rem;
              font-weight: 700;
            }

            .menu-icon {
              display: none;
              font-size: 1.8rem;
              cursor: pointer;
            }

            nav {
              display: flex;
              gap: 1.5rem;
            }

            nav a {
              color: white;
              font-weight: 500;
              padding: 0.5rem 1rem;
              border-radius: 5px;
              transition: background 0.3s, color 0.3s;
            }

            nav a:hover {
              background: white;
              color: #004aad;
            }

            .sidebar {
              display: none;
              position: fixed;
              top: 0;
              left: -250px;
              width: 250px;
              height: 100%;
              background: #004aad;
              padding: 2rem;
              transition: left 0.3s ease;
              z-index: 999;
              overflow-y: auto;
            }

            .sidebar.show {
              left: 0;
              display: block;
            }

            .sidebar a {
              color: white;
              display: block;
              padding: 1rem 0;
              font-weight: 500;
            }

            .sidebar a:hover {
              color: #a0c4ff;
            }

            section {
              max-width: 1400px;
              margin: 100px auto 40px;
              padding: 3rem;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
              animation: fadeIn 1s ease both;
            }

            section h2 {
              font-size: 2.2rem;
              color: #004aad;
              margin-bottom: 1.5rem;
              position: relative;
            }

            section h2::after {
              content: '';
              width: 60px;
              height: 4px;
              background: #004aad;
              position: absolute;
              bottom: -10px;
              left: 0;
            }

            section p, section ul {
              font-size: 1.1rem;
              margin-bottom: 1.5rem;
            }

            section ul li {
              margin-bottom: 0.8rem;
              position: relative;
              padding-left: 1.5rem;
            }

            section ul li::before {
              content: '✔';
              color: #004aad;
              position: absolute;
              left: 0;
            }

            #home {
              background: url('/images/rwanda-hero.png') center/cover no-repeat;
              color: white;
              text-align: center;
              padding: 12rem 2rem;
              margin-top: 80px;
              border-radius: 0;
              position: relative;
            }

            #home::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.5);
              z-index: 1;
            }

            #home h2, #home p {
              position: relative;
              z-index: 2;
            }

            #home h2 {
              font-size: 3rem;
              margin-bottom: 1rem;
            }

            #home p {
              font-size: 1.3rem;
              max-width: 800px;
              margin: 0 auto;
            }

            .gallery {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 1.5rem;
              margin-top: 2rem;
            }

            .gallery img {
              width: 100%;
              border-radius: 10px;
              border: 2px solid #e2e8f0;
              transition: transform 0.3s;
            }

            .gallery img:hover {
              transform: scale(1.05);
            }

            .testimonials {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              margin-top: 2rem;
            }

            .testimonial-card {
              background: #f9fafb;
              padding: 1.5rem;
              border-radius: 10px;
              text-align: center;
            }

            .testimonial-card p {
              font-style: italic;
              margin-bottom: 1rem;
            }

            .testimonial-card h4 {
              color: #004aad;
              font-weight: 600;
            }

            .faq-item {
              margin-bottom: 1.5rem;
            }

            .faq-item h3 {
              font-size: 1.3rem;
              color: #004aad;
              margin-bottom: 0.5rem;
            }

            footer {
              background: #004aad;
              color: white;
              text-align: center;
              padding: 2rem;
              margin-top: 3rem;
            }

            footer a {
              color: #a0c4ff;
              font-weight: 500;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            /* Responsive adjustments */
            @media (max-width: 1024px) {
              section {
                padding: 2rem;
              }

              #home {
                padding: 8rem 1.5rem;
              }

              #home h2 {
                font-size: 2.5rem;
              }
            }

            @media (max-width: 768px) {
              .header-container {
                flex-wrap: wrap;
              }

              nav {
                display: none; /* hide normal nav on small */
              }

              .menu-icon {
                display: block;
              }

              .sidebar {
                display: block; /* enable sidebar (hidden offscreen) */
              }

              section {
                margin: 80px 1rem 20px;
                padding: 1.5rem;
              }

              #home {
                padding: 6rem 1rem;
              }

              #home h2 {
                font-size: 2rem;
              }

              #home p {
                font-size: 1.1rem;
              }
            }

            @media (max-width: 480px) {
              .logo {
                font-size: 1.5rem;
              }

              section h2 {
                font-size: 1.8rem;
              }

              .gallery {
                grid-template-columns: 1fr;
              }
            }
          `,
        }}
      />

      <header>
        <div className="header-container">
          <div className="menu-icon" onClick={toggleSidebar} aria-label="Toggle menu" role="button" tabIndex={0}>
            <i className="fas fa-bars"></i>
          </div>
          <div className="logo">Find with AI Rwanda</div>
          <nav>
            <a href="#home">Ahabanza</a>
            <a href="#about">Ibyacu</a>
            <a href="#services">Serivisi</a>
            <a href="#testimonials">Abatubwira</a>
            <a href="#faq">Ibibazo</a>
            <a href="#contact">Tuvugishe</a>
            <a href="/login" className="login-button">
              <i className="fas fa-sign-in-alt"></i> Injira
            </a>
          </nav>
        </div>

        {/* Sidebar menu for mobile */}
        <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`} id="sidebar">
          <a href="#home" onClick={handleLinkClick}>
            Ahabanza
          </a>
          <a href="#about" onClick={handleLinkClick}>
            Ibyacu
          </a>
          <a href="#services" onClick={handleLinkClick}>
            Serivisi
          </a>
          <a href="#testimonials" onClick={handleLinkClick}>
            Abatubwira
          </a>
          <a href="#faq" onClick={handleLinkClick}>
            Ibibazo
          </a>
          <a href="#contact" onClick={handleLinkClick}>
            Tuvugishe
          </a>
          <a href="/login" className="login-button" onClick={handleLinkClick}>
            <i className="fas fa-sign-in-alt"></i> Injira
          </a>
        </div>
      </header>

      <section id="home">
      <br/>
        <br />
        <br />
        <h2>Shakisha Ibintu Byawe n'Ikoranabuhanga</h2>
        <p>
          Turabafasha kubona ibyangombwa byatakaye mu buryo bwihuse hifashishijwe ikoranabuhanga rya AI.
          Sisitemu yacu igezweho ikorana n’inzego z’ubuyobozi mu Rwanda kugirango ibisubizo by’ibyangombwa
          byawe bigushyikire vuba kandi mu buryo bworoshye.
        </p>
      </section>

      <section id="about">
        
        <h2>Ibyacu</h2>
        <br/>
        <br />
        <br />
        <p>
          Find with AI Rwanda ni urubuga rwashinzwe n’abanyarwanda bafite intego yo guhuza abantu
          bataye ibyangombwa n'ababibonye mu buryo bwihuse kandi bwisanzuye. Dufite ubunararibonye mu
          ikoreshereze ry’ikoranabuhanga mu gukemura ibibazo by’abaturarwanda, cyane cyane mu bice
          by’icyaro.
        </p>
        <p>
          Twiyemeje guteza imbere uburyo bwo gushaka no gusubiza ibyangombwa byoroshye, buzamara
          kandi bugera kuri buri wese. Ubushakashatsi bwacu bukoresha AI kugirango bumenye neza ibyangombwa
          byabonetse no kubyerekana ababifite.
        </p>
        <div className="gallery">
          <img src="/images/id.png" alt="Indangamuntu y’u Rwanda" data-src="/images/id.png" />
          <img src="/images/mutuelle.png" alt="Ikirango cya Mutuelle de Santé" data-src="/images/mutuelle.png" />
          <img src="/images/passport.png" alt="Paspore y’u Rwanda" data-src="/images/passport.png" />
        </div>
      </section>

      <section id="services">
        <h2>Serivisi Zacu</h2>
        <br/>
        <br />
        <br />
        <p>
          Dutanga serivisi z’ikoranabuhanga zihamye kugirango tubafashe mu kubona ibyangombwa byawe
          byatakaye cyangwa kumenyekanisha ibyabonetse.
        </p>
        <ul>
          <li>Gutangaza ibyangombwa byatakaye cyangwa byabonetse binyuze ku rubuga rwacu.</li>
          <li>Guhuza abafite ibyangombwa n’ababikeneye mu buryo bworoshye kandi bwihuse.</li>
          <li>Kugenzura amakuru ku buryo bwizewe hifashishijwe AI.</li>
          <li>Kumenyesha abayobozi b’inzego z’ibanze ibijyanye n’ibyangombwa byatakaye cyangwa byabonetse.</li>
          <li>Gutegura raporo ku bijyanye n’ibyangombwa byatakaye mu Rwanda.</li>
        </ul>
      </section>

      <section id="testimonials">
      <br/>
        <br />
        <br />

        <h2>Abatubwira</h2>
        <div className="testimonials">
  <div className="testimonial-card">
    <p>
      "Iyi sisitemu yatumye mbona indangamuntu yanjye nari nataye mu gihe gito cyane."
    </p>
    <h4>Jean Paul</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Ndashimira uburyo serivisi zabo ziri hafi y’abaturage, cyane cyane mu cyaro."
    </p>
    <h4>Marie Claire</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Gukoresha AI mu gushaka ibyangombwa byatakaye ni igitekerezo cyiza cyane."
    </p>
    <h4>Eric</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Sisitemu yabo yihuta kandi yizewe, byamfashije cyane."
    </p>
    <h4>Aline</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Kubona pasiporo yanjye byahise bitinda gato kubera iyi porogaramu."
    </p>
    <h4>Samuel</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Nshimira cyane ubufasha bwanjye bwose buva kuri Find with AI Rwanda."
    </p>
    <h4>Chantal</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Nari nabuze permis yanjye, barayibonye vuba kandi mu buryo bwizewe."
    </p>
    <h4>Fabrice</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Ikoranabuhanga rikoreshwa na Find with AI riradufasha cyane mu buzima bwacu."
    </p>
    <h4>Emmy</h4>
  </div>
  <div className="testimonial-card">
    <p>
      "Ndagira inama buri wese gukoresha iyi sisitemu, ni ingenzi kandi ifite ireme."
    </p>
    <h4>Jeanette</h4>
  </div>
</div>

      </section>

      <section id="faq">
      <br/>
        <br />
        <br />
        <h2>Ibibazo Bikunze Kubazwa (FAQ)</h2>

        <div className="faq-item">
          <h3>Nigute nshobora gutangaza ikintu nataye?</h3>
          <p>Ufite uburyo bwo kwiyandikisha no gutanga amakuru asobanura neza icyo wataye.</p>
        </div>
        <div className="faq-item">
          <h3>Ese sisitemu ikoresha iyihe mikorere?</h3>
          <p>Ikorana na AI kugirango igenzure kandi isuzume amakuru yatanzwe n’abakoresha.</p>
        </div>
        <div className="faq-item">
          <h3>Ni gute nshobora kubona ibyo nabuze?</h3>
          <p>Ubona amakuru ajyanye n’ibyo wataye binyuze ku rubuga rwacu mu buryo bworoshye.</p>
        </div>
        <div className="faq-item">
          <h3>Ni gute nakwemeza ko amakuru yanjye ari ibanga?</h3>
          <p>Turubahiriza amategeko y’ubwirinzi bw’amakuru kandi dukoresha ikoranabuhanga rihamye.</p>
        </div>
        <div className="faq-item">
          <h3>Ese nshobora gukoresha sisitemu nta murongo wa interineti?</h3>
          <p>Ubusanzwe sisitemu ikora hakoreshejwe internet, ariko hari gahunda yo kwagura serivisi.</p>
        </div>
        <div className="faq-item">
          <h3>Ni iki gituma sisitemu yacu itandukanye?</h3>
          <p>Dukoresha AI kandi dufite ubufatanye n’inzego za leta mu gukemura ibibazo by’abaturage.</p>
        </div>
      </section>

      {/* <section id="contact">
      <br/>
        <br />
        <br />
  <h2>Tuvugishe</h2>
  <p>
    <strong>Telefone:</strong> <a href="tel:+250798963223">+250 798 963 223</a><br />
    <strong>Email:</strong> <a href="mailto:irasubizasalynelson@gmail.com">irasubizasalynelson@gmail.com</a><br />
    <a
      href="https://maps.app.goo.gl/Nf3DNjGnhCgREL4S7"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#004aad' }}
    >
      Reba aho turi kuri Google Maps
    </a>
  </p>
  <p>
  Niba ufite ibibazo cyangwa ibisabwa, twandikire kuri{' '}
  <a href="mailto:nelson.irasubiza@rca.ac.rw" style={{ color: '#004aad' }}>
    <i className="fas fa-envelope" aria-hidden="true" style={{ marginRight: '6px' }}></i>
    support@findwithai.rw
  </a>{' '}
  cyangwa uhamagare{' '}
  <a href="tel:+2507898963223" style={{ color: '#004aad' }}>
    <i className="fas fa-phone" aria-hidden="true" style={{ marginRight: '6px' }}></i>
    +250 798 963 223
  </a>.
</p>

</section>
 */}
<section id="contact">
<Contact />
</section>

      <footer>
        &copy; {new Date().getFullYear()} Find with AI Rwanda. Uburenganzira bwose burabitswe.
      </footer>
    </>
  );
};

export default Welcome;
