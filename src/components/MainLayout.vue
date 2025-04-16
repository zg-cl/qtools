<template>
  <div class="main-layout">
    <aside class="sidebar">
      <div class="logo">
        <h1>QTools</h1>
      </div>
      <nav class="nav-menu">
        <router-link v-for="tool in tools" :key="tool.path" :to="tool.path" class="nav-item">
          <Icon :icon="tool.icon" class="nav-icon" />
          <span>{{ tool.name }}</span>
        </router-link>
      </nav>
    </aside>
    <main class="main-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const tools = [
  // { name: "JSON格式化基础版", path: "/jsonbase", icon: "mdi:code-json" },
  { name: "JSON格式化", path: "/json", icon: "mdi:code-json" },
  { name: "URL编解码", path: "/url", icon: "mdi:web" },
  { name: "图片压缩", path: "/image", icon: "mdi:image" },
  { name: '图片取色', path: '/color', icon: 'mdi:eyedropper' },
  // { name: "SM2加解密", path: "/sm2", icon: "mdi:lock" },
  // { name: '证书校验', path: '/ssl', icon: 'mdi:certificate' }
];
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  width: 100%;
  min-width: 0;
  /* 允许flex子项缩小到比内容更小 */
}

.sidebar {
  width: 220px;
  background: #304156;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
  min-width: 0;
  /* 允许内容自动换行 */
  overflow-x: hidden;
  /* 防止水平滚动 */
}

.content-wrapper {
  flex: 1;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 24px;
  box-sizing: border-box;
  min-width: 0;
  /* 允许内容自动换行 */
  word-wrap: break-word;
  /* 允许长单词换行 */
  overflow-wrap: break-word;
  /* 现代浏览器中使用 */
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #1f2d3d;
}

.logo h1 {
  color: #fff;
  font-size: 18px;
  margin: 0;
  font-weight: 600;
}

.nav-menu {
  padding: 16px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  box-sizing: border-box;
  color: #bfcbd9;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #409eff;
  background: #263445;
}

.nav-icon {
  font-size: 18px;
  margin-right: 12px;
}
</style>
