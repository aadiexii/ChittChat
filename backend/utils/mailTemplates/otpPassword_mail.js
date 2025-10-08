export const otpPasswordTemplate = (fullName, otp) => `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f2f7ff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.1); overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#f59e0b; color:#fff; text-align:center; padding:30px 20px;">
              <h1>Password Reset OTP</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px 20px; color:#333333; line-height:1.6;">
              <h2 style="margin-top:0;">Hello ${fullName},</h2>
              <p>We received a request to reset your password. Use the OTP below to verify your identity:</p>

              <!-- OTP Code -->
              <p style="text-align:center; margin:25px 0;">
                <span style="display:inline-block; font-size:24px; font-weight:bold; color:#4f46e5; letter-spacing:4px; padding:12px 25px; border:2px dashed #4f46e5; border-radius:12px;">
                  ${otp}
                </span>
              </p>

              <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>

              <p>If you didn't request this, you can ignore this email.</p>

              <p>— The ChitChat Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f2f7ff; text-align:center; padding:15px; font-size:12px; color:#888888;">
              You received this email because you requested a password reset.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
