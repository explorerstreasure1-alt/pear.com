const Config = {
  app: {
    name: 'pear',
    tagline: 'Get Help, Instantly.',
    version: '1.0.0'
  },

  payment: {
    fee: 4.99,
    currency: 'USD',
    checkoutUrl: 'https://projeai.lemonsqueezy.com/checkout/buy/d76a4195-8d56-4ec1-888b-618528a19aac'
  },

  countries: [
    { code: 'TR', name: 'Turkey', flag: '🇹🇷', lang: 'tr' },
    { code: 'US', name: 'United States', flag: '🇺🇸', lang: 'en' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', lang: 'de' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', lang: 'en' },
    { code: 'FR', name: 'France', flag: '🇫🇷', lang: 'fr' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', lang: 'es' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', lang: 'it' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', lang: 'nl' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', lang: 'nl' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', lang: 'de' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', lang: 'de' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', lang: 'ru' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', lang: 'uk' },
    { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', lang: 'az' },
    { code: 'GE', name: 'Georgia', flag: '🇬🇪', lang: 'ka' }
  ],

  categoryIcons: {
    'tesisat': '🔧',
    'elektrik': '⚡',
    'boyaci': '🎨',
    'temizlik': '🧹',
    'ofis-temizlik': '🏢',
    'hali-koltuk': '🛋️',
    'nakliyat': '📦',
    'mobilya-montaj': '🪑',
    'mobilya-tamir': '🔨',
    'cilingir': '🔐',
    'oto-tamir': '🚗',
    'it-destek': '💻',
    'teknik-servis': '📺',
    'grafik-tasarim': '🎨',
    'kuafor': '💇',
    'terzilik': '🧵',
    'baca-tamir': '🏠',
    'mutfak-montaj': '🍳',
    'bagi-tasarim': '🌳',
    'havuz-temizlik': '🏊',
    'ilaclama': '🦟',
    'kopek-egitmen': '🐕',
    'koltuk-yikama': '🛋️',
    'editor': '🎬'
  },

  ui: {
    toastDuration: 4000,
    animDuration: 300,
    debounceDelay: 300
  }
};

const Constants = {
  roles: {
    customer: 'customer',
    provider: 'provider'
  },

  jobStatus: {
    open: 'Open',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  },

  rating: {
    min: 1,
    max: 5
  }
};

window.Config = Config;
window.Constants = Constants;