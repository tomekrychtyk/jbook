import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

let service: esbuild.Service;
const bundler = async (
  rawCode: string | undefined
): Promise<string | undefined> => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "http://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  const result = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};

export default bundler;
