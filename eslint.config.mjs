import js from "@eslint/js";
import jasmine from "jasmine";
import globals from "globals"

export default [js.configs.recommended,
{
    files: ["**/*.spec.js", "**/*.js"],
    plugins: {
       "jasmine" : {jasmine}
    },
    languageOptions: {
        sourceType: "commonjs",
       
        globals: {
            ...globals.browser,
            ...globals.jquery,
            ...globals.node,
            ...globals.jasmine
          },
    },
    rules: {
        semi: "error",
        "prefer-const": "error"
    },
},
];