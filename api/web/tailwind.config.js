/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#7df4ff", "border-black": "#121212", "background": "#fcf9f8", 
        "secondary-fixed": "#ffd9e3", "on-secondary": "#ffffff", "primary-fixed": "#fde400", 
        "on-secondary-container": "#fffbff", "lime-green": "#2BEE3A", "on-surface-variant": "#4b4731", 
        "surface-container": "#f0edec", "inverse-primary": "#dec800", "error": "#ba1a1a", 
        "tertiary-container": "#8af5ff", "electric-cyan": "#00F0FF", "on-tertiary-fixed": "#002022", 
        "primary-fixed-dim": "#dec800", "outline": "#7c775f", "on-error": "#ffffff", 
        "on-primary-fixed-variant": "#504700", "outline-variant": "#cdc7aa", "on-tertiary": "#ffffff", 
        "on-primary": "#ffffff", "secondary": "#b40065", "tertiary": "#006970", "primary": "#6a5f00", 
        "on-tertiary-container": "#007178", "surface-cream-alt": "#F5EFE0", "on-primary-container": "#726600", 
        "shadow-black": "#000000", "surface-cream": "#FFFDF5", "surface-tint": "#6a5f00", 
        "tertiary-fixed-dim": "#00dbe9", "vibrant-orange": "#FF5C00", "on-secondary-fixed": "#3e001f", 
        "on-primary-fixed": "#201c00", "secondary-fixed-dim": "#ffb0ca", "electric-purple": "#8F00FF", 
        "surface-container-high": "#ebe7e7", "surface-container-low": "#f6f3f2", "surface-bright": "#fcf9f8", 
        "electric-yellow": "#FFE600", "surface": "#fcf9f8", "on-secondary-fixed-variant": "#8d004e", 
        "on-tertiary-fixed-variant": "#004f54", "on-background": "#1c1b1b", "surface-container-lowest": "#ffffff", 
        "error-container": "#ffdad6", "surface-dim": "#dcd9d9", "on-surface": "#1c1b1b", "hot-pink": "#FF1493", 
        "surface-container-highest": "#e5e2e1", "secondary-container": "#e10080", "primary-container": "#ffe600", 
        "inverse-on-surface": "#f3f0ef", "inverse-surface": "#313030", "surface-variant": "#e5e2e1", 
        "on-error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem"
      },
      spacing: {
        "space-sm": "0.75rem", "space-xl": "2rem", "space-3xl": "4rem", "space-2xl": "3rem", 
        "gutter-mobile": "1rem", "space-xs": "0.5rem", "margin-mobile": "1.25rem", "gutter-desktop": "2rem", 
        "space-lg": "1.5rem", "margin-desktop": "3rem", "space-4xl": "6rem", "space-xxs": "0.25rem", "space-md": "1rem"
      },
      fontFamily: {
        "headline-md-mobile": ["Space Grotesk"], "label-sm": ["Space Grotesk"], "body-lg": ["Plus Jakarta Sans"], 
        "body-sm": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Space Grotesk"], 
        "stat-number-mobile": ["Space Grotesk"], "label-lg": ["Space Grotesk"], "label-md": ["Space Grotesk"], 
        "headline-md": ["Space Grotesk"], "headline-lg": ["Space Grotesk"], "stat-number": ["Space Grotesk"], 
        "display-hero-mobile": ["Space Grotesk"], "headline-sm": ["Space Grotesk"], "display-hero": ["Space Grotesk"]
      },
      fontSize: {
        "headline-md-mobile": ["24px", { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.08em", fontWeight: "800" }],
        "body-lg": ["18px", { lineHeight: "26px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "0em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "500" }],
        "headline-lg-mobile": ["32px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "stat-number-mobile": ["56px", { lineHeight: "60px", letterSpacing: "-0.04em", fontWeight: "800" }],
        "label-lg": ["16px", { lineHeight: "20px", letterSpacing: "0.04em", fontWeight: "700" }],
        "label-md": ["13px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["48px", { lineHeight: "54px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "stat-number": ["96px", { lineHeight: "96px", letterSpacing: "-0.05em", fontWeight: "800" }],
        "display-hero-mobile": ["48px", { lineHeight: "52px", letterSpacing: "-0.03em", fontWeight: "800" }],
        "headline-sm": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-hero": ["80px", { lineHeight: "84px", letterSpacing: "-0.04em", fontWeight: "800" }]
      }
    }
  },
  plugins: [],
}
