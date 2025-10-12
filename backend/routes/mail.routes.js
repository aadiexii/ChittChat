import express from "express";
import {
  sendGenericEmail,
  sendWelcomeMail,
  sendOtpMail,
  sendPasswordChangedMail,
} from "../controllers/mail.controller.js";

const router = express.Router();

// Generic POST /api/mail/send?provider=resend|brevo|smtp
router.post("/send", sendGenericEmail);

// Convenience endpoints for common templates
router.post("/welcome", sendWelcomeMail);
router.post("/otp", sendOtpMail);
router.post("/password-changed", sendPasswordChangedMail);

export default router;
