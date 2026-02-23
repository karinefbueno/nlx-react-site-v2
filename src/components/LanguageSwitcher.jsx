import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const flags = {
  en: '🇺🇸',
  pt: '🇧🇷',
  es: '🇪🇸'
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginLeft: 'auto'
    }}>
      {Object.entries(flags).map(([lang, flag]) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          style={{
            fontSize: '20px',
            border: language === lang ? '2px solid #fe5b29' : '2px solid #e9ecef',
            borderRadius: '6px',
            background: language === lang ? 'rgba(254, 91, 41, 0.05)' : 'transparent',
            cursor: 'pointer',
            padding: '6px 10px',
            transition: 'all 0.2s ease',
            opacity: language === lang ? 1 : 0.7
          }}
          title={lang.toUpperCase()}
          aria-label={`Switch to ${lang}`}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}
