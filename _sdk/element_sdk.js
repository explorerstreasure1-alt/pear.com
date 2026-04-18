const ElementSDK = (() => {
  const $ = (selector) => {
    const el = document.querySelector(selector);
    return el ? new ElementWrapper(el) : null;
  };

  const $$ = (selector) => {
    return Array.from(document.querySelectorAll(selector)).map(el => new ElementWrapper(el));
  };

  class ElementWrapper {
    constructor(element) {
      this.el = element;
    }

    addClass(...classes) {
      this.el.classList.add(...classes);
      return this;
    }

    removeClass(...classes) {
      this.el.classList.remove(...classes);
      return this;
    }

    toggleClass(className, force) {
      this.el.classList.toggle(className, force);
      return this;
    }

    hasClass(className) {
      return this.el.classList.contains(className);
    }

    attr(name, value) {
      if (value !== undefined) {
        this.el.setAttribute(name, value);
        return this;
      }
      return this.el.getAttribute(name);
    }

    removeAttr(name) {
      this.el.removeAttribute(name);
      return this;
    }

    on(event, handler, options) {
      this.el.addEventListener(event, handler, options);
      return this;
    }

    off(event, handler, options) {
      this.el.removeEventListener(event, handler, options);
      return this;
    }

    html(content) {
      if (content !== undefined) {
        this.el.innerHTML = content;
        return this;
      }
      return this.el.innerHTML;
    }

    text(content) {
      if (content !== undefined) {
        this.el.textContent = content;
        return this;
      }
      return this.el.textContent;
    }

    val(value) {
      if (value !== undefined) {
        this.el.value = value;
        return this;
      }
      return this.el.value;
    }

    show() {
      this.el.classList.remove('hidden');
      return this;
    }

    hide() {
      this.el.classList.add('hidden');
      return this;
    }

    toggle() {
      this.el.classList.toggle('hidden');
      return this;
    }

    fadeIn(duration = 300) {
      this.el.classList.remove('hidden');
      this.el.style.opacity = '0';
      requestAnimationFrame(() => {
        this.el.style.transition = `opacity ${duration}ms`;
        this.el.style.opacity = '1';
      });
      return this;
    }

    fadeOut(duration = 300) {
      this.el.style.transition = `opacity ${duration}ms`;
      this.el.style.opacity = '0';
      setTimeout(() => {
        this.el.classList.add('hidden');
        this.el.style.opacity = '';
      }, duration);
      return this;
    }

    css(styles) {
      Object.assign(this.el.style, styles);
      return this;
    }

    scrollIntoView(options = { behavior: 'smooth' }) {
      this.el.scrollIntoView(options);
      return this;
    }

    focus() {
      this.el.focus();
      return this;
    }

    blur() {
      this.el.blur();
      return this;
    }

    closest(selector) {
      const el = this.el.closest(selector);
      return el ? new ElementWrapper(el) : null;
    }

    find(selector) {
      const el = this.el.querySelector(selector);
      return el ? new ElementWrapper(el) : null;
    }

    findAll(selector) {
      return Array.from(this.el.querySelectorAll(selector)).map(el => new ElementWrapper(el));
    }

    remove() {
      this.el.remove();
      return this;
    }

    after(content) {
      this.el.insertAdjacentHTML('afterend', content);
      return this;
    }

    before(content) {
      this.el.insertAdjacentHTML('beforebegin', content);
      return this;
    }

    append(content) {
      this.el.insertAdjacentHTML('beforeend', content);
      return this;
    }

    prepend(content) {
      this.el.insertAdjacentHTML('afterbegin', content);
      return this;
    }

    get dataset() {
      return this.el.dataset;
    }

    get offset() {
      const rect = this.el.getBoundingClientRect();
      return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
    }

    get dimensions() {
      return { width: this.el.offsetWidth, height: this.el.offsetHeight };
    }
  }

  const createElement = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'class') {
        el.classList.add(...value.split(' ').filter(c => c));
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(el.style, value);
      } else if (key.startsWith('data')) {
        el.dataset[key.replace('data', '').toLowerCase()] = value;
      } else {
        el.setAttribute(key, value);
      }
    });

    children.forEach(child => {
      if (typeof child === 'string') {
        el.insertAdjacentHTML('beforeend', child);
      } else if (child instanceof Element) {
        el.appendChild(child);
      } else if (child instanceof ElementWrapper) {
        el.appendChild(child.el);
      }
    });

    return new ElementWrapper(el);
  };

  const ready = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  const on = (selector, event, handler) => {
    document.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target) {
        handler.call(new ElementWrapper(target), e);
      }
    });
  };

  const delegate = (parent, selector, event, handler) => {
    document.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      const parentEl = document.querySelector(parent);
      if (target && parentEl.contains(target)) {
        handler.call(new ElementWrapper(target), e);
      }
    });
  };

  return { $, $$, createElement, ready, on, delegate };
})();

window.$ = ElementSDK.$;
window.$$ = ElementSDK.$$;
window.$create = ElementSDK.createElement;
window.$ready = ElementSDK.ready;
window.$on = ElementSDK.on;
window.$delegate = ElementSDK.delegate;