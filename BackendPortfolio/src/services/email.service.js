const nodemailer = require('nodemailer');
const { logger } = require('../lib/logger');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérifier le transporter au démarrage
transporter.verify()
  .then(() => logger.info('Transporter prêt'))
  .catch(err => logger.error({ err }, 'Erreur transporter'));


//Message directe gmail
const sendNotificationEmail = async (email, message) => {
  if (!process.env.EMAIL_USER) throw new Error("EMAIL_USER non défini");
  if (!email) throw new Error("Email du contact non défini");

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      replyTo: email,
      subject: "Nouveau message Portfolio",
      html: `
        <h3>Nouveau message</h3>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong> ${message}</p>
      `,
    });
    logger.info(`Notification email envoyé depuis ${email}`);
  } catch (error) {
    logger.error({ error, email }, "Erreur en envoyant la notification");
    throw error;
  }
};

//Réponse pour le message
const sendResponseMail = async (email, message, subject = "Développeur Fullstack JavaScript") => {
  if (!email) throw new Error("Destinataire non défini");
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    });
    logger.info(`Email de réponse envoyé à ${email}`);
  } catch (error) {
    logger.error({ error, email }, "Erreur en envoyant la réponse email");
    throw error;
  }
};

//message automatique au visiteur
const sendAutoReply = async (name, email) => {
  if (!email) throw new Error("Destinataire non défini");
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Merci pour votre message",
      html: `
        Bonjour,<br/><br/>
        Merci pour votre message et l'attention portée à mon profil. Nous vous répondrons rapidement.<br/><br/>
        Cordialement,<br/>
      `,
    });
    logger.info(`Auto-reply envoyé à ${email}`);
  } catch (error) {
    logger.error({ error, email }, "Erreur en envoyant l'auto-reply");
    throw error;
  }
};

module.exports = {
  sendNotificationEmail,
  sendResponseMail,
  sendAutoReply,
};