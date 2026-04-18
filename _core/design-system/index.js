const DesignSystem = {
  tokens: {
    colors: {
      primary: '#00C853',
      primaryDark: '#00b34a',
      primaryLight: '#dcfce7',
      primarySubtle: '#f0fdf4',
      accent: '#00C853',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      text: {
        primary: '#1a1a1a',
        secondary: '#374151',
        tertiary: '#6b7280',
        muted: '#9ca3af',
        inverse: '#ffffff'
      },
      bg: {
        primary: '#ffffff',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6',
        inverse: '#1a1a1a'
      },
      border: {
        default: '#d1d5db',
        light: '#e5e7eb',
        dark: '#9ca3af'
      }
    },
    typography: {
      fontFamily: {
        sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", "Fira Code", monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800'
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      DEFAULT: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
      md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
    },
    transitions: {
      fast: '150ms ease',
      DEFAULT: '200ms ease',
      slow: '300ms ease'
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    zIndex: {
      dropdown: '1000',
      sticky: '1020',
      fixed: '1030',
      modalBackdrop: '1040',
      modal: '1050',
      popover: '1060',
      tooltip: '1070'
    }
  },

  applyTokens() {
    const root = document.documentElement;
    const t = this.tokens;

    root.style.setProperty('--color-primary', t.colors.primary);
    root.style.setProperty('--color-primary-dark', t.colors.primaryDark);
    root.style.setProperty('--color-primary-light', t.colors.primaryLight);
    root.style.setProperty('--color-primary-subtle', t.colors.primarySubtle);
    root.style.setProperty('--color-success', t.colors.success);
    root.style.setProperty('--color-warning', t.colors.warning);
    root.style.setProperty('--color-error', t.colors.error);
    root.style.setProperty('--color-info', t.colors.info);
    root.style.setProperty('--color-text-primary', t.colors.text.primary);
    root.style.setProperty('--color-text-secondary', t.colors.text.secondary);
    root.style.setProperty('--color-text-tertiary', t.colors.text.tertiary);
    root.style.setProperty('--color-text-muted', t.colors.text.muted);
    root.style.setProperty('--color-text-inverse', t.colors.text.inverse);
    root.style.setProperty('--color-bg-primary', t.colors.bg.primary);
    root.style.setProperty('--color-bg-secondary', t.colors.bg.secondary);
    root.style.setProperty('--color-bg-tertiary', t.colors.bg.tertiary);
    root.style.setProperty('--color-border', t.colors.border.default);
    root.style.setProperty('--color-border-light', t.colors.border.light);

    root.style.setProperty('--font-sans', t.typography.fontFamily.sans);
    root.style.setProperty('--font-mono', t.typography.fontFamily.mono);

    root.style.setProperty('--radius-sm', t.borderRadius.sm);
    root.style.setProperty('--radius', t.borderRadius.DEFAULT);
    root.style.setProperty('--radius-md', t.borderRadius.md);
    root.style.setProperty('--radius-lg', t.borderRadius.lg);
    root.style.setProperty('--radius-xl', t.borderRadius.xl);
    root.style.setProperty('--radius-full', t.borderRadius.full);

    root.style.setProperty('--shadow-sm', t.shadows.sm);
    root.style.setProperty('--shadow', t.shadows.DEFAULT);
    root.style.setProperty('--shadow-md', t.shadows.md);
    root.style.setProperty('--shadow-lg', t.shadows.lg);
    root.style.setProperty('--shadow-xl', t.shadows.xl);

    root.style.setProperty('--transition-fast', t.transitions.fast);
    root.style.setProperty('--transition', t.transitions.DEFAULT);
    root.style.setProperty('--transition-slow', t.transitions.slow);
  },

  getColor(name) {
    return this.tokens.colors[name] || name;
  },

  getBreakpoint(name) {
    return this.tokens.breakpoints[name] || name;
  },

  init() {
    this.applyTokens();
  }
};

window.DesignSystem = DesignSystem;