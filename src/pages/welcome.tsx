import React, { useState, useEffect } from 'react';

const Welcome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    images.forEach((img) => observer.observe(img));

    // Cleanup event listeners
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <html lang="rw">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Find with AI Rwanda: Harnessing AI to help Rwandans recover lost documents quickly and efficiently."
        />
        <meta name="keywords" content="AI Rwanda, lost documents, Find with AI, Rwanda technology" />
        <title>Murakaza neza - Shakisha n'Ikoranabuhanga mu Rwanda</title>
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
              }

              .sidebar.show {
                left: 0;
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
                  display: none;
                }

                .menu-icon {
                  display: block;
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
      </head>
      <body>
        <header>
          <div className="header-container">
            <div className="menu-icon" onClick={toggleSidebar}>
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
            </nav>
          </div>
          <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`} id="sidebar">
            <a href="#home" onClick={toggleSidebar}>
              Ahabanza
            </a>
            <a href="#about" onClick={toggleSidebar}>
              Ibyacu
            </a>
            <a href="#services" onClick={toggleSidebar}>
              Serivisi
            </a>
            <a href="#testimonials" onClick={toggleSidebar}>
              Abatubwira
            </a>
            <a href="#faq" onClick={toggleSidebar}>
              Ibibazo
            </a>
            <a href="#contact" onClick={toggleSidebar}>
              Tuvugishe
            </a>
          </div>
        </header>

        <section id="home">
          <h2>Shakisha Ibintu Byawe n'Ikoranabuhanga</h2>
          <p>
            Turabafasha kubona ibyangombwa byatakaye mu buryo bwihuse hifashishijwe ikoranabuhanga rya AI.
            Sisitemu yacu igezweho ikorana n’inzego z’ubuyobozi mu Rwanda kugirango ibisubizo by’ibyangombwa
            byawe bigushyikire vuba kandi mu buryo bworoshye.
          </p>
        </section>

        <section id="about">
          <h2>Ibyacu</h2>
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
          <p>
            Dutanga serivisi z’ikoranabuhanga zihamye kugirango tubafashe mu kubona ibyangombwa byawe
            byatakaye cyangwa kumenyekanisha ibyabonetse.
          </p>
          <ul>
            <li>Gutangaza ibyangombwa byatakaye cyangwa byabonetse binyuze kuri sisitemu yacu.</li>
            <li>Koresha ikoranabuhanga rya AI mu gushaka aho ikintu cyawe cyabonetse mu buryo bwihuse.</li>
            <li>Gucunga no gukosora amakosa mbere yo guhuza ibyangombwa n'ababifite.</li>
            <li>Kwemeza ubusugire bw'amafoto n'amakuru yoherejwe kuri sisitemu yacu.</li>
            <li>Kugenzura no kumenyesha ibyangombwa byabonetse mu buryo bwa digital.</li>
          </ul>
          <p>
            <a href="/welcome" style={{ color: '#004aad', fontWeight: 500, textDecoration: 'underline' }}>
              Tangira gushaka cyangwa gutangaza ibyangombwa byawe hano
            </a>
          </p>
        </section>

        <section id="testimonials">
          <h2>Abatubwira</h2>
          <div className="testimonials">
            <div className="testimonial-card">
              <p>"Nari ntaye indangamuntu yanjye, ariko sisitemu ya Find with AI yanyereje aho yabonetse mu minsi itatu gusa!"</p>
              <h4>Hatuma Charles</h4>
            </div>
            <div className="testimonial-card">
              <p>"Porogaramu yabo yoroshye kandi yansubije pasiporo yanjye vuba. Ndabashimiye cyane!"</p>
              <h4>Igabe Murangwa Brilllante</h4>
            </div>
            <div className="testimonial-card">
              <p>"Ubunararibonye bwabo mu gukoresha AI bwanyereje uburyo bworoshye bwo kubona ibyangombwa byanjye."</p>
              <h4>Nibishaka Raphael</h4>
            </div>
            <div className="testimonial-card">
              <p>"Find with AI yampaye icyizere! Naritaye permis ariko bayinsubije bidatinze."</p>
              <h4>Gisa Fred</h4>
            </div>
            <div className="testimonial-card">
              <p>"Nari maze kwihagararaho ariko iyi sisitemu yankuye mu gihirahiro mu masaha 48 gusa!"</p>
              <h4>Ntare Kayitare Prince</h4>
            </div>
            <div className="testimonial-card">
              <p>"Sinigeze ntekereza ko kubona icyangombwa cyanjye byashoboka ariko Find with AI yampinduriye ubuzima."</p>
              <h4>Tush ti</h4>
            </div>
          </div>
        </section>

        <section id="faq">
          <h2>Ibibazo Bikunze Kwibazwa</h2>
          <div className="faq-item">
            <h3>Ni gute nshobora gutangaza ibyangombwa byanjye byatakaye?</h3>
            <p>
              Ushobora kohereza amakuru y’ibyangombwa byawe binyuze kuri sisitemu yacu ya WhatsApp cyangwa
              urubuga rwacu. Sisitemu yacu izakora ibyo yashoboye kugirango ibyereke aho byabonetse.
            </p>
          </div>
          <div className="faq-item">
            <h3>Ni serivisi ki ziboneka kuri porogaramu yanyu?</h3>
            <p>
              Porogaramu yacu iri gukorerwa kugirango ikorane na WhatsApp, Play Store, na App Store,
              kandi izatanga uburyo bworoshye bwo gutangaza no kubona ibyangombwa byawe.
            </p>
          </div>
          <div className="faq-item">
            <h3>Ibyangombwa byanjye byabonetse, ni gute nabimenyesha?</h3>
            <p>
              Kohereza amakuru y’ibyangombwa byabonetse kuri sisitemu yacu, tuzabafasha kubona nyirabyo
              mu buryo bwihuse kandi bwizewe.
            </p>
          </div>
        </section>

        <section id="contact">
          <h2>Tuvugishe</h2>
          <p>
            Tubarizwa muri Rwanda Coding Academy, Nyabihu District, Province y’Uburengerazuba.
            Twakwishimira kugera kuri wowe kandi tuzakomeza gukora uko dushoboye kugirango dukomeze
            gutanga serivisi ze.
          </p>
          <p>
            <strong>Telefone:</strong> +250 798963223<br />
            <a href="mailto:irasubizasalynelson@gmail.com">irasubizasalynelson@gmail.com</a><br />
            <a href="https://maps.app.goo.gl/Nf3DNjGnhCgREL4S7" target="_blank" style={{ color: '#004aad' }}>
              Reba aho turi kuri Google Maps
            </a>
          </p>
        </section>

        <footer>
          © 2025 Find with AI Rwanda. Made with . <a href="home">Nelson</a>
        </footer>
      </body>
    </html>
  );
};

export default Welcome;