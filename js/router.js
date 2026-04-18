const Router = {
  routes: {},
  
  init() {
    this.handleRoute();
    window.addEventListener('popstate', () => this.handleRoute());
  },
  
  navigate(path, replace = false) {
    const url = window.location.origin + window.location.pathname + path;
    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
    this.handleRoute();
  },
  
  handleRoute() {
    const path = window.location.pathname;
    const hash = window.location.hash.slice(1);
    
    // Category routes: /category/tesisat
    if (path.startsWith('/category/')) {
      const category = path.split('/category/')[1];
      state.filterCategory = category;
      state.filterCountry = null;
      this.scrollTo('jobs');
      renderJobs();
      return;
    }
    
    // Provider routes: /pro/ahmet-usta
    if (path.startsWith('/pro/')) {
      const providerId = path.split('/pro/')[1];
      this.scrollTo('providers');
      showProviderDetail(providerId);
      return;
    }
    
    // Job routes: /job/123
    if (path.startsWith('/job/')) {
      const jobId = path.split('/job/')[1];
      this.scrollTo('jobs');
      showJobDetail(jobId);
      return;
    }
    
    // Hash navigation
    if (hash) {
      this.scrollTo(hash);
    }
  },
  
  scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },
  
  toCategory(categoryId) {
    const cat = categories.find(c => c.id === categoryId);
    const slug = cat ? cat.name.toLowerCase().replace(/\s+/g, '-') : categoryId;
    this.navigate(`/category/${slug}`);
  },
  
  toProvider(providerId) {
    const provider = ProvidersAPI.get(providerId);
    if (provider) {
      const slug = provider.name.toLowerCase().replace(/\s+/g, '-');
      this.navigate(`/pro/${slug}?id=${providerId}`);
    }
  },
  
  toJob(jobId) {
    this.navigate(`/job/${jobId}`);
  }
};

window.Router = Router;