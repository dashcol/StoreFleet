// Import the necessary modules here
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendWelcomeEmail = async (user) => {
  // Write your code here
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.STORFLEET_MAIL,
    to: user.email,
    subject: "Welcome to StoreFleet",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Storefleet</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              text-align: center;
            }
            .logo-container {
              margin-bottom: 24px;
            }
            .cart-icon {
              width: 120px;
              height: 120px;
              margin: 20px 0;
            }
            h1 {
              color: #4a154b;
              font-size: 24px;
              margin-bottom: 16px;
            }
            p {
              color: #666666;
              font-size: 16px;
              margin-bottom: 24px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img 
              src="https://files.codingninjas.in/logo1-32230.png" 
              alt="Storefleet Logo"
              style="width: 120px; height: 120px; object-fit: contain;"
            />
            <div class="cart-icon">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTM1IDM1aDUwdjUwSDM1eiIgZmlsbD0iIzRhZDA5NiIvPgogIDxwYXRoIGQ9Ik00MCA0NWgxNXYxMEg0MHpNNjAgNDVoMTV2MTBINDB6IiBmaWxsPSJ3aGl0ZSIvPgogIDxwYXRoIGQ9Ik00MCA2MGg0MHYxNUg0MHoiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTQ1IDY1aDV2NWgtNXpNNTUgNjVoNXY1aC01ek02NSA2NWg1djVoLTV6IiBmaWxsPSIjNGFkMDk2Ii8+Cjwvc3ZnPg==" 
                alt="Shopping Cart"
                style="width: 100%; height: 100%;"
              />
            </div>
            <h1>Welcome to Storefleet</h1>
            <p>Hello ${user.name},</p>
            <p>Thank you for registering with Storefleet. We're excited to have you as a new member of our community.</p>
            <a href="#" class="button">Get Started</a>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
