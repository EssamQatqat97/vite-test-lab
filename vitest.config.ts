import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const reporterSet: string[] = ["verbose", "html"];
console.log(`VITEST used ${reporterSet} as a reporter`);
export default defineConfig({
  plugins: [vue(), dts({ include: "src" })],
  test: {
    coverage: {
      reporter: ["text", "html"],
      enabled: true,
    },
    globals: true,
    environment: "jsdom",
    //include: ["./src/*"], //this will exclude all *.specs.ts and *.test.ts
    //exclude:['./src/_tests_/fileII.test.ts"'],
    //setupFiles: [ "./src/_tests_/fileII.test.ts","./src/external.demo.two.ts","./src/external.demo.one.ts","./src/_tests_/fileI.spec.ts"],
    css: true,
    // testTimeout: 3000,
    reporters: reporterSet, // ['tap'] ['dot'] ['json'] ['junit'] ['default']['verbose']
  },
});
