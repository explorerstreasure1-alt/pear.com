const ApiService = {
  baseUrl: '',
  timeout: 10000,

  async request(endpoint, options = {}) {
    const url = this.baseUrl + endpoint;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, { ...config, signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  },

  get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return this.request(url, { method: 'GET' });
  },

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  setBaseUrl(url) {
    this.baseUrl = url;
  }
};

const JobService = {
  storageKey: 'pear_jobs',

  getAll() {
    const jobs = DataStore.get(this.storageKey);
    return jobs || this.getSampleJobs();
  },

  getById(id) {
    const jobs = this.getAll();
    return jobs.find(j => j.id === id);
  },

  getActive() {
    return this.getAll().filter(j => j.status !== 'Completed');
  },

  getByCategory(category) {
    return this.getAll().filter(j => j.category === category);
  },

  add(job) {
    const jobs = this.getAll();
    const newJob = {
      ...job,
      id: this.generateId(),
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    jobs.unshift(newJob);
    DataStore.set(this.storageKey, jobs);
    return newJob;
  },

  update(id, updates) {
    const jobs = this.getAll();
    const index = jobs.findIndex(j => j.id === id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updates };
      DataStore.set(this.storageKey, jobs);
      return jobs[index];
    }
    return null;
  },

  delete(id) {
    const jobs = this.getAll();
    const filtered = jobs.filter(j => j.id !== id);
    DataStore.set(this.storageKey, filtered);
  },

  generateId() {
    return 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  getSampleJobs() {
    const sampleJobs = [
      { id: 'job_1', title: 'Kitchen faucet leaking', description: 'Kitchen sink faucet has a leak and needs repair', category: 'plumbing', address: 'Istanbul, Kadikoy', phone: '+90 532 123 4567', status: 'Open', createdAt: '2025-04-17T10:00:00Z' },
      { id: 'job_2', title: 'Living room painting', description: 'Need to paint 2 rooms, about 40m2 total', category: 'painting', address: 'Ankara, Cankaya', phone: '+90 532 234 5678', status: 'Open', createdAt: '2025-04-16T14:30:00Z' },
      { id: 'job_3', title: 'Move furniture to new apartment', description: '2 bedroom apartment, need help moving furniture', category: 'moving', address: 'Izmir, Bornova', phone: '+90 532 345 6789', status: 'Open', createdAt: '2025-04-15T09:00:00Z' },
      { id: 'job_4', title: 'AC unit not cooling', description: 'Split AC making noise and not cooling properly', category: 'repair', address: 'Istanbul, Besiktas', phone: '+90 532 456 7890', status: 'Open', createdAt: '2025-04-14T16:00:00Z' },
      { id: 'job_5', title: 'Full house cleaning needed', description: '3 bedroom house, deep cleaning required', category: 'cleaning', address: 'Istanbul, Sisli', phone: '+90 532 567 8901', status: 'Open', createdAt: '2025-04-13T11:00:00Z' }
    ];
    DataStore.set(this.storageKey, sampleJobs);
    return sampleJobs;
  }
};

const UserService = {
  storageKey: 'pear_user',

  getCurrent() {
    return DataStore.get(this.storageKey);
  },

  setCurrent(user) {
    DataStore.set(this.storageKey, user);
  },

  clear() {
    DataStore.remove(this.storageKey);
  },

  isLoggedIn() {
    return !!this.getCurrent();
  },

  isProvider() {
    const user = this.getCurrent();
    return user && user.role === 'provider';
  },

  updateProfile(updates) {
    const user = this.getCurrent();
    if (user) {
      const updated = { ...user, ...updates };
      this.setCurrent(updated);
      return updated;
    }
    return null;
  }
};

const CategoryService = {
  getAll() {
    return [
      { id: 'plumbing', name: 'Plumbing', nameKey: 'categories.plumbing', img: 'images/plumbing.jpg', online: false },
      { id: 'electrical', name: 'Electrical', nameKey: 'categories.electrical', img: 'images/electrical.jpg', online: false },
      { id: 'cleaning', name: 'Cleaning', nameKey: 'categories.cleaning', img: 'images/cleaning.jpg', online: false },
      { id: 'painting', name: 'Painting', nameKey: 'categories.painting', img: 'images/painting.jpg', online: false },
      { id: 'moving', name: 'Moving', nameKey: 'categories.moving', img: 'images/moving.jpg', online: false },
      { id: 'repair', name: 'Repair', nameKey: 'categories.repair', img: 'images/repair.jpg', online: false },
      { id: 'equipment', name: 'Equipment Service', nameKey: 'categories.equipment', img: 'images/equipment.jpg', online: false },
      { id: 'design', name: 'Graphic Design', nameKey: 'categories.design', img: 'images/design.jpg', online: true },
      { id: 'software', name: 'Software Dev', nameKey: 'categories.software', img: 'images/software.jpg', online: true },
      { id: 'it', name: 'IT Support', nameKey: 'categories.it', img: 'images/it.jpg', online: true }
    ];
  },

  getById(id) {
    return this.getAll().find(c => c.id === id);
  },

  getName(id) {
    const cat = this.getById(id);
    return cat ? I18n.t(cat.nameKey) || cat.name : id;
  }
};

window.ApiService = ApiService;
window.JobService = JobService;
window.UserService = UserService;
window.CategoryService = CategoryService;