// frontend/eslint.config.mjs
import next from "eslint-config-next";

export default [
  {
    ignores: ["node_modules", ".next"], // ignore les dossiers inutiles
  },
  ...next,
];