import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        heading: "#1A1B21",
        heading4: "#0B1C30",
        contact: "#1B1C1A",
        global: {
          from: "#4A4CE6",
          via: "#34A1B4",
          to: "#4BE191",
        },
      },
      backgroundImage: {
        global: "linear-gradient(to right, #4A4CE6, #34A1B4,rgb(61, 231, 141))",
        "global-soft":
          "linear-gradient(180deg, rgba(52, 161, 180, 0.38) 0%, rgba(74, 76, 230, 0.12) 28%, rgba(75, 225, 145, 0.20) 62%, #DCE8EA 100%)",
      },
      fontSize: {
        h1: [
          "32px",
          { lineHeight: "100%", letterSpacing: "0px", fontWeight: "700" },
        ],
        "h1-sm": [
          "44px",
          { lineHeight: "100%", letterSpacing: "-0.5px", fontWeight: "700" },
        ],
        "h1-md": [
          "56px",
          { lineHeight: "100%", letterSpacing: "-1px", fontWeight: "700" },
        ],
        "h1-lg": [
          "64px",
          { lineHeight: "100%", letterSpacing: "-1px", fontWeight: "700" },
        ],
        "h1-xl": [
          "80px",
          { lineHeight: "100%", letterSpacing: "-1.5px", fontWeight: "700" },
        ],
        "h1-2xl": [
          "80px",
          { lineHeight: "100%", letterSpacing: "-1.5px", fontWeight: "700" },
        ],
        h2: [
          "24px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "700" },
        ],
        "h2-sm": [
          "28px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "700" },
        ],
        "h2-md": [
          "32px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "700" },
        ],
        "h2-lg": [
          "36px",
          { lineHeight: "120%", letterSpacing: "-1px", fontWeight: "700" },
        ],
        "h2-xl": [
          "42px",
          { lineHeight: "120%", letterSpacing: "-1.5px", fontWeight: "700" },
        ],
        "h2-2xl": [
          "48px",
          { lineHeight: "120%", letterSpacing: "-1.5px", fontWeight: "700" },
        ],
        h3: [
          "18px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "700" },
        ],
        "h3-sm": [
          "20px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "700" },
        ],
        "h3-md": [
          "22px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "700" },
        ],
        "h3-lg": [
          "24px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "700" },
        ],
        "h3-xl": [
          "28px",
          { lineHeight: "120%", letterSpacing: "-1px", fontWeight: "700" },
        ],
        "h3-2xl": [
          "32px",
          { lineHeight: "120%", letterSpacing: "-1px", fontWeight: "700" },
        ],
        h4: [
          "16px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "600" },
        ],
        "h4-sm": [
          "17px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "600" },
        ],
        "h4-md": [
          "18px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "600" },
        ],
        "h4-lg": [
          "20px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "600" },
        ],
        "h4-xl": [
          "21.5px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "600" },
        ],
        "h4-2xl": [
          "22.857px",
          { lineHeight: "120%", letterSpacing: "-0.5px", fontWeight: "600" },
        ],
        p: ["14px", { lineHeight: "160%", fontWeight: "400" }],
        "p-sm": ["14px", { lineHeight: "160%", fontWeight: "400" }],
        "p-md": ["16px", { lineHeight: "160%", fontWeight: "400" }],
        "p-lg": ["16px", { lineHeight: "160%", fontWeight: "400" }],
        "p-xl": ["17px", { lineHeight: "160%", fontWeight: "400" }],
        "p-2xl": ["18px", { lineHeight: "160%", fontWeight: "400" }],
        "p-nav": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-nav-sm": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-nav-md": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-nav-lg": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-nav-xl": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-nav-2xl": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "p-contact": [
          "22px",
          { lineHeight: "125%", letterSpacing: "-0.4px", fontWeight: "500" },
        ],
        "p-contact-sm": [
          "24px",
          { lineHeight: "125%", letterSpacing: "-0.44px", fontWeight: "500" },
        ],
        "p-contact-md": [
          "26px",
          { lineHeight: "125%", letterSpacing: "-0.52px", fontWeight: "500" },
        ],
        "p-contact-lg": [
          "32px",
          { lineHeight: "125%", letterSpacing: "-0.64px", fontWeight: "500" },
        ],
        "p-contact-xl": [
          "32px",
          { lineHeight: "125%", letterSpacing: "-0.64px", fontWeight: "500" },
        ],
        "p-contact-2xl": [
          "32px",
          { lineHeight: "125%", letterSpacing: "-0.64px", fontWeight: "500" },
        ],
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        global: "8px",
        "global-sm": "8px",
        "global-md": "8px",
        "global-lg": "8px",
        "global-xl": "8px",
        "global-2xl": "8px",
      },
      spacing: {
        global: "3.5rem",
        "global-sm": "3.5rem",
        "global-md": "5rem",
        "global-lg": "6rem",
        "global-xl": "6rem",
        "global-2xl": "6rem",
      },
    },
  },
};

export default config;
