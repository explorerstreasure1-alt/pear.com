const UI = {
  $: (sel) => document.querySelector(sel),
  $$: (sel) => document.querySelectorAll(sel),

  showToast(message, type = 'success') {
    const toast = this.$('#toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, Config.ui.toastDuration);
  },

  showLoading(element) {
    if (!element) return;
    element.innerHTML = '<div class="loading-spinner"></div>';
  },

  hideLoading(element) {
    if (!element) return;
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
  },

  openModal(id) {
    const modal = this.$(`#${id}`);
    if (modal) modal.classList.remove('hidden');
  },

  closeModal(id) {
    const modal = this.$(`#${id}`);
    if (modal) modal.classList.add('hidden');
  },

  scrollTo(selector) {
    if (selector === 'top' || selector === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = this.$(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },

  formatDate(dateStr, lang = 'en') {
    const d = new Date(dateStr);
    const locales = { tr: 'tr-TR', en: 'en-US' };
    return d.toLocaleDateString(locales[lang] || 'en-US', { 
      day: 'numeric', 
      month: 'short' 
    });
  },

  formatPrice(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('📋 Copied to clipboard!');
    }).catch(() => {
      this.showToast('Failed to copy', 'error');
    });
  }
};

const Icons = {
  render(selector) {
    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

window.UI = UI;
window.Icons = Icons;