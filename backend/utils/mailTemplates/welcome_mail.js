export const welcomeTemplate = (fullName, username) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ChitChat!</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f2f7ff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2f7ff; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #4f46e5; color: #ffffff; text-align: center; padding: 30px 20px;">
              <h1 style="margin:0; font-size:28px;">Welcome to ChitChat, ${fullName}!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px 20px; color: #333333; line-height:1.6;">
              <h2 style="color:#4f46e5; margin-top:0;">Hey ${fullName},</h2>
              <p>We're thrilled to have you join our real-time chatting community. Now you can start connecting with your friends and make conversations more fun and instant!</p>
              <p>Your username: <strong>${username}</strong></p>

              <!-- Modern Gradient Button -->
              <p style="text-align:center; margin-top:25px;">
                <a href="http://localhost:3000/login" 
                   style="
                     display:inline-block;
                     padding:12px 25px;
                     background: linear-gradient(90deg, #4f46e5, #7c3aed);
                     color:#ffffff;
                     text-decoration:none;
                     border-radius:12px;
                     font-weight:bold;
                     text-align:center;
                     box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                     font-size:16px;
                   ">
                  🚀 Start Chatting
                </a>
              </p>

              <p style="margin-top:25px;">Happy chatting! 🎉</p>
              <p>— The ChitChat Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f2f7ff; text-align:center; padding:15px; font-size:12px; color:#888888;">
              You received this email because you signed up for ChitChat. If this wasn't you, please ignore this email.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
