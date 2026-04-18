// App State
const state = {
  jobs: [],
  user: null,
  pendingJob: null,
  filterCategory: null,
  filterCountry: null,
  searchQuery: null,
  lang: 'tr',
  reviews: {},
  providers: {}
};

// Sample Providers with Ratings
const sampleProviders = [
  { id: 'p1', name: 'Ahmet the Plumber', phone: '+90 532 123 4567', category: 'plumbing', country: 'TR', rating: 4.8, reviewCount: 12 },
  { id: 'p2', name: 'Mike Electrician', phone: '+90 532 234 5678', category: 'electrical', country: 'TR', rating: 4.5, reviewCount: 8 },
  { id: 'p3', name: 'Sarah Cleaning Pro', phone: '+49 171 234 5678', category: 'cleaning', country: 'DE', rating: 5.0, reviewCount: 15 },
  { id: 'p4', name: 'John the Painter', phone: '+1 555 123 4567', category: 'painting', country: 'US', rating: 4.2, reviewCount: 6 }
];

// Translations
const translations = {
  tr: {
    nav: { login: 'Login', postTask: 'İlan Ver ($4)' },
    hero: { badge: 'Doğrudan Bağlantı. Komisyon Yok.', title: 'Uzmanını Bul.', titleAccent: 'Anında.', subtitle: '4$ ilan ver, yerel uzmanlardan doğrudan ara, aracı yok.', search: 'Ne yardım istiyorsunuz?', location: 'Konumunuz', cta: 'Uzman Bul', note: '✨ 4$ ilan ver, doğrudan ara, ustaya kendin öde' },
    steps: { title: 'Nasıl Çalışır', titleAccent: '3 Adımda', s1: { title: 'İlan Ver ($4)', desc: 'Detayları ekle, adres ve telefonu gir.' }, s2: { title: 'Doğrudan Ara', desc: 'Bölgende doğrulanmış uzmanlar seni arayacak.' }, s3: { title: 'Anla & Doğrudan Öde', desc: 'Fiyatı müzakere et, işi bitir, istediğin yöntemle öde.' } },
    features: { title: 'Neden pear?', titleAccent: 'Doğrudan & Adil', f1: { title: 'Doğrudan Müzakere', desc: 'Aracı yok. Siz konuşun, müzakere edin, profesyonele kendiniz ödeyin.' }, f2: { title: 'Doğrulanmış Kullanıcılar', desc: 'İlanlar, doğrulanmış telefon ve adresli ücretli kullanıcılar tarafından verilir.' }, f3: { title: 'Sıfır Komisyon', desc: 'Uzmanlar kazancın %100ünü alır. Biz iş fiyatından kesinti yapmayız.' } },
    services: { title: 'Popüler Hizmetler' },
    jobs: { title: 'Aktif İlanlar', empty: 'İlan bulunamadı', active: 'aktif' },
    cta: { title: 'Müşteri mi arıyorsunuz?', desc: 'Yerel leadslere anında erişin. Telefon numaralarını alın, arayın, tüm parayı saklayın.', button: 'Yerel Görevleri Gözden Geçir (Ücretsiz)' },
    form: { postTitle: 'İlan Ver ($4)', category: 'Kategori *', categoryPlaceholder: 'Kategori seçin', title: 'Başlık', titlePlaceholder: 'Ör: Musluk sızıntısı', desc: 'Açıklama', descPlaceholder: 'Ne ihtiyacınız olduğunu açıklayın...', address: 'Tam Adres', addressPlaceholder: 'Sokak, şehir, posta kodu', phone: 'Telefon', phonePlaceholder: '+90 5XX XXX XX XX', submit: 'Devam ($4)', cancel: 'İptal', fee: '$4 sabit ücret - İlanınız ödeme sonrası görünür olacak.' },
    auth: { title: 'Hesabınıza giriş yapın', namePlaceholder: 'Tam isim', emailPlaceholder: 'E-posta', roleCustomer: 'Müşteri (Yardım istiyorum)', roleProvider: 'Profesyonel', submit: 'Devam' },
    detail: { contactLabel: 'İletişim (sadece Ustalar için)', contactLocked: '🔒 Bu bilgiyi görmek için usta olarak giriş yapmalısınız' },
    reviews: { title: 'Değerlendirmeler', submit: 'Değerlendir', noReviews: 'Henüz değerlendirme yok' },
    common: { postTask: 'İlan ver →', close: '×' }
  },
  en: {
    nav: { login: 'Log In', postTask: 'Post a Task ($4)' },
    hero: { badge: 'Direct Connections. Zero Commission.', title: 'Find Your Pro.', titleAccent: 'Instantly.', subtitle: 'Post your job for $4, get direct calls from local pros, and pay them yourself.', search: 'What do you need help with?', location: 'Your Location', cta: 'Find Pros', note: '✨ Post your job for $4, get direct calls, pay the usta yourself.' },
    steps: { title: 'How It Works', titleAccent: 'in 3 Steps', s1: { title: 'Post Your Need ($4)', desc: 'Fill in details, add address & phone.' }, s2: { title: 'Get Direct Calls', desc: 'Verified pros in your area will call your phone directly.' }, s3: { title: 'Deal & Pay Directly', desc: 'Negotiate price, finish the job, pay them using any method.' } },
    features: { title: 'Why pear?', titleAccent: 'Direct & Fair', f1: { title: 'Direct Negotiations', desc: 'No middlemen. You speak, negotiate, and pay the professional yourself.' }, f2: { title: 'Verified Users', desc: 'Jobs are posted by paying users with verified phone numbers & addresses.' }, f3: { title: 'Zero Commission', desc: 'Pros keep 100% of earnings. We never take a cut from the job price.' } },
    services: { title: 'Popular Services' },
    jobs: { title: 'Active Tasks', empty: 'No jobs found', active: 'active' },
    cta: { title: 'Looking for clients?', desc: 'Access local leads instantly. Get phone numbers, make calls, keep all the money.', button: 'Browse Local Tasks (Free)' },
    form: { postTitle: 'Post a Task ($4)', category: 'Category *', categoryPlaceholder: 'Select category', title: 'Title', titlePlaceholder: 'e.g., Fix leaking faucet', desc: 'Description', descPlaceholder: 'Describe what you need...', address: 'Full Address', addressPlaceholder: 'Street, city, ZIP', phone: 'Phone', phonePlaceholder: '+1 555 123 4567', submit: 'Continue ($4)', cancel: 'Cancel', fee: '$4 fixed fee - Your task will be visible after payment.' },
    auth: { title: 'Access your account', namePlaceholder: 'Full name', emailPlaceholder: 'Email', roleCustomer: 'Customer (I need help)', roleProvider: 'Professional', submit: 'Continue' },
    detail: { contactLabel: 'Contact (visible only for Pros)', contactLocked: '🔒 Login as a Pro to see contact details' },
    reviews: { title: 'Reviews', submit: 'Rate', noReviews: 'No reviews yet' },
    common: { postTask: 'Post a task →', close: '×' }
  }
};

