<template>
  <div style="margin-top: 60px; width: calc(100vw); height: calc(100vh - 60px)">
    <el-card style="max-width: 880px">
      <h2 style="text-align: center; margin-bottom: 15px">请上传图片</h2>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="handlechange"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-card>
    <div class="image">
      <img v-if="imageUrl" :src="imageUrl" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const imageUrl = ref("");

const handlechange = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw);
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.el-card {
  position: absolute;
  top: 50%;
  left: 1%;

  transform: translate(0, -50%);
}
.image {
  position: relative;
  left: calc(1% + 220px);
  // background: #000;
  height: calc(100vh - 60px);
  width: calc(100vw - 240px);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: calc(100vh - 60px);
    max-width: calc(100vw - 240px);
  }
}
</style>
