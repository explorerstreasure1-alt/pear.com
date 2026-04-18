const Storage = {
  defaults: {
    pear_jobs: [],
    pear_providers: [],
    pear_reviews: {},
    pear_user: null,
    pear_pending_job: null
  },

  get(key) {
    const item = localStorage.getItem(key);
    if (item === null) return this.defaults[key] || null;
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    Object.keys(this.defaults).forEach(key => this.remove(key));
  },

  keys() {
    return Object.keys(this.defaults);
  }
};

const JobsAPI = {
  storageKey: 'pear_jobs',

  all() {
    return Storage.get(this.storageKey) || [];
  },

  get(id) {
    return this.all().find(j => j.id === id);
  },

  active() {
    return this.all().filter(j => j.status === 'Open');
  },

  add(job) {
    const jobs = this.all();
    const newJob = {
      ...job,
      id: 'job_' + Date.now(),
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    jobs.unshift(newJob);
    Storage.set(this.storageKey, jobs);
    return newJob;
  },

  update(id, data) {
    const jobs = this.all();
    const idx = jobs.findIndex(j => j.id === id);
    if (idx >= 0) {
      jobs[idx] = { ...jobs[idx], ...data };
      Storage.set(this.storageKey, jobs);
      return jobs[idx];
    }
    return null;
  },

  delete(id) {
    const jobs = this.all().filter(j => j.id !== id);
    Storage.set(this.storageKey, jobs);
  }
};

const ProvidersAPI = {
  storageKey: 'pear_providers',

  all() {
    const stored = Storage.get(this.storageKey);
    return stored?.length > 0 ? stored : this.getSamples();
  },

  get(id) {
    return this.all().find(p => p.id === id);
  },

  getSamples() {
    const samples = [
      { id: 'p1', name: 'Ahmet Usta', phone: '+90 532 123 4567', category: 'tesisat', country: 'TR', rating: 4.8, reviewCount: 12 },
      { id: 'p2', name: 'Mehmet Elektrikçi', phone: '+90 532 234 5678', category: 'elektrik', country: 'TR', rating: 4.5, reviewCount: 8 },
      { id: 'p3', name: 'Sarah Cleaner', phone: '+49 171 234 5678', category: 'temizlik', country: 'DE', rating: 5.0, reviewCount: 15 },
      { id: 'p4', name: 'John Painter', phone: '+1 555 123 4567', category: 'boyaci', country: 'US', rating: 4.2, reviewCount: 6 }
    ];
    Storage.set(this.storageKey, samples);
    return samples;
  },

  updateRating(id) {
    const reviews = ReviewsAPI.getByProvider(id);
    const provider = this.get(id);
    if (provider && reviews.length > 0) {
      const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
      provider.rating = Math.round(avg * 10) / 10;
      provider.reviewCount = reviews.length;
      Storage.set(this.storageKey, this.all().map(p => p.id === id ? provider : p));
    }
  }
};

const ReviewsAPI = {
  storageKey: 'pear_reviews',

  all() {
    return Storage.get(this.storageKey) || {};
  },

  getByProvider(providerId) {
    return this.all()[providerId] || [];
  },

  add(providerId, review) {
    const all = this.all();
    if (!all[providerId]) all[providerId] = [];
    all[providerId].push({
      ...review,
      id: 'rev_' + Date.now(),
      createdAt: new Date().toISOString()
    });
    Storage.set(this.storageKey, all);
    ProvidersAPI.updateRating(providerId);
    return review;
  }
};

const UserAPI = {
  storageKey: 'pear_user',

  get() {
    return Storage.get(this.storageKey);
  },

  set(user) {
    Storage.set(this.storageKey, user);
  },

  clear() {
    Storage.remove(this.storageKey);
  }
};

window.Storage = Storage;
window.JobsAPI = JobsAPI;
window.ProvidersAPI = ProvidersAPI;
window.ReviewsAPI = ReviewsAPI;
window.UserAPI = UserAPI;