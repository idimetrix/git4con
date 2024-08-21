import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"], // Adjust the entry point as per your project structure
    format: ["cjs", "esm"], // Output format (CommonJS and ES Modules)
    sourcemap: true, // Include sourcemaps for easier debugging
    clean: true, // Clean the output directory before each build
    splitting: false, // Disable code splitting if not needed
    dts: false, // Skip generating .d.ts files if not needed
    watch: false, // Enable watch mode for development
});