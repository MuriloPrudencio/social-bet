import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#32f253",
          foreground: "#021006"
        },
        gold: "#ffc83d",
        violetGlow: "#a855f7",
        panel: "rgba(7, 15, 24, 0.74)"
      },
      boxShadow: {
        neon: "0 0 28px rgba(50, 242, 83, 0.28)",
        violet: "0 0 34px rgba(168, 85, 247, 0.34)",
        gold: "0 0 30px rgba(255, 200, 61, 0.28)"
      },
      backgroundImage: {
        "betsocial-radial":
          "radial-gradient(circle at 16% 10%, rgba(50,242,83,.16), transparent 24%), radial-gradient(circle at 80% 0%, rgba(168,85,247,.16), transparent 28%), linear-gradient(135deg, #020606 0%, #07101a 46%, #030409 100%)"
      }
    }
  },
  plugins: [animate]
};

export default config;
