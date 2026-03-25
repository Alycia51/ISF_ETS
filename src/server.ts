import express, { Request, Response } from 'express';
import path from 'path';
import { PagePresentation } from './presentation/pagePresentation';
import { Locale } from './models/types';

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
  { slug: 'mission',      view: 'mission',  page: 'mission'  },
  { slug: 'realisations', view: 'projects', page: 'projects' },
  { slug: 'evenements',   view: 'events',   page: 'events'   },
  { slug: 'membres',      view: 'members',  page: 'members'  },
  { slug: 'contact',      view: 'contact',  page: 'contact'  },
];

routes.forEach(({ slug, view, page }) => {
  app.get(`/:locale(fr|en|es)/${slug}`, (req: Request, res: Response) => {
    const locale = PagePresentation.getLocale(req.params.locale) as Locale;
    res.render(`pages/${view}`, PagePresentation.buildPageData(locale, page));
  });
});

// API formulaire contact
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Champs manquants' });
  }
  console.log('📬 Contact:', req.body);
  res.json({ success: true });
});

// 404 fallback
app.use((_req: Request, res: Response) => res.redirect('/fr'));

app.listen(3000, () => console.log('✅ ISF ÉTS → http://localhost:3000'));

export default app;