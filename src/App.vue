<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/" style="font-size: 1em">Home</el-menu-item>
        <el-menu-item index="/segment" style="font-size: 1em">Classify</el-menu-item>
        <el-menu-item index="/demo" style="font-size: 1em">Demo</el-menu-item>
        <el-menu-item index="/dataset" style="font-size: 1em">Dataset</el-menu-item>
        <el-menu-item index="/blog" style="font-size: 1em">Blog</el-menu-item>
        <el-menu-item index="/paper" style="font-size: 1em">Paper</el-menu-item>
        <a href="https://github.com/ai4geology/CamNet" style="display: flex; align-items: center; margin-right: 20px; margin-left: 20px"><img src="/Github.svg" alt="" /></a>
    </el-menu>
    <RouterView />
</template>
<script setup>
import { ref } from "vue"
const activeIndex = ref("/")
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
        margin-right: 5px;
    }
}
</style>
