import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../en/translation.json';
import translationVI from '../vi/translation.json';
import translationSG from '../sg/translation.json';
import translationTH from '../th/translation.json';

const resources = {
    en: { translation: translationEN },
    vn: { translation: translationVI },
    sg: { translation: translationSG },
    th: { translation: translationTH },
};

i18next.use(initReactI18next).init({
    lng: 'vn',
    debug: true,
    resources,
});
