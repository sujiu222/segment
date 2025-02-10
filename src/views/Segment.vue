<template>
    <div style="margin-top: 60px; width: calc(100vw); height: calc(100vh - 60px); overflow: hidden">
        <el-card class="left-card" style="max-width: 1080px">
            <!-- <h2 style="text-align: center; margin-bottom: 15px">请上传图片</h2>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="handlechange"
      >
        
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload> -->
            <h2>Tools</h2>
            <el-card class="Upload-card"
                ><div class="upload_img">
                    <img src="../assets/tupian.svg" style="width: 35px" alt="" />
                    Upload
                </div>
                <div class="Gallery">
                    <img src="../assets/24gl-photoAlbum2.svg" style="width: 35px" alt="" />
                    Gallery
                </div></el-card
            >
        </el-card>
        <div class="image">
            <img v-if="imageUrl" :src="imageUrl" alt="" />
        </div>
        <div class="right">
            <el-card>图表</el-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { Plus } from "@element-plus/icons-vue"

const imageUrl = ref("")

const handlechange = (file) => {
    imageUrl.value = URL.createObjectURL(file.raw)
}
</script>

<style lang="scss" scoped>
.Upload-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
// .el-card {
//   border-radius: 10%;
// }
.right {
    position: absolute;
    left: (100vw - 16.5vw);
    top: 50vh;
    // background: #000;
    transform: translate(0, -50%);
    display: flex;
    .el-card {
        height: 600px;
        width: 15vw;
    }
}
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
.left-card {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(0, -50%);
}
.image {
    position: absolute;
    left: calc(1% + 220px + 1vw);
    right: 16.5vw;
    // background: #000;
    height: calc(100vh - 60px);
    width: calc(100vw - 240px - 16.5vw - 2vw);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        max-height: calc(100vh - 60px);
        // max-width: calc(100vw - 240px - 16.5vw);
        max-width: 100%;
    }
}
</style>
