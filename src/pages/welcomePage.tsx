
import { useNavigate } from 'react-router-dom';


const WelcomePage= () => {
  const route=useNavigate()
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FindWithAI - Document Recovery</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                margin: 0;
                padding: 0;
                font-family: 'Arial', sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background-color: #1E90FF;
                color: white;
                text-align: center;
                position: relative;
              }

              .avatar-container {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 30px;
                overflow: hidden;
                border: 3px solid rgba(255, 255, 255, 0.3);
              }

              .avatar {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              .content {
                max-width: 500px;
                padding: 0 40px 40px;
              }

              h1 {
                font-size: 28px;
                margin-bottom: 30px;
                font-weight: normal;
              }

              p {
                font-size: 16px;
                margin-bottom: 20px;
                line-height: 1.5;
              }

              .btn {
                display: inline-block;
                background-color: white;
                color: #1E90FF;
                padding: 12px 30px;
                border-radius: 4px;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                margin-top: 20px;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="avatar-container">
          <img src="/images/welcome.png" alt="Avatar" className="avatar" />
        </div>

        <div className="content">
          <h1>Wabuze icyangombwa cyangwa wacyibonye</h1>
          <p>
            Dukorane hamwe kugirango ubone icyangombwa cyawe cyabuze cyangwa se
            urangishe ibyo watoye
          </p>
          <button className="btn" onClick={()=>route('/register/step1')}>
            Tangira
          </button>
        </div>
      </body>
    </html>
  );
};

export default WelcomePage;