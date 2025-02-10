import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      spacing: {
        // Layout spacing
        "layout-sm": "1rem",    // 16px
        "layout-md": "1.5rem",  // 24px
        "layout-lg": "2rem",    // 32px
        "layout-xl": "2.5rem",  // 40px
        "layout-2xl": "3rem",   // 48px
        "layout-3xl": "4rem",   // 64px
        "layout-4xl": "5rem",   // 80px
        "layout-5xl": "6rem",   // 96px
        
        // Component spacing
        "component-xs": "0.25rem", // 4px
        "component-sm": "0.5rem",  // 8px
        "component-md": "0.75rem", // 12px
        "component-lg": "1rem",    // 16px
        "component-xl": "1.25rem", // 20px
        
        // Section spacing
        "section-sm": "3rem",    // 48px
        "section-md": "4rem",    // 64px
        "section-lg": "6rem",    // 96px
        "section-xl": "8rem",    // 128px
        "section-2xl": "10rem",  // 160px
      },
      maxWidth: {
        "content-sm": "640px",
        "content-md": "768px",
        "content-lg": "1024px",
        "content-xl": "1280px",
        "content-2xl": "1536px",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      fontSize: {
        // Display
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        // Heading
        "heading-xl": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-md": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Body
        "body-xl": ["1.25rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "body-md": ["1rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "body-xs": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0" }],
        // Label
        "label-lg": ["1rem", { lineHeight: "1", letterSpacing: "0.02em" }],
        "label-md": ["0.875rem", { lineHeight: "1", letterSpacing: "0.02em" }],
        "label-sm": ["0.75rem", { lineHeight: "1", letterSpacing: "0.02em" }],
      },
      fontWeight: {
        thin: "100",
        regular: "400",
        medium: "500",
        bold: "700",
      },
      lineHeight: {
        tight: "1.1",
        snug: "1.2",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          pink: "#EE7BB3",
          green: "#6DC4AD",
          blue: "#2D3648",
          navy: "#1B2132",
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827"
          }
        },
        gradient: {
          primary: "linear-gradient(90deg, #EE7BB3 0%, #6DC4AD 100%)",
          secondary: "linear-gradient(90deg, #2D3648 0%, #1B2132 100%)"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "background-position-spin": {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        shimmer: "shimmer 4s infinite",
        backgroundPositionSpin: "background-position-spin 3000ms infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
