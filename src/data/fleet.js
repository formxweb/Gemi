// Fleet data — structured so it can be moved into a CMS as-is.
// Values below were compiled from public listings of the Denden fleet and must be
// confirmed by Denden before publication. Fields left undefined are simply not rendered.
import diProfile from '../assets/img/di-profile.jpg';
import d5 from '../assets/img/d5-exterior.jpg';
import d7 from '../assets/img/d7-exterior.jpg';

export const fleet = [
  {
    slug: 'denden-istanbul',
    name: 'DenDen İstanbul',
    detailPage: true,
    image: diProfile,
    specs: { length: 35, guests: 60, cabins: 1, built: 2023, engines: '2 × 1,000 hp' },
    summary: {
      en: 'The newest yacht in the fleet, in service since spring 2023. A wide main saloon, an open aft deck and a flybridge — laid out for receptions of up to sixty.',
      tr: '2023 baharından bu yana filonun en yeni yatı. Geniş ana salon, açık kıç güverte ve flybridge; altmış kişiye kadar davetler için tasarlandı.',
    },
    sources: ['adayacht.com listing', 'kiraliktekneler.com (in service 29 April 2023)'],
  },
  {
    slug: 'denden-5',
    name: 'DenDen 5',
    image: d5,
    specs: { length: 21, guests: 12, cabins: 2, built: 2018, refit: 2020 },
    summary: {
      en: 'Two cabins and a table for twelve. The quieter choice for a dinner, a proposal or a small family evening.',
      tr: 'İki kabin ve on iki kişilik bir sofra. Bir akşam yemeği, bir evlilik teklifi ya da küçük bir aile buluşması için daha sakin seçim.',
    },
    sources: ['adayacht.com listing'],
  },
  {
    slug: 'denden-7',
    name: 'DenDen 7',
    image: d7,
    specs: { length: 19, guests: 20, cabins: 2, built: 2016, refit: 2019 },
    summary: {
      en: 'Up to twenty guests on a lively day yacht. Birthdays, graduations and long afternoons toward the Princes’ Islands.',
      tr: 'Yirmi misafire kadar, hareketli bir günlük yat. Doğum günleri, mezuniyetler ve Adalar’a uzanan uzun öğleden sonralar.',
    },
    sources: ['adayacht.com listing', 'citioapp.com listing'],
  },
  {
    slug: 'denden-9',
    name: 'DenDen 9',
    specs: { length: 22, guests: 25 },
    sources: ['faroutyachting.com listing'],
  },
];

export const bySlug = (s) => fleet.find((y) => y.slug === s);
