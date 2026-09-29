// Single source for brand contact details. Confirm these with Denden before launch.
export const contact = {
  company: 'DenDen Denizcilik A.Ş.',
  whatsapp: '905494471047', // international format, digits only (wa.me)
  phoneDisplay: '+90 549 447 10 47',
  phoneHref: 'tel:+905494471047',
  instagram: 'https://www.instagram.com/dendenluxuryyachts/',
  instagramHandle: '@dendenluxuryyachts',
  address: ['Cihannüma Mah., Barbaros Blv. No:67', 'Gökman Apt., Beşiktaş', 'İstanbul, Türkiye'],
  founded: 2005,
};

export const wa = (text = '') =>
  `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const paths = {
  en: { home: '/', yacht: (s) => `/yachts/${s}/`, charter: '/private-charter/' },
  tr: { home: '/tr/', yacht: (s) => `/tr/yachts/${s}/`, charter: '/tr/private-charter/' },
};

export const ui = {
  en: {
    nav: { yachts: 'Yachts', experiences: 'Experiences', concierge: 'Concierge', bosphorus: 'Bosphorus', about: 'About', contact: 'Contact' },
    cta: 'Private Charter',
    menu: 'Menu',
    close: 'Close',
    whatsapp: 'WhatsApp',
    footer: {
      visit: 'Office',
      reach: 'Direct',
      follow: 'Follow',
      rights: 'All rights reserved.',
      note: 'Private yacht charters on the Bosphorus since 2005.',
    },
  },
  tr: {
    nav: { yachts: 'Yatlar', experiences: 'Deneyimler', concierge: 'Concierge', bosphorus: 'Boğaz', about: 'Hakkımızda', contact: 'İletişim' },
    cta: 'Özel Kiralama',
    menu: 'Menü',
    close: 'Kapat',
    whatsapp: 'WhatsApp',
    footer: {
      visit: 'Ofis',
      reach: 'Doğrudan',
      follow: 'Takip',
      rights: 'Tüm hakları saklıdır.',
      note: '2005’ten bu yana Boğaz’da özel yat kiralama.',
    },
  },
};
