const Validator = {
  // XSS koruması - HTML special karakterleri temizle
  sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // URL encoding - form submission için
  encode(str) {
    if (!str) return '';
    return encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
  },

  // Telefon formatı doğrula - daha sıkı kontrol
  phone(value) {
    if (!value) return 'Phone is required';
    const cleaned = value.replace(/\D/g, '');
    // En az 10, en fazla 15 rakam
    if (cleaned.length < 10 || cleaned.length > 15) return 'Invalid phone number';
    // + ile başlamalı veya sadece rakam
    const re = /^\+?[1-9]\d{7,14}$/;
    return re.test(value.replace(/\s/g, '')) ? null : 'Invalid phone format';
  },

  email(value) {
    if (!value) return 'Email is required';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? null : 'Invalid email format';
  },

  required(value, fieldName = 'Field') {
    return value?.trim() ? null : `${fieldName} is required`;
  },

  minLength(value, min, fieldName = 'Field') {
    return value?.length >= min ? null : `${fieldName} must be at least ${min} characters`;
  },

  url(value) {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Invalid URL';
    }
  }
};

const Validate = {
  // Form verilerini sanitize et ve doğrula
  job(formData) {
    const errors = {};
    
    // Her alanı sanitize et
    const sanitized = {
      country: Validator.sanitize(formData.country),
      category: Validator.sanitize(formData.category),
      title: Validator.sanitize(formData.title),
      description: Validator.sanitize(formData.description),
      address: Validator.sanitize(formData.address),
      phone: formData.phone?.trim(), // Telefon sanitize değil ama trimlanmış
      email: formData.email?.trim()
    };
    
    if (!sanitized.country) errors.country = Validator.required(sanitized.country, 'Country');
    if (!sanitized.category) errors.category = Validator.required(sanitized.category, 'Category');
    if (!sanitized.title) errors.title = Validator.required(sanitized.title, 'Title');
    if (!sanitized.address) errors.address = Validator.required(sanitized.address, 'Address');
    if (!sanitized.phone) errors.phone = Validator.required(sanitized.phone, 'Phone');
    else if (Validator.phone(sanitized.phone)) errors.phone = Validator.phone(sanitized.phone);
    if (sanitized.email && Validator.email(sanitized.email)) errors.email = Validator.email(sanitized.email);
    
    return {
      valid: Object.keys(errors).length === 0,
      errors,
      sanitized
    };
  },

  auth(formData) {
    const errors = {};
    if (!formData.name) errors.name = Validator.required(formData.name, 'Name');
    if (!formData.email) errors.email = Validator.email(formData.email);
    else if (Validator.email(formData.email)) errors.email = Validator.email(formData.email);
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  },

  offer(formData) {
    const errors = {};
    if (!formData.price) errors.price = Validator.required(formData.price, 'Price');
    if (!formData.phone) errors.phone = Validator.required(formData.phone, 'Phone');
    else if (Validator.phone(formData.phone)) errors.phone = Validator.phone(formData.phone);
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  },

  review(formData) {
    const errors = {};
    const rating = parseInt(formData.rating);
    if (!rating || rating < 1 || rating > 5) errors.rating = 'Please select a valid rating (1-5)';
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
};

window.Validator = Validator;
window.Validate = Validate;