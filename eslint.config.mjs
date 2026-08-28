import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([{
    extends: [...nextCoreWebVitals],

    settings: {
        next: {
            rootDir: ".",
        },
    },

    rules: {
        "react/no-unescaped-entities": "off",
        // React Compiler rules — downgrade to warn until fully migrated
        "react-hooks/set-state-in-effect": "warn",
        "react-hooks/immutability": "warn",
        "react-hooks/purity": "warn",
        "react-hooks/static-components": "warn",
    },
}]);