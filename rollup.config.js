import { eslint } from "rollup-plugin-eslint";
import uglify from "rollup-plugin-uglify";
import typescript from "rollup-plugin-typescript";

const env = process.env.NODE_ENV;
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    eslint({
      throwOnError: true,
      exclude: ["node_modules/**", "lib/**", "*.js"],
    }),
    typescript(),
    env == "production" && uglify.uglify(),
  ],
};
