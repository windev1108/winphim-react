module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-infinite': 'spin 2s linear infinite',
      },
      backgroundImage: {
        'background': "url('./assets/images/bg.png')",
        'logo': "url('./assets/images/logo.png')",
        'error': "url('./assets/images/error.png')"
      }
    },
  },
  plugins: [],
}
