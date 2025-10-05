import { sendMail as sendWithResend } from "../utils/Mailers/mailv2.utils.js";
import { sendMail as sendWithBrevo } from "../utils/Mailers/mailv3.utils.js";
import { sendEmail as sendWithSmtp } from "../utils/sendEmail.js";
import { welcomeTemplate } from "../utils/mailTemplates/welcome_mail.js";
import { otpPasswordTemplate } from "../utils/mailTemplates/otpPassword_mail.js";
import { passwordChangedTemplate } from "../utils/mailTemplates/passwordChanged.js";

/**
 * Controller to send a generic email using the preferred provider.
 * Supports provider query param: provider=resend|brevo|smtp (default: smtp)
 */
export const sendGenericEmail = async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const provider = (req.query.provider || "smtp").toLowerCase();

    if (!to || !subject || !html) {
      return res.status(400).json({ error: "to, subject and html are required" });
    }

    let result;
    if (provider === "resend") {
      result = await sendWithResend(to, subject, html);
    } else if (provider === "brevo") {
      result = await sendWithBrevo(to, subject, html);
    } else {
      // default to SMTP transporter
      result = await sendWithSmtp(to, subject, html);
    }

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("sendGenericEmail error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendWelcomeMail = async (req, res) => {
  try {
    const { to, fullName, username } = req.body;
    if (!to || !fullName || !username) return res.status(400).json({ error: "to, fullName and username required" });

    const html = welcomeTemplate(fullName, username);
    await sendWithSmtp(to, "Welcome to ChitChat! 🎉", html);
    return res.status(200).json({ success: true, message: "Welcome email sent" });
  } catch (error) {
    console.error("sendWelcomeMail error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendOtpMail = async (req, res) => {
  try {
    const { to, fullName, otp } = req.body;
    if (!to || !fullName || !otp) return res.status(400).json({ error: "to, fullName and otp required" });

    const html = otpPasswordTemplate(fullName, otp);
    await sendWithSmtp(to, "Your ChitChat OTP 🔐", html);
    return res.status(200).json({ success: true, message: "OTP email sent" });
  } catch (error) {
    console.error("sendOtpMail error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendPasswordChangedMail = async (req, res) => {
  try {
    const { to, fullName, loginLink } = req.body;
    if (!to || !fullName) return res.status(400).json({ error: "to and fullName required" });

    const html = passwordChangedTemplate(fullName, loginLink || "http://localhost:3000/login");
    await sendWithSmtp(to, "Password Changed Successfully ✅", html);
    return res.status(200).json({ success: true, message: "Password changed email sent" });
  } catch (error) {
    console.error("sendPasswordChangedMail error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
