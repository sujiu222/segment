<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="segment">分割</el-menu-item>
  </el-menu>
  <RouterView />
</template>
<script setup>
import { ref } from "vue";
const activeIndex = ref("/");
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
<style scoped>
.el-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: white;
  z-index: 999;
  display: flex;
  justify-content: end;
  .el-menu-item {
    margin-right: 40px;
  }
}
</style>
