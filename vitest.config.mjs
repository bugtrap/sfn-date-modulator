import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [],
    test: {
        globals: false,
        reporters: ["default", "junit"],
        outputFile: {
            junit: "test-reports/junit.xml",
        },
        coverage: {
            enabled: true,
            all: true,
        },
        environment: "node",
        include: ["src/**/*.{test,spec}.ts"],
    },
});
