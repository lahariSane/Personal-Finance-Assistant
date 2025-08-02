import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const url = `http://localhost:5000/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${url}">here</a> to verify your account.</p>`
  });
};