const t = (key) => {
  const keys = key.split('.');
  let val = translations[state.lang];
  for (const k of keys) val = val?.[k];
  return val || key;
};

// Categories - English
const categories = [
  { id: 'plumbing', name: 'Plumbing', desc: 'Pipe repair, faucet fix, water heater service', img: 'images/tesisat.jpg' },
  { id: 'electrical', name: 'Electrical', desc: 'Electrical wiring, socket repair, lighting install', img: 'images/elektirik.jpg' },
  { id: 'painting', name: 'Painting', desc: 'Interior/exterior painting, wall priming', img: 'images/boyacı.jpg' },
  { id: 'cleaning', name: 'Deep Cleaning', desc: 'Full house cleaning, move-in/out cleaning', img: 'images/Derin Ev Temizliği.jpg' },
  { id: 'office-cleaning', name: 'Office Cleaning', desc: 'Office cleaning, disinfection, window cleaning', img: 'images/Ofis Temizliği.jpg' },
  { id: 'carpet-cleaning', name: 'Carpet & Upholstery', desc: 'Carpet cleaning, sofa cleaning, curtain cleaning', img: 'images/Temizlik halı koltuk.jpg' },
  { id: 'moving', name: 'Moving', desc: 'Home moving, furniture transport, packing services', img: 'images/nakliyat.jpg' },
  { id: 'furniture-assembly', name: 'Furniture Assembly', desc: 'IKEA furniture assembly, cabinet installation', img: 'images/mobilya montajı.jpg' },
  { id: 'furniture-repair', name: 'Furniture Repair', desc: 'Furniture repair, door/window repair, restoration', img: 'images/mobilya tamir.jpg' },
  { id: 'locksmith', name: 'Locksmith', desc: 'Lock change, lockout service, security systems', img: 'images/çilingir.jpg' },
  { id: 'auto-repair', name: 'Auto Repair', desc: 'Car repair, oil change, tire replacement', img: 'images/oto tamirc.jpg' },
  { id: 'it-support', name: 'IT Support', desc: 'Computer repair, virus removal, internet setup', img: 'images/Yerinde IT Desteği.jpg' },
  { id: 'appliance', name: 'Appliance Repair', desc: 'White goods repair, AC service, TV repair', img: 'images/teknik servis.jpg' },
  { id: 'graphic-design', name: 'Graphic Design', desc: 'Logo design, business cards, social media', img: 'images/grafik tasarımcı.jpg' },
  { id: 'hairdressing', name: 'Hairdresser', desc: 'Haircut, coloring, styling, barber services', img: 'images/Profesyonel Kuaför.jpg' },
  { id: 'tailoring', name: 'Tailoring', desc: 'Clothing repair, alterations, custom sewing', img: 'images/Terzilik.jpg' },
  { id: 'roofing', name: 'Roofing', desc: 'Roof repair, gutter cleaning, waterproofing', img: 'images/Çatı ve Oluk Onarımı.jpg' },
  { id: 'kitchen-install', name: 'Kitchen Install', desc: 'Kitchen cabinet install, bathroom fixtures', img: 'images/MutfakBanyo Montajı.jpg' },
  { id: 'gardening', name: 'Gardening', desc: 'Garden design, lawn installation, landscaping', img: 'images/Bahçe Tasarımı.jpg' },
  { id: 'pool-cleaning', name: 'Pool Cleaning', desc: 'Pool cleaning, maintenance, filter cleaning', img: 'images/Havuz Temizliği.jpg' },
  { id: 'pest-control', name: 'Pest Control', desc: 'Pest control, fumigation, disinfection', img: 'images/ilaçlama.jpg' },
  { id: 'dog-training', name: 'Dog Training', desc: 'Dog training, behavior correction, walking training', img: 'images/köpek eğitmeni.jpg' },
  { id: 'upholstery', name: 'Upholstery Cleaning', desc: 'Sofa cleaning, upholstery deep cleaning', img: 'images/koltuk yıkama.jpg' },
  { id: 'video-editing', name: 'Video Editing', desc: 'Video editing, photo retouching, content editing', img: 'images/editör.jpg' }
];

