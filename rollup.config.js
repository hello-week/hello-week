import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify-es";

const production = process.env.NODE_ENV === "production";

export default {
    input: ["src/scripts/index.ts"],
    output: {
        file: production ? "dist/hello-week.min.js" : "dist/hello-week.js",
        name: "hello-week",
        format: "es",
    },
    plugins: [
        typescript({}),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        json(),
        commonjs(),
        production && uglify(),
    ],
};
