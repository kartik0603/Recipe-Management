
module.exports = {
  content: [
    './public/**/*.html', 
    './public/js/**/*.js', 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',  
        accent: '#6366F1',   
      },
      fontFamily: {
        body: ['ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
    },
  },
  plugins: [],
}
