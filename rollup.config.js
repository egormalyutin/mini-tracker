import ts from "@wessberg/rollup-plugin-ts"
import gcc from "@ampproject/rollup-plugin-closure-compiler"

export default {
    input: "src/index.ts",
    output: {
        file: "dist/bundle.js",
        format: "iife"
    },
    plugins: [
        ts({ transpiler: "babel" }),
        gcc({ compilation_level: "ADVANCED_OPTIMIZATIONS" })
    ]
}
