export const theme = {
  colors: {
    primary: '#2D3A3A', // Deep Forest Green
    secondary: '#C5A059', // Soft Gold
    background: '#FAF9F6', // Off-white/Cream
    accent: '#1A2421', // Rich Dark Green
    text: '#2D3A3A',
    textLight: '#6B7280',
    white: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.7)',
  },
  fonts: {
    heading: "'Outfit', sans-serif",
    body: "'Inter', sans-serif",
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
    medium: '0 10px 30px rgba(0, 0, 0, 0.1)',
  }
};

export type Theme = typeof theme;