// Banner Image
const bannerImg = 'images/banner.jpg';

// Sample Jobs
const sampleJobs = [
  { id: '1', title: 'Kitchen faucet leaking', description: 'Need plumber ASAP', category: 'plumbing', address: 'Istanbul, Kadikoy', phone: '+90 532 123 4567', country: 'TR', status: 'Open', createdAt: new Date().toISOString() },
  { id: '2', title: 'Living room painting', description: '40m2, white color', category: 'painting', address: 'Berlin, Mitte', phone: '+49 171 234 5678', country: 'DE', status: 'Open', createdAt: new Date().toISOString() },
  { id: '3', title: 'Logo design needed', description: 'Modern logo for tech startup', category: 'graphic-design', address: 'Remote', phone: '+1 555 123 4567', country: 'US', status: 'Open', createdAt: new Date().toISOString() },
  { id: '4', title: 'Website down', description: 'WordPress site not loading', category: 'it-support', address: 'London', phone: '+44 7700 900123', country: 'GB', status: 'Open', createdAt: new Date().toISOString() },
  { id: '5', title: 'Computer slow', description: 'Windows optimization needed', category: 'it-support', address: 'Izmir, Bornova', phone: '+90 532 567 8901', country: 'TR', status: 'Open', createdAt: new Date().toISOString() },
  { id: '6', title: 'Move furniture', description: '2 bedroom apartment move', category: 'moving', address: 'Paris, 15e', phone: '+33 6 12 34 56 78', country: 'FR', status: 'Open', createdAt: new Date().toISOString() }
];

// DOM Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Init
function init() {
  // Check for payment redirect result
  handlePaymentRedirect();
  
  state.jobs = sampleJobs;
  loadUser();
  loadReviews();
  renderAll();
  bindEvents();
  lucide.createIcons();
  Router.init();
}

