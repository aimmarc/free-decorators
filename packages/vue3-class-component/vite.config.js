import { resolve } from "path";

export default {
  // 配置选项
  mode: "production",
  resolve: {
    // alias: {
    //     '@': resolve(__dirname, 'src'), // 路径别名
    // },
    extensions: [".js", ".vue", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "Vue3ClassComponent",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      output: {
        exports: "named", //要支持CDN引入必须设置此参数！！！
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //     vue: 'Vue',
        //     'element-plus': 'ElementPlus',
        // },
        // assetFileNames: `designer.style.css`,
      },
      external: [
        "vue",
        "element-plus",
        "uuid",
        "vue-virtual-scroller",
        "qs",
        "dayjs",
        "axios",
        "vue-request",
      ],
    },
    outDir: "lib",
  },
};
