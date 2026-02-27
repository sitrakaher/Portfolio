// frontend/.eslintrc.cjs
module.exports = {
  extends: ["next", "next/core-web-vitals"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      rules: {
        // tes règles custom ici
      },
    },
  ],
  ignorePatterns: ["node_modules/", ".next/"],
};