// Handle Lemon Squeezy payment redirect
function handlePaymentRedirect() {
  const params = new URLSearchParams(window.location.search);
  const paymentStatus = params.get('payment');
  const pendingJobData = localStorage.getItem('pear_pending_job');
  
  if (paymentStatus === 'success' && pendingJobData) {
    try {
      const pendingJob = JSON.parse(pendingJobData);
      
      // Check if we have all required data
      if (!pendingJob.address || !pendingJob.phone) {
        showNotification('Please complete your job details', 'info');
        openModal('post-modal');
        $('#form-country').value = pendingJob.country || '';
        $('#form-category').value = pendingJob.category || '';
        $('#form-title').value = pendingJob.title || '';
        $('#form-desc').value = pendingJob.description || '';
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      // Create and publish job directly
      const job = { 
        ...pendingJob, 
        id: 'job_' + Date.now(), 
        status: 'Open', 
        createdAt: new Date().toISOString(),
        paid: true,
        paymentAmount: 4.99
      };
      
      state.jobs.unshift(job);
      if (window.JobsAPI) {
        JobsAPI.add(job);
      }
      localStorage.removeItem('pear_pending_job');
      
      // Clear URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Show success
      showNotification('🎉 Job posted! Thanks for your payment.', 'success');
      renderAll();
      document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
      
      console.log('Job published:', job.title);
    } catch (e) {
      console.error('Error:', e);
      showNotification('Error publishing job', 'error');
    }
  } else if (paymentStatus === 'cancelled') {
    localStorage.removeItem('pear_pending_job');
    window.history.replaceState({}, document.title, window.location.pathname);
    showNotification('Payment cancelled', 'info');
  }
}

function loadUser() {
  const saved = localStorage.getItem('pear_user');
  if (saved) state.user = JSON.parse(saved);
  updateUserUI();
}

function saveUser(user) {
  state.user = user;
  localStorage.setItem('pear_user', JSON.stringify(user));
}

function renderAll() {
  renderCategories();
  renderJobs();
  renderProviders();
  renderCountryFilter();
  populateCategoryFilter();
  updateUserUI();
}

function populateCategoryFilter() {
  const catFilter = document.getElementById('jobs-category-filter');
  if (!catFilter) return;
  
  // Only populate once
  if (catFilter.options.length > 1) return;
  
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    catFilter.appendChild(opt);
  });
}

function renderCountryFilter() {
  const container = $('#country-filter');
  if (!container) return;
  
  const countries = [...new Set(sampleProviders.map(p => p.country))];
  container.innerHTML = `
    <select onchange="filterByCountry(this.value)" style="padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border);">
      <option value="">All Countries</option>
      ${countries.map(c => `<option value="${c}" ${state.filterCountry === c ? 'selected' : ''}>${countryFlags[c]} ${c}</option>`).join('')}
    </select>
  `;
}

function filterByCountry(country) {
  state.filterCountry = country;
  renderProviders();
}

