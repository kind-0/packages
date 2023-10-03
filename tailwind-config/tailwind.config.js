const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx,svelte}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        "gradient1": "#FF5E63",
        "gradient2": "#FF7E34",
        "gradient3": "#916EFF",
        "gradient4": "#5CA2FF",
        "accent2": "#817EFF",
      },
      height: {
        mobileModalContents: "460px"
      },
      width: {
        'sidebar': '244px',
        'main': '700px',
      },
      spacing: {
        '32': '32px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        lofi: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "base-100": "#f7f7f4",
          "accent": "#FB6038",
          ".card": {
            "background": "white",
            "box-shadow": "0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)"
          },
          ".svg-logo": {
            "fill": "black",
          },
          ".text-base-100-content": {
            "color": "#000000",
          },
          ".input": {
            "background": "white",
          },
          "mark": {
            "background": "rgba(255, 104, 94, 0.33)",
            "color": "#000000",
          }
        }
      },
      {
        black: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "base-100": "#000000",
          "base-200": "#111111",
          "base-300": "#222222",
          "neutral-800": "#232323",
          "neutral-900": "#111111",
          "h1": {
            "color": "#ffffff",
          },
          ".tab-active": {
            "color": "#ffffff",
          },
          "accent": "#FF685E",
          ".btn": {
            "border-radius": "5px",
            "text-transform": "none",
          },
          ".btn-circle": {
            "border-radius": "9999px !important",
          },
          ".card": {
            "background": "#111111"
          },
          ".card:not(.rounded-full, .rounded-xl)": {
            "border-radius": "5px",
          },
          ".input": {
            "background": "rgb(26, 25, 25)",
          },
          ".svg-logo": {
            "fill": "white",
          },
          ".text-base-100-content": {
            "color": "#ffffff",
          },
          "mark": {
            "background": "rgba(255, 104, 94, 0.33)",
            "color": "#FDC1BE",
          },
          "::selection": {
            "background": "rgba(255, 104, 94, 0.33)",
            "color": "#FDC1BE",
          },
          "mark.active": {
            "background": "rgba(246, 48, 2, 0.8)",
            "color": "#FFF0F0"
          }
        }
      }
    ],
    base: true,
    styled: true,
    utils: true,
    //rtl: false,
    //prefix: "",
    //logs: true,
  },
};
