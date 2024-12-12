import js from "@eslint/js";
import * as tslint from "typescript-eslint";

export default [
  js.configs.recommended,
  tslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "off",
      'no-useless-controller': 'off',
    }
  }
];