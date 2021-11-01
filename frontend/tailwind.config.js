module.exports = {
    mode: "jit",
    purge: {
      content: ["./src/**/*.tsx"],
      options: {
        safelist: [ "rotate-0", "rotate-180", "h-0", "h-auto"]
      }
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        'display': ["'Press Start 2P'", 'ui-sans-serif', 'system-ui'],
        'body': ['Roboto Mono', 'ui-sans-serif', 'system-ui'],
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'pourpre': '#89152d',
      }),
      extend: {
        backgroundImage: {
          'banner-mobile': 'url("/banner1-mobile.jpg")',
          'banner-desktop': 'url("/banner1.jpg")',
          'egg-desktop': 'url("/background.jpg")',
          'egg-mobile': 'url("/background-mobile.jpg")',
         },
         boxShadow: {
          pixel: 'inset 0 -4px 0 0 #929292, -2px -2px 0 0 #000, 2px 2px 0 0 #000',
          bar: '-1px -1px 0 0 #fff, 1px 1px 0 0 #fff',
          bevel: '-1px -1px 0 0 #fff, 1px 1px 0 0 #000'
         },
         dropShadow: {
          bottom: '0px 3px 0px #111'
         },
         transitionProperty: {
           'max-height': 'max-height',
         }
      }
    },
    variants: {},
    plugins: [],
  };
