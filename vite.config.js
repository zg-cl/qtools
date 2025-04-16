import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 添加构建选项
  build: {
    // 控制vite构建的输出文件的命名和目录结构。如果不配置，构建的css、js、图片等资源都会放在同一个文件夹下面，配了的话，就会分类存放（js文件在js文件夹下面）
    rollupOptions: {
      output: {
        // 代码拆分时创建的文件命名规则
        chunkFileNames: "assets/js/[name]-[hash].js",
        // 构建包里面入口文件创建的命名规则
        entryFileNames: "assets/js/[name]-[hash].js",
        // 静态资源文件的命名规则 [ext]代表文件扩展名
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
