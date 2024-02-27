import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export const plugins = [
    peerDepsExternal(), // Add the externals for me. [react, react-dom, styled-components]
    nodeResolve(), // Locates modules in the project's node_modules directory
    commonjs(), // converts CommonJS to ES6 modules
    typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
            // Override base tsconfig.json during build
            exclude: [
                "tests",
                "**/stories/**",
                "**/__mocks__/**",
                "**/custom-types/mdx.d.ts",
                "**/custom-types/svg.d.ts",
            ],
        },
    }),
    postcss({
        extract: true,
        modules: false,
        plugins: [require("postcss-import")],
    }),
    image(),
    json(),
    terser(), // Helps remove comments, whitespace or logging codes
];

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.module,
                format: "esm",
                sourcemap: true,
                exports: "named",
                interop: "compat",
            },
            {
                file: pkg.main,
                format: "cjs",
                sourcemap: true,
                exports: "named",
                interop: "compat",
            },
        ],
        plugins,
        external: ["react", "react-dom", "styled-components", "@lifesg/react-design-system", "@lifesg/react-icons"],
    },
];
