// frontend/eslint.config.mjs
export default {
  root: true,
  files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  extends: ["next", "next/core-web-vitals"],
  rules: {
    // règles custom si besoin
    extends: "next",
  },
};