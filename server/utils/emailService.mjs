import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendFraudAlertEmail = async (username, location) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "admin@company.com",
    subject: "Suspicious Login Detected",
    html: `
      <h3>Fraud Alert!</h3>
      <p>User <strong>${username}</strong> logged in from a suspicious location: <strong>${location}</strong>.</p>
      <p>Please investigate immediately.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
