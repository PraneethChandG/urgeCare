// server.js or routes/sendEmail.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables
import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();
import User from "../models/User.js"; // ✅ Import your User model
import axios from "axios";
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const GMAIL_ID = process.env.GMAIL_ID;
router.post("/", async (req, res) => {
  // ✅ root POST route
  const { from, to, subject, html, userNameEntered } = req.body;
  console.log("Request body:", from, to, subject, html, userNameEntered);
  const emailTemplate = `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #444; padding: 20px;">
    <h1 style="color: #007bff;">Welcome to Urge Care 🎉</h1>
    <p>Hi ${userNameEntered},</p>
    <p>Thanks for subscribing! We’re excited to have you as part of our community.</p>
    <p>You’ll receive occasional updates, insider news, and special offers.</p>

    <a href="https://landingpagefrontend.vercel.app/" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Visit Our Site
    </a>

    <p style="margin-top: 30px;">Cheers,<br>The Urge Care Team</p>
  </body>
</html>
`

  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: GMAIL_ID,
            pass: GMAIL_PASSWORD,
        },
    });

    var mailOptions = {
      from: GMAIL_ID,
      to: to,
      subject: "Thanks for Subscribing! You're one of the first ones to join us.",
      html: emailTemplate
    };

    const emailResponse = await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('Email sent: ' + info.response);
        return info.response;
      }
    });

    // 2. Save to DB
    const userID = Date.now().toString(); // or use uuid
    const newUser = new User({ userName: userNameEntered, userEmail: to, userID: userID });
    await newUser.save();
    console.log("✅ Email sent successfully", emailResponse);
    res.status(200).json({ success: true, data: emailResponse });
  } catch (error) {
    console.error("❌ Failed to send email:", error?.message || error);
    res.status(500).json({ success: false, error: error?.message || "Internal Server Error" });
  }
});

export default router;
