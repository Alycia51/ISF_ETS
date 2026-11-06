import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactSidebar } from '@/components/contact/ContactSidebar';

export const ContactPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <>
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />

      <section className="contact-section">
        <div className="container contact-grid">
          <ContactForm />
          <ContactSidebar />
        </div>
      </section>
    </>
  );
};

