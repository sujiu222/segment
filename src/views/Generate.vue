<template>
  <div
    style="
      margin-top: 60px;
      width: calc(100vw);
      height: calc(100vh - 60px);
      overflow: hidden;
    "
  >
    <el-card
      class="left-card"
      body-style="display: flex;flex-direction: column;height:100%;"
    >
      <!-- <h2 style="text-align: center; margin-bottom: 15px">请上传图片</h2>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="handlechange"
      >
        
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload> -->
      <h2>Tools</h2>
      <el-card
        class="Upload-card"
        body-style="width:100%;display: flex
;
    justify-content: space-between;"
      >
        <div class="imgAndText" @click="openFileInput">
          <img src="../assets/tupian.svg" style="width: 35px" alt="" />
          <input
            type="file"
            ref="uploadInput"
            style="display: none"
            @change="handleFileChange"
          />
          <span>Upload</span>
        </div>
        <div class="imgAndText" @click="GenerateImg">
          <img src="../assets/大数据处理.svg" style="width: 35px" alt="" />
          <span>Generate</span>
        </div>
      </el-card>

      <div
        style="
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        id="inputImgDiv"
      ></div>
    </el-card>
    <div class="image">
      <img :src="resultUrl" alt="" />
    </div>

    <el-dialog
      v-model="isUploading"
      title="Extracting an embedding for the image..."
      width="400px"
      :close-on-click-modal="false"
      :show-close="false"
      align-center
      class="upload-dialog"
    >
      <div style="text-align: center">
        <img :src="uploadIcon" style="width: 50px; margin-bottom: 15px" />
        <el-progress :percentage="progress" :show-text="false"></el-progress>
        <p style="margin-top: 10px">Extracting an embedding for the image...</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isUploading = ref(false); //控制加载栏
const progress = ref(0); //加载百分比
const imageUrl = ref("");
const resultUrl = ref("");
const uploadInput = ref(null);

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    console.log("选择的文件:", files[0]);
    const file = new FileReader();
    file.readAsDataURL(files[0]);
    file.onload = () => {
      imageUrl.value = file.result;
      console.log(imageUrl.value);
      const img = document.createElement("img");
      img.src = imageUrl.value;
      img.style.width = "100%";
      document.querySelector("#inputImgDiv").appendChild(img);
    };
  }
};
const openFileInput = () => {
  uploadInput.value.click();
  console.log("uploadInput.value.click();");
};
const GenerateImg = () => {
  isUploading.value = true;
  var timer = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(timer);
      isUploading.value = false;
      resultUrl.value = "/generate/generate1.png";
    } else {
      progress.value += 10;
    }
  }, 500);
};
</script>

<style lang="scss" scoped>
.Upload-card {
  width: 100%;
  display: flex;
  // flex-direction: row;
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
  min-height: 600px;
  height: 600px;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 1%;
  transform: translate(0, -50%);
  // display: flex;
  .imgAndText {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.image {
  position: absolute;
  left: calc(1% + 300px + 1vw);
  right: 0vw;
  top: calc(60px + 20px);
  bottom: 20px;
  // background: #000;
  // height: calc(100vh - 60px);
  // width: calc(100vw - 240px - 16.5vw - 2vw);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>
