export const passwordChangedTemplate = (fullName, loginLink) => {
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Changed Successfully</title>
  </head>
  <body style="background-color: #f6f9fc; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table role="presentation" style="background-color: #ffffff; border-radius: 12px; width: 100%; max-width: 520px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 30px 40px; text-align: center;">
                <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Password Icon" width="64" height="64" style="margin-bottom: 20px;" />
                <h2 style="color: #333333; margin-bottom: 10px;">Password Changed Successfully</h2>
                <p style="color: #555555; font-size: 15px; line-height: 22px; margin-bottom: 30px;">
                  Hello <strong>${fullName}</strong>,<br><br>
                  Your account password has been changed successfully. If you made this change, no further action is needed.<br><br>
                  However, if you didn’t change your password, please reset it immediately or contact our support team.
                </p>
                <a href="${loginLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">
                  Go to Login
                </a>
                <p style="color: #999999; font-size: 13px; margin-top: 30px;">
                  If you have any questions, feel free to reach out at 
                  <a href="mailto:support@chittchat.com" style="color: #007bff; text-decoration: none;">support@chittchat.com</a>.
                </p>
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
                <p style="color: #aaaaaa; font-size: 12px;">
                  © ${year} ChittChat. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
