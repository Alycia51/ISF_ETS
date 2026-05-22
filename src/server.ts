import express, { Request, Response } from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { PagePresentation } from './presentation/pagePresentation';
import { Locale } from './models/types';

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

app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root → redirect FR
app.get('/', (_req: Request, res: Response) => res.redirect('/fr'));

// Home
app.get('/:locale(fr|en|es)', (req: Request, res: Response) => {
  const locale = PagePresentation.getLocale(req.params.locale) as Locale;
  res.render('pages/home', PagePresentation.buildPageData(locale, 'home'));
});

// Autres pages
const routes: { slug: string; view: string; page: string }[] = [
  { slug: 'mission',      view: 'mission',   page: 'mission'   },
  { slug: 'evenements',   view: 'events',    page: 'events'    },
  { slug: 'membres',      view: 'members',   page: 'members'   },
  { slug: 'blogue',       view: 'blog',      page: 'blog'      },
  { slug: 'contact',      view: 'contact',   page: 'contact'   },
  // Sous-pages réalisations
  { slug: 'realisations',                        view: 'projects/index',    page: 'projects'    },
  { slug: 'realisations/notre-histoire',         view: 'projects/histoire', page: 'projects'    },
  { slug: 'realisations/carrieres',              view: 'projects/carrieres',page: 'projects'    },
  { slug: 'realisations/regards',                view: 'projects/regards',  page: 'projects'    },
  { slug: 'realisations/collecte',               view: 'projects/collecte', page: 'projects'    },
  { slug: 'realisations/autres',                 view: 'projects/autres',   page: 'projects'    },
];

routes.forEach(({ slug, view, page }) => {
  app.get(`/:locale(fr|en|es)/${slug}`, (req: Request, res: Response) => {
    const locale = PagePresentation.getLocale(req.params.locale) as Locale;
    res.render(`pages/${view}`, PagePresentation.buildPageData(locale, page));
  });
});

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
    res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi' });
  }
});

// 404 fallback
app.use((_req: Request, res: Response) => res.redirect('/fr'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ISF ÉTS → http://localhost:${PORT}`));

export default app;
