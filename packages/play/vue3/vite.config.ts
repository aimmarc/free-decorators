import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Swc from "unplugin-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      babelPlugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        [
          "@babel/plugin-transform-class-properties",
          {
            loose: true,
          },
        ],
      ],
    }),
    Swc.vite({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          decorators: true,
        },
        transform: {
          react: {
            runtime: "automatic",
            pragma: "h",
            pragmaFrag: "Fragment",
          },
        },
        loose: true, // 开启这个属性保证属性装饰器正常使用
      },
    }),
  ],
});
