import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from '@/context/I18nContext';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { MissionPage } from '@/pages/MissionPage';
import { MembersPage } from '@/pages/MembersPage';
import { EventsPage } from '@/pages/EventsPage';
import { PartnersPage } from '@/pages/PartnersPage';
import { BlogPage } from '@/pages/BlogPage';
import { ContactPage } from '@/pages/ContactPage';
import { ProjectsIndexPage } from '@/pages/projects/ProjectsIndexPage';
import { HistoirePage } from '@/pages/projects/HistoirePage';
import { CarrieresPage } from '@/pages/projects/CarrieresPage';
import { RegardsPage } from '@/pages/projects/RegardsPage';
import { CollectePage } from '@/pages/projects/CollectePage';
import { AutresPage } from '@/pages/projects/AutresPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nProvider>
        <Routes>
          {/* Root redirect to /fr */}
          <Route path="/" element={<Navigate to="/fr" replace />} />

          {/* Localized routes */}
          <Route path="/:lang" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="mission" element={<MissionPage />} />
            <Route path="membres" element={<MembersPage />} />
            <Route path="evenements" element={<EventsPage />} />
            <Route path="partenaires" element={<PartnersPage />} />
            <Route path="blogue" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />

            {/* Réalisations sub-routes */}
            <Route path="realisations">
              <Route index element={<ProjectsIndexPage />} />
              <Route path="notre-histoire" element={<HistoirePage />} />
              <Route path="carrieres" element={<CarrieresPage />} />
              <Route path="regards" element={<RegardsPage />} />
              <Route path="collecte" element={<CollectePage />} />
              <Route path="autres" element={<AutresPage />} />
            </Route>
          </Route>

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/fr" replace />} />
        </Routes>
      </I18nProvider>
    </BrowserRouter>
  );
};

export default App;

