// src/i18n.ts ou src/config/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar arquivos de tradução
import enTranslations from '@/locales/en/main.json';
import ptTranslations from '@/locales/pt/main.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslations
        },
        pt: {
            translation: ptTranslations
        }
    },
    lng: 'en', // idioma padrão
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;