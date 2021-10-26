module.exports = {
    mode: "jit",
    purge: ["./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        'display': ['Saira', 'ui-sans-serif', 'system-ui'],
        'body': ['Courier', 'ui-sans-serif', 'system-ui'],
      },
      extend: {
        backgroundImage: {
          'banner-mobile': 'url("banner1-mobile.jpg")',
          'banner-desktop': 'url("banner1.jpg")',
         }
      }
    },
    variants: {},
    plugins: [],
  };
