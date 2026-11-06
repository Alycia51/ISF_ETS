import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'isfets@ens.etsmtl.ca',
    pass: process.env.SMTP_PASS || '',
  },
  tls: { ciphers: 'SSLv3' },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API formulaire contact
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Champs manquants' });
  }
  try {
    await mailer.sendMail({
      from: '"ISF ÉTS — Formulaire de contact" <isfets@ens.etsmtl.ca>',
      to: 'isfets@ens.etsmtl.ca',
      replyTo: `"${name}" <${email}>`,
      subject: subject ? `[Contact ISF ÉTS] ${subject}` : `[Contact ISF ÉTS] Message de ${name}`,
      text: `Nom : ${name}\nCourriel : ${email}\n\n${message}`,
      html: `<p><strong>Nom :</strong> ${name}</p><p><strong>Courriel :</strong> <a href="mailto:${email}">${email}</a></p><hr><p>${message.replace(/\n/g, '<br>')}</p>`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Erreur envoi courriel:', err);
    res.status(500).json({ success: false, error: "Erreur lors de l'envoi" });
  }
});

// Sitemap XML
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.header('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://isf-ets.ca/fr</loc></url>
  <url><loc>https://isf-ets.ca/fr/mission</loc></url>
  <url><loc>https://isf-ets.ca/fr/realisations</loc></url>
  <url><loc>https://isf-ets.ca/fr/evenements</loc></url>
  <url><loc>https://isf-ets.ca/fr/membres</loc></url>
  <url><loc>https://isf-ets.ca/fr/blogue</loc></url>
  <url><loc>https://isf-ets.ca/fr/contact</loc></url>
  <url><loc>https://isf-ets.ca/fr/partenaires</loc></url>
</urlset>`);
});

// Production SPA static server
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // Development fallback redirect
  app.get('/', (_req: Request, res: Response) => res.redirect('/fr'));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ISF ÉTS Server → http://localhost:${PORT}`));

export default app;
