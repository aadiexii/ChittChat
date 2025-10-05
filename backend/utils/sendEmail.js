import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();  

// Brevo SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASS, // SMTP password / API key
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"ChitChat" <${process.env.SMTP_EMAIL}>`, // sender email
      to,
      subject,
      html,
    });
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};
