import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"; //to under stand vue
import dts from "vite-plugin-dts"; //bundle the decelerations and merge types in single file and its info and the IntelliSense
import path from "path";

const reporterSet: string[] = ["verbose", "html"]; //fix the reporters in a variable (Array)

export default defineConfig({
  plugins: [vue(), dts({ include: "src" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@root": path.relative(__dirname, "./"),
    },
  },
  test: {
    coverage: {
      reporter: ["text", "html"],
      enabled: true,
    },
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{coca,test,spec}.ts"],
    // setupFiles: [ "@app/../src/__tests__/fullName.spec.ts"],
    css: true,
    testTimeout: 3000,
    reporters: reporterSet, // ['tap'] ['dot'] ['json'] ['junit'] ['default']['verbose']
  },
});

/*
Name  ............................	Description / behavior
-----------------------------------------------------------------------
default	............................	The standard output, summary + statuses etc. 

basic	  ............................	Like default but without a summary. 

verbose	  ............................	Like default + more detail (shows each individual test, slow test warnings, etc.) 

dot	  ............................	Minimal output: shows a dot for each test, details only for failed ones. 

json	  ............................	Outputs result in JSON format. Good for CI or tools that parse JSON. 

junit	  ............................	Outputs in JUnit format (XML); useful for CI integrations. 

tap	  ............................	TAP format (Test Anything Protocol). 

tapFlat	  ............................	A flatter version of TAP (less nested/test‐module grouping) 

HangingProcessReporter	  ............................	A reporter that helps detect (or report) when test processes hang.
*/
