module.exports = {
  darkMode: 'class', // Opción para soportar el modo oscuro mediante clases
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1a202c', // Fondo oscuro personalizado
        darkCard: '#2d3748', // Card oscura personalizada
      },
    },
  },
  plugins: [],
};
