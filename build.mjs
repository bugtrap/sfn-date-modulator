import esbuild from "esbuild";

esbuild.buildSync({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: ["node18"],
    outdir: "dist",
    sourcemap: true,
});
