const DataSDK = (() => {
  const STORAGE_KEY = 'tasker_jobs';
  const subscribers = [];

  const generateId = () => 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  const getJobs = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading jobs:', e);
      return [];
    }
  };

  const saveJobs = (jobs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
      notifySubscribers(jobs);
      return true;
    } catch (e) {
      console.error('Error saving jobs:', e);
      return false;
    }
  };

  const notifySubscribers = (jobs) => {
    subscribers.forEach(cb => {
      try {
        cb(jobs);
      } catch (e) {
        console.error('Subscriber error:', e);
      }
    });
  };

  const init = async (options = {}) => {
    if (options.onDataChanged) {
      subscribers.push(options.onDataChanged);
    }

    const jobs = getJobs();
    notifySubscribers(jobs);

    return { isOk: true, count: jobs.length };
  };

  const create = async (jobData) => {
    const jobs = getJobs();
    const newJob = {
      ...jobData,
      __backendId: generateId(),
      status: jobData.status || 'Active',
      createdAt: jobData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    jobs.unshift(newJob);
    const saved = saveJobs(jobs);

    return saved ? { isOk: true, job: newJob } : { isOk: false, error: 'Storage error' };
  };

  const update = async (jobId, updates) => {
    const jobs = getJobs();
    const idx = jobs.findIndex(j => j.__backendId === jobId);

    if (idx === -1) {
      return { isOk: false, error: 'Job not found' };
    }

    jobs[idx] = { ...jobs[idx], ...updates, updatedAt: new Date().toISOString() };
    const saved = saveJobs(jobs);

    return saved ? { isOk: true, job: jobs[idx] } : { isOk: false, error: 'Storage error' };
  };

  const remove = async (jobId) => {
    const jobs = getJobs();
    const filtered = jobs.filter(j => j.__backendId !== jobId);

    if (filtered.length === jobs.length) {
      return { isOk: false, error: 'Job not found' };
    }

    const saved = saveJobs(filtered);
    return saved ? { isOk: true } : { isOk: false, error: 'Storage error' };
  };

  const getById = async (jobId) => {
    const jobs = getJobs();
    const job = jobs.find(j => j.__backendId === jobId);
    return job || null;
  };

  const search = async (query, filters = {}) => {
    let jobs = getJobs();

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      jobs = jobs.filter(j =>
        (j.title && j.title.toLowerCase().includes(q)) ||
        (j.description && j.description.toLowerCase().includes(q)) ||
        (j.category && j.category.toLowerCase().includes(q))
      );
    }

    if (filters.category) {
      jobs = jobs.filter(j => j.category === filters.category);
    }

    if (filters.status) {
      jobs = jobs.filter(j => j.status === filters.status);
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      jobs = jobs.filter(j => j.address && j.address.toLowerCase().includes(loc));
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      jobs = jobs.filter(j => new Date(j.createdAt) >= from);
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      jobs = jobs.filter(j => new Date(j.createdAt) <= to);
    }

    return jobs;
  };

  const getStats = () => {
    const jobs = getJobs();
    return {
      total: jobs.length,
      active: jobs.filter(j => j.status === 'Active').length,
      completed: jobs.filter(j => j.status === 'Completed').length,
      byCategory: jobs.reduce((acc, j) => {
        acc[j.category] = (acc[j.category] || 0) + 1;
        return acc;
      }, {})
    };
  };

  return { init, create, update, remove, getById, search, getStats, getJobs };
})();

window.dataSdk = DataSDK;