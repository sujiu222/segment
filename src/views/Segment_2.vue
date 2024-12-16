<template>
  <div class="box">
    <div class="left">
      <el-card class="left-card" style="height: 100%">
        <h2>Tools</h2>
        <el-card>
          <div
            style="
              display: flex;
              font-size: 1rem;
              justify-content: space-between;
              width: 100%;
            "
          >
            <div class="upload_img" id="img_Upload" @click="triggerUpload">
              <img src="../assets/tupian.svg" style="width: 35px" alt="" />
              Upload
            </div>
            <div class="upload_img" @click="router.push('/demo')">
              <img src="../assets/图片仓库.svg" style="width: 35px" alt="" />
              Gallery
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="upload_img">
            <img
              src="../assets/大数据处理.svg"
              style="width: 35px; margin-right: 5%"
              alt=""
            />
            <b>Model</b>
          </div>
        </el-card>
        <el-card style="height: 250px" class="three_img_card">
          <div class="upload_img">
            <img
              src="../assets/tupianfeilei.svg"
              style="width: 35px; margin-right: 5%"
              alt=""
            />
            <b>Pane</b>
          </div>
          <p style="font-size: 0.7rem">
            Choose a model that meets your task requirements.
          </p>
          <div style="flex: 1; margin-top: 5px">
            <div class="three_img">
              <img
                src="../assets/图片识别.svg"
                alt=""
                style="width: 35px; margin-right: 5%"
              />
              <img
                src="../assets/视野分析.svg"
                alt=""
                style="
                  width: 30px;
                  margin-right: 5%;
                  filter: invert(10%) sepia(3%) saturate(4467%)
                    hue-rotate(150deg) brightness(16%) contrast(94%);
                "
              />
              <img
                src="../assets/分割.svg"
                alt=""
                style="width: 35px; margin-right: 5%"
              />
            </div>
            <div class="three_img">
              <p>Classify</p>
              <p>Detect</p>
              <p>Segment</p>
            </div>
            <div
              class="three_img"
              style="
                margin-top: 10px;
                background: #f0f8ff;
                border-radius: 5%;
                box-sizing: border-box;
                padding: 5px;
              "
            >
              <p>Data</p>
              <p>Analysis</p>
              <p>Charts</p>
            </div>
            <div
              class="three_img"
              style="
                margin-top: 10px;
                background: #f0f8ff;
                border-radius: 5%;
                box-sizing: border-box;
                padding: 5px;
                justify-content: start;
              "
            >
              <img src="../assets/器械.svg" style="width: 25px" alt="" />
              <p>Cut out object</p>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="upload_img">
            <img
              src="../assets/教学教育.svg"
              style="width: 35px; margin-right: 5%"
              alt=""
            />
            <b>Teaching </b>
          </div>
        </el-card>
        <el-card>
          <div class="upload_img">
            <img
              src="../assets/剪切.svg"
              style="width: 35px; margin-right: 5%"
              alt=""
            />
            <b>Cut-Outs </b>
          </div>
        </el-card>
      </el-card>
    </div>
    <div class="center">
      <img v-if="previewImage" :src="previewImage" alt="" />
    </div>
    <div class="right">
      <el-card style="height: 100%">图表</el-card>
    </div>
  </div>
  <input
    type="file"
    ref="fileInput"
    @change="handleFileChange"
    accept="image/*"
    style="display: none"
  />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// 图片预览路径
const router = useRouter();
const previewImage = ref("");
const img_Upload = ref("");
// 引用隐藏的文件上传 input
const fileInput = ref(null);

// 点击图片触发 input 的点击事件
const triggerUpload = () => {
  fileInput.value.click();
};

// 处理文件上传和预览
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    // 读取文件并生成预览 URL
    reader.onload = (e) => {
      previewImage.value = e.target.result; // 将预览的URL赋值给图片
      console.log(previewImage.value);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style lang="scss" scoped>
#img_Upload:active {
  color: transparent;
}
.three_img {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.three_img_card) {
  .el-card__body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
.el-card {
  margin-bottom: 10px;
  border-radius: 10px;
}
:deep(.el-card__body) {
  width: 100%;
}
.upload_img {
  display: flex;
  align-items: center;
}
.box {
  width: 100%;
  display: flex;
  margin-top: 60px;
  max-height: calc(100vh - 60px);
  height: calc(100vh - 60px);
  overflow: hidden;
}

.left {
  width: 300px;
  height: 670px;
  margin: auto 10px;
  // background-color: red;
}
:deep(.right) {
  width: 250px;
  height: 500px;
  margin: auto 10px;
  .el-card__body {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}

.center {
  /* flex属性是flex-grow,flex-shrink,flex-basis的简写，默认值为0 1 auto。后两个属性可选。 */
  flex: 1; /* 放大 */
  height: 100%;
  margin: 10px;
  /*左右margin不会叠加*/
  // background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
