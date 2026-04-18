const I18n = {
  currentLocale: 'tr',
  currentCurrency: 'TRY',
  currentCountry: 'TR',

  locales: {
    tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
    de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' }
  },

  currencies: {
    TRY: { symbol: '₺', name: 'Turkish Lira', locale: 'tr-TR' },
    USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
    EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
    GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
    AED: { symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
    RUB: { symbol: '₽', name: 'Russian Ruble', locale: 'ru-RU' },
    CNY: { symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' }
  },

  countries: {
    TR: { name: 'Turkey', code: 'TR', locale: 'tr-TR', currency: 'TRY' },
    US: { name: 'United States', code: 'US', locale: 'en-US', currency: 'USD' },
    DE: { name: 'Germany', code: 'DE', locale: 'de-DE', currency: 'EUR' },
    FR: { name: 'France', code: 'FR', locale: 'fr-FR', currency: 'EUR' },
    ES: { name: 'Spain', code: 'ES', locale: 'es-ES', currency: 'EUR' },
    GB: { name: 'United Kingdom', code: 'GB', locale: 'en-GB', currency: 'GBP' },
    AE: { name: 'UAE', code: 'AE', locale: 'ar-AE', currency: 'AED' },
    RU: { name: 'Russia', code: 'RU', locale: 'ru-RU', currency: 'RUB' },
    CN: { name: 'China', code: 'CN', locale: 'zh-CN', currency: 'CNY' }
  },

  translations: {
    tr: {
      appName: 'pear',
      hero: {
        title: 'Uzmanını Bul.',
        titleAccent: 'Anında.',
        subtitle: '4$ ilan ver, yerel uzmanlardan doğrudan ara, aracı yok. Gizli ücret yok.',
        searchPlaceholder: 'Ne yardım istiyorsunuz? (Tesisatçı, Temizlik...)',
        locationPlaceholder: 'Konumunuz (Şehir, Posta Kodu)',
        cta: 'Uzman Bul',
        badge: 'Doğrudan Bağlantı. Komisyon Yok.',
        bottomText: '✨ 4$ ilan ver, doğrudan ara, ustaya kendin öde.'
      },
      nav: {
        howItWorks: 'Nasıl Çalışır',
        services: 'Hizmetler',
        browseJobs: 'İlanları Görüntüle',
        login: 'Login',
        postTask: 'İlan Ver ($4)'
      },
      steps: {
        title: 'Nasıl Çalışır',
        titleAccent: '3 Adımda',
        step1: { title: 'İlan Ver ($4)', desc: 'Detayları ekle, adres ve telefonu gir. Tek seferlik ücret öde.' },
        step2: { title: 'Doğrudan Ara', desc: 'Bölgende doğrulanmış uzmanlar seni doğrudan arayacak.' },
        step3: { title: 'Anla & Doğrudan Öde', desc: 'Fiyatı müzakere et, işi bitir, istediğin yöntemle öde.' }
      },
      features: {
        title: 'Neden pear?',
        titleAccent: 'Doğrudan & Adil',
        direct: { title: 'Doğrudan Müzakere', desc: 'Aracı yok. Siz konuşun, müzakere edin, profesyonele kendiniz ödeyin.' },
        verified: { title: 'Doğrulanmış Kullanıcılar', desc: 'İlanlar, doğrulanmış telefon ve adresli ücretli kullanıcılar tarafından verilir.' },
        zeroCommission: { title: 'Sıfır Komisyon', desc: 'Uzmanlar kazancın %100ünü alır. Biz iş fiyatından kesinti yapmayız.' }
      },
      categories: { 
        title: 'Popüler Hizmetler Yakınınızda',
        plumbing: 'Tesisat',
        electrical: 'Elektrik',
        cleaning: 'Temizlik',
        painting: 'Boya',
        moving: 'Taşıma',
        repair: 'Onarım',
        equipment: 'Ekipman Servisi',
        design: 'Grafik Tasarım',
        software: 'Yazılım Geliştirme',
        it: 'BT Destek'
      },
      jobs: { title: 'Aktif İlanlar' },
      cta: { title: 'Müşteri mi arıyorsunuz?', desc: 'Yerel leadslere anında erişin. Görevleri ücretsiz görüntüleyin - telefon numaralarını alın, arayın, tüm parayı saklayın.', button: 'Yerel Görevleri Gözden Geçir (Ücretsiz)' },
      footer: {
        tagline: 'Doğrudan bağlantı platformu',
        explore: { postTask: 'İlan Ver', browseJobs: 'İlanları Görüntüle', help: 'Yardım Merkezi' },
        legal: { terms: 'Şartlar', privacy: 'Gizlilik' },
        disclaimer: '⚠️ Yasal Uyarı: pear doğrudan bağlantı platformudur. Kullanıcılar ve profesyoneller arasındaki herhangi bir ödeme, anlaşma veya iş kalitesi anlaşmazlığına dahil değiliz. Tüm etkileşimler kullanıcıların kendi sorumluluğundadır. 4$ ücreti yalnızca liste aktivasyonunu kapsar.',
        copyright: '© 2025 pear — Anında Yardım Al.'
      },
      form: {
        category: 'Hizmet Kategorisi *',
        categoryPlaceholder: 'Kategori seçin',
        title: 'Başlık',
        titlePlaceholder: 'Ör: Musluk sızıntısı onar',
        description: 'Açıklama',
        descriptionPlaceholder: 'Ne ihtiyacınız olduğunu açıklayın...',
        address: 'Tam Adres (ustanın referansı için)',
        addressPlaceholder: 'Sokak, şehir, posta kodu',
        phone: 'Telefon Numarası',
        phonePlaceholder: '+90 5XX XXX XX XX',
        submit: 'Ödemeye Devam ($4)',
        cancel: 'İptal',
        postTitle: 'İlan Ver ($4)',
        paymentNote: 'İlanınız ödeme sonrası anında görünür olacak.'
      },
      payment: {
        title: 'Ödemeyi Tamamla',
        subtitle: 'Test modu • Demo kart',
        cardNumber: '4242 4242 4242 4242',
        cardHint: 'Herhangi bir gelecek tarih / 123',
        confirm: 'Öde ve Yayınla',
        cancel: 'İptal',
        amount: '$4 sabit ücret'
      },
      auth: {
        title: 'Hesabınıza giriş yapın',
        namePlaceholder: 'Tam isim / İşletme adı',
        emailPlaceholder: 'E-posta',
        roleCustomer: 'Müşteri (Yardım istiyorum)',
        roleProvider: 'Profesyonel / Hizmet sağlayıcı',
        submit: 'Devam',
        terms: 'Giriş yaparak Şartları kabul ediyorum.'
      },
      detail: {
        contactLabel: 'İletişim detayları (sadece Ustalar için görünür)',
        disclaimer: '*pear ödemelere veya anlaşmalara dahil değildir.'
      },
      common: {
        activeTasks: 'aktif görev',
        postTask: 'İlan ver →',
        loading: 'Yükleniyor...',
        error: 'Hata oluştu',
        success: 'Başarılı!',
        noResults: 'Sonuç bulunamadı'
      }
    },
    en: {
      appName: 'pear',
      hero: {
        title: 'Find Your Pro.',
        titleAccent: 'Instantly.',
        subtitle: 'Post your job for $4, get direct calls from local pros, no middleman. No hidden fees.',
        searchPlaceholder: 'What do you need help with? (Plumber, Cleaner...)',
        locationPlaceholder: 'Your Location (City, ZIP)',
        cta: 'Find Pros',
        badge: 'Direct Connections. Zero Commission.'
      },
      nav: {
        howItWorks: 'How It Works',
        services: 'Services',
        browseJobs: 'Browse Jobs',
        login: 'Log In',
        postTask: 'Post a Task ($4)'
      },
      steps: {
        title: 'How It Works',
        titleAccent: 'in 3 Steps',
        step1: { title: 'Post Your Need ($4)', desc: 'Fill in details, add address & phone. Pay a one-time fee to publish.' },
        step2: { title: 'Get Direct Calls', desc: 'Verified pros in your area will call your phone directly.' },
        step3: { title: 'Deal & Pay Directly', desc: 'Negotiate price, finish the job, pay them using any method.' }
      },
      features: {
        title: 'Why pear?',
        titleAccent: 'Direct & Fair',
        direct: { title: 'Direct Negotiations', desc: 'No middlemen. You speak, negotiate, and pay the professional yourself.' },
        verified: { title: 'Verified Users', desc: 'Jobs are posted by paying users with verified phone numbers & addresses.' },
        zeroCommission: { title: 'Zero Commission', desc: 'Pros keep 100% of earnings. We never take a cut from the job price.' }
      },
      categories: { 
        title: 'Popular Services Near You',
        plumbing: 'Plumbing',
        electrical: 'Electrical',
        cleaning: 'Cleaning',
        painting: 'Painting',
        moving: 'Moving',
        repair: 'Repair',
        equipment: 'Equipment Service',
        design: 'Graphic Design',
        software: 'Software Development',
        it: 'IT Support'
      },
      jobs: { title: 'Active Tasks' },
      cta: { title: 'Looking for clients?', desc: 'Access local leads instantly. Pay nothing to browse tasks — get phone numbers, make calls, keep all the money.', button: 'Browse Local Tasks (Free)' },
      footer: {
        tagline: 'Direct connection platform',
        explore: { postTask: 'Post a Task', browseJobs: 'Browse Jobs', help: 'Help Center' },
        legal: { terms: 'Terms', privacy: 'Privacy' },
        disclaimer: '⚠️ Legal Disclaimer: pear is a direct connection platform. We are not involved in any payments, agreements, or job quality disputes between users and professionals. All interactions are at the users own risk. The $4 fee covers only the listing activation.',
        copyright: '© 2025 pear — Get Help, Instantly.'
      },
      form: {
        category: 'Service Category *',
        categoryPlaceholder: 'Select category',
        title: 'Title',
        titlePlaceholder: 'e.g., Fix leaking faucet',
        description: 'Description',
        descriptionPlaceholder: 'Describe what you need...',
        address: 'Full Address (for pro\'s reference)',
        addressPlaceholder: 'Street, city, ZIP',
        phone: 'Phone Number',
        phonePlaceholder: '+1 555 123 4567',
        submit: 'Continue to Payment ($4)',
        cancel: 'Cancel'
      },
      payment: {
        title: 'Complete Payment',
        subtitle: 'Test mode • Demo card',
        cardNumber: '4242 4242 4242 4242',
        cardHint: 'Any future date / 123',
        confirm: 'Pay & Publish',
        cancel: 'Cancel',
        amount: '$4 fixed fee'
      },
      auth: {
        title: 'Access your account',
        namePlaceholder: 'Full name / Business name',
        emailPlaceholder: 'Email',
        roleCustomer: 'Customer (I need help)',
        roleProvider: 'Professional / Service provider',
        submit: 'Continue',
        terms: 'By signing in, you agree to our Terms.'
      },
      detail: {
        contactLabel: 'Contact details (visible only for Pros)',
        disclaimer: '*pear is not involved in payments or agreements.'
      },
      common: {
        activeTasks: 'active tasks',
        postTask: 'Post a task →',
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success!',
        noResults: 'No results found'
      }
    }
  },

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLocale];
    for (const k of keys) {
      if (value && value[k]) value = value[k];
      else return key;
    }
    return value || key;
  },

  setLocale(locale) {
    if (this.locales[locale]) {
      this.currentLocale = locale;
      document.documentElement.dir = this.locales[locale].dir;
      document.documentElement.lang = locale;
      this.updateCountryFromLocale(locale);
    }
  },

  setCurrency(currency) {
    if (this.currencies[currency]) {
      this.currentCurrency = currency;
    }
  },

  setCountry(country) {
    if (this.countries[country]) {
      this.currentCountry = country;
      const c = this.countries[country];
      this.setLocale(c.code.toLowerCase());
      this.setCurrency(c.currency);
    }
  },

  updateCountryFromLocale(locale) {
    const countryCode = locale.toUpperCase();
    if (this.countries[countryCode]) {
      this.currentCountry = countryCode;
    }
  },

  formatCurrency(amount) {
    const curr = this.currencies[this.currentCurrency];
    return new Intl.NumberFormat(curr.locale, { 
      style: 'currency', 
      currency: this.currentCurrency 
    }).format(amount);
  },

  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });

    const langDisplay = document.getElementById('current-lang');
    if (langDisplay) {
      langDisplay.textContent = this.locales[this.currentLocale]?.flag || this.currentLocale.toUpperCase();
    }
  },

  getAvailableLocales() {
    return Object.entries(this.locales).map(([code, data]) => ({ code, ...data }));
  },

  getAvailableCurrencies() {
    return Object.entries(this.currencies).map(([code, data]) => ({ code, ...data }));
  },

  getAvailableCountries() {
    return Object.entries(this.countries).map(([code, data]) => ({ code, ...data }));
  },

  init() {
    const savedLocale = DataStore.get('locale');
    const savedCountry = DataStore.get('country');
    const savedCurrency = DataStore.get('currency');

    if (savedCountry && this.countries[savedCountry]) {
      this.setCountry(savedCountry);
    } else if (savedLocale && this.locales[savedLocale]) {
      this.setLocale(savedLocale);
    }

    if (savedCurrency && this.currencies[savedCurrency]) {
      this.setCurrency(savedCurrency);
    }

    this.updateUI();
  },

  saveSettings() {
    DataStore.set('locale', this.currentLocale);
    DataStore.set('country', this.currentCountry);
    DataStore.set('currency', this.currentCurrency);
  },

  changeLocale(locale) {
    this.setLocale(locale);
    this.saveSettings();
    this.updateUI();
  }
};

window.I18n = I18n;