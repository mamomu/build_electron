import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './pt_BR/translation.json';

const resources = {
  pt_BR: {
    translation,
  },
}

i18n.use(initReactI18next).init({
  lng: 'pt_BR',
  resources,
});