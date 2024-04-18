
import path from 'path';
import framework7 from 'rollup-plugin-framework7';


const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);
const HOST = process.env.MONACA_SERVER_HOST || '0.0.0.0';
export default async () => {

  return  {
    plugins: [
      framework7({ emitCss: false }),

    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      target: ['es2017'], // support Moncaca Localkit (older browsers)
      assetsInlineLimit: 0,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      },
      cssMinify: false, // support Moncaca Localkit (older browsers)
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      host: HOST,
      port: 8080,
    },
    esbuild: {
      jsxFactory: '$jsx',
      jsxFragment: '"Fragment"',
    },
  };
}
