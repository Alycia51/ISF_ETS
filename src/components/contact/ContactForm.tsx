import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';

export const ContactForm: React.FC = () => {
  const { t } = useI18n();
  const c = t.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(c.subjectOptions[0] || '');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert(data.error || c.errorSend);
      }
    } catch (err) {
      console.error('Erreur contact:', err);
      alert(c.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-wrap">
      {isSuccess && (
        <div id="successMsg" className="alert-success" style={{ display: 'block' }}>
          {c.successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>{c.nameLabel}</label>
            <input
              type="text"
              name="name"
              placeholder={c.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>{c.emailLabel}</label>
            <input
              type="email"
              name="email"
              placeholder={c.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>{c.subjectLabel}</label>
          <select
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {c.subjectOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{c.messageLabel}</label>
          <textarea
            name="message"
            rows={6}
            placeholder={c.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          id="submitBtn"
          className="btn btn--primary"
          type="submit"
          disabled={isLoading}
          style={{
            animation: isShaking ? 'shake .4s ease' : undefined,
          }}
        >
          {isLoading ? c.sending : c.sendBtn}
        </button>
      </form>
    </div>
  );
};
