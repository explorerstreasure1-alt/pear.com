const Store = {
  state: {},
  listeners: [],

  get(key) {
    return key ? this.state[key] : this.state;
  },

  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.notify(key, value, oldValue);
  },

  update(updates) {
    Object.keys(updates).forEach(key => {
      this.set(key, updates[key]);
    });
  },

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  notify(key, newValue, oldValue) {
    this.listeners.forEach(listener => listener(key, newValue, oldValue));
  },

  init(initialState = {}) {
    this.state = { ...initialState };
  },

  reset() {
    this.state = {};
    this.notify('reset', null, null);
  }
};

const JobStore = {
  ...Store,
  jobs: [],
  filteredJobs: [],
  activeCategory: null,
  searchQuery: '',

  init() {
    this.set('jobs', JobService.getAll());
    this.set('filteredJobs', this.get('jobs'));
  },

  getJobs() {
    return this.get('jobs');
  },

  getFilteredJobs() {
    return this.get('filteredJobs');
  },

  addJob(job) {
    const newJob = JobService.add(job);
    this.set('jobs', JobService.getAll());
    this.filter(this.get('activeCategory'), this.get('searchQuery'));
    return newJob;
  },

  updateJob(id, updates) {
    JobService.update(id, updates);
    this.set('jobs', JobService.getAll());
    this.filter(this.get('activeCategory'), this.get('searchQuery'));
  },

  filter(category, query) {
    let jobs = this.get('jobs');
    
    if (category) {
      jobs = jobs.filter(j => j.category === category);
    }
    
    if (query) {
      const q = query.toLowerCase();
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.description.toLowerCase().includes(q)
      );
    }

    this.set('activeCategory', category);
    this.set('searchQuery', query);
    this.set('filteredJobs', jobs);
  },

  clearFilter() {
    this.filter(null, null);
  },

  getCategories() {
    const jobs = this.get('jobs');
    return CategoryService.getAll().map(cat => ({
      ...cat,
      count: jobs.filter(j => j.category === cat.id && j.status !== 'Completed').length
    }));
  }
};

const UIStore = {
  ...Store,
  modals: {
    post: false,
    payment: false,
    auth: false,
    detail: false
  },
  loading: false,
  toast: null,
  mobileMenuOpen: false,
  selectedJob: null,

  openModal(name) {
    const modals = this.get('modals');
    modals[name] = true;
    this.set('modals', { ...modals });
  },

  closeModal(name) {
    const modals = this.get('modals');
    modals[name] = false;
    this.set('modals', { ...modals });
  },

  closeAllModals() {
    this.set('modals', { post: false, payment: false, auth: false, detail: false });
  },

  setLoading(loading) {
    this.set('loading', loading);
  },

  showToast(message, type = 'info', duration = 3000) {
    this.set('toast', { message, type });
    setTimeout(() => this.clearToast(), duration);
  },

  clearToast() {
    this.set('toast', null);
  },

  toggleMobileMenu() {
    this.set('mobileMenuOpen', !this.get('mobileMenuOpen'));
  },

  selectJob(job) {
    this.set('selectedJob', job);
  },

  clearSelectedJob() {
    this.set('selectedJob', null);
  }
};

const UserStore = {
  ...Store,
  user: null,

  init() {
    this.set('user', UserService.getCurrent());
  },

  login(user) {
    UserService.setCurrent(user);
    this.set('user', user);
  },

  logout() {
    UserService.clear();
    this.set('user', null);
  },

  getUser() {
    return this.get('user');
  },

  isLoggedIn() {
    return !!this.get('user');
  },

  isProvider() {
    const user = this.get('user');
    return user && user.role === 'provider';
  }
};

window.JobStore = JobStore;
window.UIStore = UIStore;
window.UserStore = UserStore;