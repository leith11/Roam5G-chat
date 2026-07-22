const nodemailer = require('nodemailer');

// Generate OTP
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// Send OTP via SMS (Twilio)
const sendOTPViaSMS = async (phoneNumber, otp) => {
  try {
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `Il tuo codice OTP Roam5G Chat è: ${otp}. Non condividerlo con nessuno.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log(`✅ SMS inviato a ${phoneNumber}`);
  } catch (error) {
    console.error('SMS sending error:', error);
    throw new Error('Errore nell\'invio dell\'SMS');
  }
};

// Send OTP via Email
const sendOTPViaEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Il tuo codice OTP Roam5G Chat',
      html: `
        <h2>Benvenuto su Roam5G Chat</h2>
        <p>Il tuo codice OTP è:</p>
        <h3 style="color: #007AFF;">${otp}</h3>
        <p>Non condividerlo con nessuno. Scade tra 10 minuti.</p>
      `
    });

    console.log(`✅ Email inviata a ${email}`);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Errore nell\'invio dell\'email');
  }
};

// Send OTP (SMS or Email)
const sendOTP = async (phoneNumberOrEmail, otp) => {
  // Check if it's email or phone
  if (phoneNumberOrEmail.includes('@')) {
    return sendOTPViaEmail(phoneNumberOrEmail, otp);
  } else {
    return sendOTPViaSMS(phoneNumberOrEmail, otp);
  }
};

module.exports = {
  generateOTP,
  sendOTP,
  sendOTPViaSMS,
  sendOTPViaEmail
};