function renderProviders() {
  const container = $('#providers-container');
  if (!container) return;
  
  let providers = sampleProviders;
  
  if (state.filterCountry) {
    providers = providers.filter(p => p.country === state.filterCountry);
  }
  
  if (providers.length === 0) {
    container.innerHTML = `<div class="empty-state">No professionals found</div>`;
    return;
  }
  
  container.innerHTML = providers.map(provider => {
    const cat = categories.find(c => c.id === provider.category);
    return `
      <div class="provider-card" onclick="showProviderDetail('${provider.id}')">
        <div class="provider-header">
          <div>
            <div class="provider-name">${provider.name}</div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">${cat?.name || provider.category}</div>
          </div>
          <div class="provider-rating">
            ★ ${provider.rating} <span class="provider-rating-count">(${provider.reviewCount})</span>
          </div>
        </div>
        <div style="margin-top: 8px; font-size: 0.9rem; color: var(--text-gray);">
          📞 ${provider.phone}
        </div>
        ${state.user?.role === 'customer' ? `
          <button class="btn btn-sm btn-primary" style="margin-top: 12px;" onclick="event.stopPropagation(); openReviewModal('${provider.id}', '${provider.name}')">
            Rate this Pro
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

function showProviderDetail(providerId) {
  const provider = sampleProviders.find(p => p.id === providerId);
  if (!provider) return;
  
  const cat = categories.find(c => c.id === provider.category);
  const reviews = getProviderReviews(providerId);
  
  $('#detail-title').textContent = provider.name;
  $('#detail-category').textContent = cat?.name || provider.category;
  $('#detail-content').innerHTML = `
    <div class="reviews-summary">
      <div class="reviews-average">★ ${provider.rating}</div>
      <div>
        <div style="font-weight: 600;">${provider.reviewCount} reviews</div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">${provider.phone}</div>
      </div>
    </div>
  `;
  
  const reviewsHtml = reviews.length > 0 
    ? reviews.map(r => `
        <div class="review-item">
          <div class="review-header">
            <span class="review-author">${r.author}</span>
            <span class="review-date">${formatDate(r.createdAt)}</span>
          </div>
          <div class="review-stars">${'★'.repeat(r.rating)}</div>
          ${r.comment ? `<p class="review-comment">${r.comment}</p>` : ''}
        </div>
      `).join('')
    : '<p style="color: var(--text-muted);">No reviews yet</p>';
  
  $('#offers-section').innerHTML = `
    <div class="reviews-section">
      <h4>Reviews (${reviews.length})</h4>
      ${reviewsHtml}
    </div>
  `;
  
  $('#contact-sensitive').innerHTML = `
    <div style="padding: 12px; background: var(--primary-light); border-radius: 8px;">
      <p style="font-size:1.1rem;font-weight:700;color:var(--primary);margin-bottom:4px;">📱 Contact</p>
      <p style="font-size:1.25rem;font-weight:600;color:var(--text-dark);">${provider.phone}</p>
    </div>
  `;
  
  openModal('detail-modal');
}

function renderCategories() {
  const container = $('#categories-container');
  if (!container) return;

  container.innerHTML = categories.map(cat => {
    const count = state.jobs.filter(j => j.category === cat.id && j.status === 'Open').length;
    return `
      <div class="service-card" onclick="toCategory('${cat.id}')">
        <div class="service-img">
          <img src="${cat.img}" alt="${cat.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="service-info">
          <h3 class="service-name">${cat.name}</h3>
          <p class="service-desc">${cat.desc}</p>
          <p class="service-count">⭐ ${count} active</p>
        </div>
      </div>
    `;
  }).join('');
}

const countryFlags = { TR: '🇹🇷', US: '🇺🇸', DE: '🇩🇪', GB: '🇬🇧', FR: '🇫🇷', ES: '🇪🇸', IT: '🇮🇹', NL: '🇳🇱', BE: '🇧🇪', AT: '🇦🇹', CH: '🇨🇭', RU: '🇷🇺', UA: '🇺🇦', AZ: '🇦🇿', GE: '🇬🇪' };

function renderJobs() {
  const container = $('#jobs-container');
  if (!container) return;

  let jobs = state.jobs.filter(j => j.status === 'Open');
  
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    jobs = jobs.filter(j => 
      j.title.toLowerCase().includes(q) || 
      j.category.toLowerCase().includes(q) ||
      j.description?.toLowerCase().includes(q)
    );
  }
  
  if (state.filterCategory) {
    jobs = jobs.filter(j => j.category === state.filterCategory);
  }

  if (state.filterCountry) {
    jobs = jobs.filter(j => j.country === state.filterCountry);
  }

  if (jobs.length === 0) {
    container.innerHTML = `<div class="empty-state">${t('jobs.empty')}</div>`;
    return;
  }

  container.innerHTML = jobs.map(job => {
    const cat = categories.find(c => c.id === job.category);
    const offerCount = job.offers ? job.offers.length : 0;
    const countryFlag = countryFlags[job.country] || '🌍';
    return `
      <div class="job-card" onclick="showJobDetail('${job.id}')">
        <div class="job-header">
          <span class="job-category">${cat?.emoji || ''} ${cat?.name || job.category}</span>
          <span class="job-country">${countryFlag}</span>
          <span class="job-date">${formatDate(job.createdAt)}</span>
        </div>
        <h3 class="job-title">${job.title}</h3>
        <p class="job-desc">${job.description || ''}</p>
        <div class="job-meta">
          <span>📍 ${job.address}</span>
          ${offerCount > 0 ? `<span class="offer-badge">${offerCount} teklif</span>` : ''}
        </div>
        ${state.user?.role === 'provider' ? `
          <div class="job-actions">
            <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); showOfferForm('${job.id}')">Send Quote</button>
            <button class="btn btn-sm" onclick="event.stopPropagation(); completeJob('${job.id}')">✓</button>
            <button class="btn btn-sm" onclick="event.stopPropagation(); deleteJob('${job.id}')">🗑️</button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function updateUserUI() {
  const loginBtn = $('#login-btn');
  const postBtn = $('#post-btn');
  const roleBadge = $('#role-badge');
  const langText = $('#lang-text');

  if (langText) langText.textContent = state.lang.toUpperCase();

  if (state.user) {
    if (loginBtn) loginBtn.textContent = state.user.name?.split(' ')[0] || 'Profile';
    if (roleBadge && state.user.role === 'provider') roleBadge.classList.remove('hidden');
  } else {
    if (loginBtn) loginBtn.textContent = t('nav.login');
    if (roleBadge) roleBadge.classList.add('hidden');
  }
}

function bindEvents() {
  $('#post-btn')?.addEventListener('click', () => openModal('post-modal'));
  $('#login-btn')?.addEventListener('click', () => state.user ? logout() : openModal('auth-modal'));
  $('#search-btn')?.addEventListener('click', handleSearch);
  $('#cta-btn')?.addEventListener('click', () => $('#jobs')?.scrollIntoView({ behavior: 'smooth' }));
  $('#lang-btn')?.addEventListener('click', openLangModal);
  
  $('#close-post')?.addEventListener('click', () => closeModal('post-modal'));
  $('#close-auth')?.addEventListener('click', () => closeModal('auth-modal'));
  $('#close-detail')?.addEventListener('click', () => closeModal('detail-modal'));
  $('#close-lang')?.addEventListener('click', () => closeModal('lang-modal'));
  $('#close-review')?.addEventListener('click', () => closeModal('review-modal'));
  
  $('#cancel-post')?.addEventListener('click', () => closeModal('post-modal'));
  $('#cancel-review')?.addEventListener('click', () => closeModal('review-modal'));
  $('#auth-form')?.addEventListener('submit', handleAuth);
  $('#post-form')?.addEventListener('submit', handlePostSubmit);
  $('#review-form')?.addEventListener('submit', handleReviewSubmit);
  
  // Star rating click handlers
  document.querySelectorAll('.star-rating .star').forEach(star => {
    star.addEventListener('click', function() {
      const value = parseInt(this.dataset.value);
      $('#review-rating').value = value;
      updateStarDisplay(value);
    });
  });
  
  $('#mobile-toggle')?.addEventListener('click', toggleMobile);
}

function openModal(id) {
  const modal = $(`#${id}`);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
  const modal = $(`#${id}`);
  if (modal) modal.classList.add('hidden');
}

function handleAuth(e) {
  e.preventDefault();
  const name = $('#auth-name')?.value?.trim();
  const email = $('#auth-email')?.value?.trim();
  const role = $('#auth-role')?.value || 'customer';

  if (!name || !email) return alert('Please fill in all fields');

  saveUser({ name, email, role });
  closeModal('auth-modal');
  renderAll();
}

function logout() {
  state.user = null;
  localStorage.removeItem('pear_user');
  renderAll();
}

function handlePostSubmit(e) {
  e.preventDefault();
  
  // Tüm zorunlu alanları kontrol et
  const country = $('#form-country')?.value;
  const category = $('#form-category')?.value;
  const title = $('#form-title')?.value?.trim();
  const address = $('#form-address')?.value?.trim();
  const phone = $('#form-phone')?.value?.trim();
  
  if (!country || !category || !title) return alert('Please fill in: Country, Category, Title');
  if (!address || !phone) {
    showNotification('Please fill Address and Phone to continue', 'error');
    $('#form-address').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  
  // Form verilerini kaydet
  state.pendingJob = {
    country,
    category,
    title,
    description: $('#form-desc')?.value?.trim(),
    address,
    phone,
    email: $('#form-email')?.value?.trim()
  };
  localStorage.setItem('pear_pending_job', JSON.stringify(state.pendingJob));
  
  // Formu temizle
  $('#post-form').reset();
  closeModal('post-modal');
  
  // Lemon Squeezy ödemeye yönlendir
  const checkoutUrl = new URL('https://projeai.lemonsqueezy.com/checkout/buy/d76a4195-8d56-4ec1-888b-618528a19aac');
  checkoutUrl.searchParams.set('checkout[custom][job_title]', title);
  checkoutUrl.searchParams.set('checkout[custom][category]', category);
  checkoutUrl.searchParams.set('checkout[custom][country]', country);
  checkoutUrl.searchParams.set('checkout[success_url]', window.location.origin + window.location.pathname + '?payment=success');
  checkoutUrl.searchParams.set('checkout[cancel_url]', window.location.origin + window.location.pathname + '?payment=cancelled');
  
  // Ödemeye git
  window.location.href = checkoutUrl.toString();
}

function filterByCategory(catId) {
  state.filterCategory = state.filterCategory === catId ? null : catId;
  document.getElementById('jobs-category-filter').value = state.filterCategory || '';
  renderJobs();
  $('#jobs')?.scrollIntoView({ behavior: 'smooth' });
}

function filterJobsByCountry(country) {
  state.filterCountry = country;
  renderJobs();
}

function filterJobsByCategory(catId) {
  state.filterCategory = catId || null;
  renderJobs();
}

function handleSearch() {
  const query = $('#search-input')?.value?.trim();
  const country = $('#country-filter-search')?.value;
  if (query) {
    state.searchQuery = query;
    state.filterCountry = country;
  }
  if (country) {
    state.filterCountry = country;
  }
  renderJobs();
  $('#jobs')?.scrollIntoView({ behavior: 'smooth' });
}

function showJobDetail(jobId) {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  const cat = categories.find(c => c.id === job.category);
  const countryFlag = countryFlags[job.country] || '🌍';
  $('#detail-title').textContent = job.title;
  $('#detail-category').textContent = `${cat?.emoji || ''} ${cat?.name || job.category} ${countryFlag}`;
  $('#detail-content').innerHTML = `
    <p>${job.description || ''}</p>
    <p style="margin-top:8px">📍 ${job.address}</p>
    ${job.email ? `<p style="margin-top:4px">📧 ${job.email}</p>` : ''}
  `;

  // Show phone to all providers (not just logged in ones)
  const isProvider = state.user?.role === 'provider' || (!state.user);
  $('#contact-sensitive').innerHTML = isProvider 
    ? `<div style="padding: 12px; background: var(--primary-light); border-radius: 8px;">
        <p style="font-size:1.1rem;font-weight:700;color:var(--primary);margin-bottom:4px;">📱 Customer Contact</p>
        <p style="font-size:1.25rem;font-weight:600;color:var(--text-dark);">${job.phone}</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">Call or WhatsApp this number</p>
      </div>`
    : `<p style="color:#9ca3af">Login as a provider to see contact details</p>`;

  showOffersInDetail(jobId);
  openModal('detail-modal');
}

function completeJob(jobId) {
  const job = state.jobs.find(j => j.id === jobId);
  if (job) { job.status = 'Completed'; renderAll(); }
}

function deleteJob(jobId) {
  if (!confirm('Delete this job?')) return;
  state.jobs = state.jobs.filter(j => j.id !== jobId);
  renderAll();
}

function handleSearch() {
  const query = $('#search-input')?.value?.trim();
  if (query) {
    state.filterCategory = null;
    renderJobs();
    $('#jobs')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function openLangModal() {
  const list = $('#lang-list');
  if (!list) return;

  list.innerHTML = ['TR', 'EN'].map(lang => `
    <div class="lang-item" onclick="changeLang('${lang.toLowerCase()}')" style="padding:16px;cursor:pointer;border-bottom:1px solid #e5e7eb;">
      ${lang}
    </div>
  `).join('');

  openModal('lang-modal');
}

function changeLang(lang) {
  state.lang = lang;
  renderAll();
  closeModal('lang-modal');
}

function toggleMobile() {
  $('.header')?.classList.toggle('mobile-open');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

let currentOfferJobId = null;

function showOfferForm(jobId) {
  currentOfferJobId = jobId;
  openModal('offer-modal');
}

function handleOfferSubmit(e) {
  e.preventDefault();
  const price = $('#offer-price')?.value?.trim();
  const message = $('#offer-message')?.value?.trim();
  const phone = $('#offer-phone')?.value?.trim();

  if (!price || !phone) return alert('Please fill in required fields');

  const job = state.jobs.find(j => j.id === currentOfferJobId);
  if (!job) return;

  if (!job.offers) job.offers = [];
  job.offers.push({
    price: parseFloat(price),
    message,
    phone,
    from: state.user?.name || 'Pro',
    createdAt: new Date().toISOString()
  });

  closeModal('offer-modal');
  renderAll();
  alert('Quote sent successfully! Customer will contact you.');
}

function showOffersInDetail(jobId) {
  const job = state.jobs.find(j => j.id === jobId);
  const container = $('#offers-section');
  if (!container || !job?.offers?.length) {
    if (container) container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="offers-list">
      <h4>Quotes Received (${job.offers.length})</h4>
      ${job.offers.map(offer => `
        <div class="offer-item">
          <div class="offer-price">$${offer.price}</div>
          <div class="offer-message">${offer.message || 'No message'}</div>
          <div class="offer-contact">📞 ${offer.phone}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Global functions
window.filterByCategory = filterByCategory;
window.showJobDetail = showJobDetail;
window.completeJob = completeJob;
window.deleteJob = deleteJob;
window.changeLang = changeLang;
window.showOfferForm = showOfferForm;
window.openReviewModal = openReviewModal;
window.filterByCountry = filterByCountry;
window.filterJobsByCountry = filterJobsByCountry;
window.filterJobsByCategory = filterJobsByCategory;
window.toCategory = Router.toCategory;
window.toProvider = Router.toProvider;
window.toJob = Router.toJob;

// Star rating display
function updateStarDisplay(rating) {
  document.querySelectorAll('.star-rating .star').forEach(star => {
    const value = parseInt(star.dataset.value);
    star.classList.toggle('active', value <= rating);
  });
}

// Open review modal for a provider
function openReviewModal(providerId, providerName) {
  const provider = sampleProviders.find(p => p.id === providerId);
  if (!provider) return;
  
  currentReviewProviderId = providerId;
  $('#review-rating').value = 0;
  $('#review-comment').value = '';
  updateStarDisplay(0);
  
  $('#review-provider-info').innerHTML = `
    <strong>${provider.name}</strong>
    <div style="color: var(--text-muted); font-size: 0.9rem;">
      ${'★'.repeat(Math.round(provider.rating))} ${provider.rating} (${provider.reviewCount} reviews)
    </div>
  `;
  
  openModal('review-modal');
}

// Handle review submission
function handleReviewSubmit(e) {
  e.preventDefault();
  const rating = parseInt($('#review-rating').value);
  const comment = $('#review-comment')?.value?.trim();
  
  if (rating === 0) return alert('Please select a rating');
  
  if (!state.reviews[currentReviewProviderId]) {
    state.reviews[currentReviewProviderId] = [];
  }
  
  state.reviews[currentReviewProviderId].push({
    rating,
    comment,
    author: state.user?.name || 'Anonymous',
    createdAt: new Date().toISOString()
  });
  
  // Update provider rating
  const reviews = state.reviews[currentReviewProviderId];
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const provider = sampleProviders.find(p => p.id === currentReviewProviderId);
  if (provider) {
    provider.rating = Math.round(avgRating * 10) / 10;
    provider.reviewCount = reviews.length;
  }
  
  saveReviews();
  closeModal('review-modal');
  showNotification('✅ Review submitted! Thank you.', 'success');
  renderAll();
}

// Save reviews to localStorage
function saveReviews() {
  localStorage.setItem('pear_reviews', JSON.stringify(state.reviews));
}

// Load reviews from localStorage
function loadReviews() {
  const saved = localStorage.getItem('pear_reviews');
  if (saved) state.reviews = JSON.parse(saved);
}

// Get reviews for a provider
function getProviderReviews(providerId) {
  return state.reviews[providerId] || [];
}

// Render provider reviews in modal
function renderProviderReviews(providerId) {
  const reviews = getProviderReviews(providerId);
  const container = $('#detail-reviews');
  if (!container) return;
  
  if (reviews.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted);">${t('reviews.noReviews')}</p>`;
    return;
  }
  
  container.innerHTML = `
    <div class="reviews-section">
      <h4>${t('reviews.title')}</h4>
      ${reviews.map(review => `
        <div class="review-item">
          <div class="review-header">
            <span class="review-author">${review.author}</span>
            <span class="review-date">${formatDate(review.createdAt)}</span>
          </div>
          <div class="review-stars">${'★'.repeat(review.rating)}</div>
          ${review.comment ? `<p class="review-comment">${review.comment}</p>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// Show notification toast
function showNotification(message, type = 'success') {
  const toast = $('#toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

let currentReviewProviderId = null;

// Bind offer events
$('#close-offer')?.addEventListener('click', () => closeModal('offer-modal'));
$('#cancel-offer')?.addEventListener('click', () => closeModal('offer-modal'));
$('#offer-form')?.addEventListener('submit', handleOfferSubmit);

// Start
document.addEventListener('DOMContentLoaded', init);