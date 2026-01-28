// Design Tokens for Vyan Doctor Portal
// Aligned with vyan-client design system

export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#00898F',
    light: '#1D9FA5',
    dark: '#006B70',
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: '#114668',
    light: '#1D5A7F',
    dark: '#0D3650',
  },
  
  // Accent colors
  accent: {
    green: '#51AF5A',
    teal: '#005F5F',
  },
  
  // Dashboard card colors
  dashboard: {
    blue: {
      bg: '#E0E7FF',
      border: '#F6F9FF',
    },
    orange: {
      bg: '#FFF3ED',
      border: '#FFEDD5',
    },
    yellow: {
      bg: '#FFFDED',
      border: '#FEF9C3',
    },
    lightBlue: {
      bg: '#F6FBFF',
      border: '#E0F2FE',
    },
  },
  
  // Neutral colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: '#059669',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#2563EB',
  
  // Text colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    inactive: '#9CA3AF',
  },
  
  // Background colors
  background: {
    white: '#FFFFFF',
    light: '#F9FAFB',
    dark: '#000000',
  },
};

export const typography = {
  fontFamily: {
    poppins: ['Poppins', 'sans-serif'],
    inter: ['Inter', 'sans-serif'],
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

export const spacing = {
  section: {
    mobile: '2rem',      // 32px
    tablet: '3rem',      // 48px
    desktop: '4rem',     // 64px
  },
  
  container: {
    padding: {
      mobile: '1rem',    // 16px
      sm: '1.5rem',      // 24px
      md: '3rem',        // 48px
      lg: '6.25rem',     // 100px
    },
  },
};

export const borderRadius = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.125rem', // 18px
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '2px 2px 4px 0px rgba(64, 64, 64, 0.25)',
};
