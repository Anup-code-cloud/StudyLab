import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS },
});

export const sendMail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: env.EMAIL_FROM || env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};

export const sendOTP = async (to, otp) => {
  const html = `
    <div style="font-family: system-ui, -apple-system; max-width: 480px;">
      <h2>StudyLab OTP</h2>
      <p>Your OTP code is:</p>
      <div style="font-size: 28px; font-weight: 700; letter-spacing: 4px;">${otp}</div>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;
  return sendMail({ to, subject: "Your OTP Code", text: `Your OTP code is ${otp}`, html });
};
