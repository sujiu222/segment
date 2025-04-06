<template>
  <div class="box">
    <div class="left">
      <el-card class="left-card">
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
            <div class="upload_img" id="img_back" @click="router.push('/demo')">
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
        <el-card class="three_img_card">
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
                @click="iszoom = !iszoom"
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
                class="act-Detect"
                @click="Detech"
              />
              <img
                src="../assets/分割.svg"
                alt=""
                style="width: 35px; margin-right: 5%"
                @click="() => Segment()"
              />
            </div>
            <div class="three_img">
              <p>magnify</p>
              <!-- <el-card id="Classify_box" style="display: none">
                <div>
                  <p>Model1</p>
                  <p>Model2</p>
                  <p>Model3</p>
                </div>
              </el-card> -->
              <p>Detect</p>
              <p>Segment</p>
            </div>
            <div
              class="three_img"
              style="
                margin-top: 10px;
                background: #edeef1;
                border-radius: 8px;
                box-sizing: border-box;
                padding: 10px;
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
                background: #edeef1;
                border-radius: 8px;
                box-sizing: border-box;
                padding: 10px;
                justify-content: start;
              "
              @click="() => cutOutObject()"
            >
              <img src="../assets/器械.svg" style="width: 25px" alt="" />
              <p>Cut out object</p>
            </div>
          </div>
        </el-card>
        <el-card>
          <div
            class="upload_img"
            @click="toggleDrawingMode"
            @dblclick="clearDrawings"
            :class="{ active: isDrawingMode }"
          >
            <img
              src="../assets/教学教育.svg"
              style="width: 35px; margin-right: 5%"
              alt=""
            />
            <b>Teaching (单击切换/双击清除)</b>
          </div>
        </el-card>
        <el-card>
          <div class="upload_img" @click="captureScreenshot">
            <img
              src="../assets/剪切.svg"
              style="width: 35px; margin-right: 5%"
              alt=""
            />
            <b>Cut-Outs</b>
          </div>
        </el-card>
      </el-card>
    </div>
    <div class="center">
      <canvas id="canvas" style="width: 100%"></canvas>
    </div>
    <div class="right">
      <el-card style="height: 100%" id="right">
        <div
          style="
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          "
        >
          <span>矿层复合率:</span>
          <span>6.703004190799626:</span>
          <span>岩层丰富度:</span>
          <span>2.2958106994628906:</span>
        </div>
        <div
          id="Classify_box"
          style="position: absolute; left: 0; right: 0; top: 50%; bottom: 0"
        ></div>
      </el-card>
    </div>
  </div>
  <input
    type="file"
    ref="fileInput"
    @change="handleFileChange"
    accept="image/*"
    style="display: none"
  />
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
</template>

<script setup>
import { postImg, getIdImage } from "@/api";
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
// 图片预览路径
// 新增响应式状态
let iszoom = false;
const viewState = reactive({
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  isZoomed: false,
});
const img_Detech = ref(new Image());

const drawingState = reactive({
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  brushSize: 3,
  brushColor: "#ff0000",
  tempCanvas: null,
});
const Model_box = (e) => {
  const cilentX = e.clientX;
  const cilentY = e.clientY;
  const box = document.getElementById("Classify_box");
  if (box.style.display == "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
    box.style.position = "absolute";
    box.style.left = cilentX + "px";
    box.style.top = cilentY + 10 + "px";
  }
};
onMounted(() => {
  let index = useRoute().query.index;
  if (index) {
    // index =
    //   index === "001" ? "../../public/ori/001.png" : "../../public/ori/002.png";
    const img = new Image();
    img.src = `/ori/${index}.jpg`;
    img.onload = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      isUploading.value = true;
      progress.value = 0;
      const interval = setInterval(async () => {
        if (progress.value >= 100) {
          clearInterval(interval);
          isUploading.value = false;
          img.src = `/detect/${index}.jpg`;
          previewImage.value = `/detect/${index}.jpg`;
          img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
          };
        } else {
          progress.value += 10;
        }
      }, 300);
    };
  }
});

let index;
onMounted(() => {
  index = useRoute().query.index;
});
const isCutOutObject = ref(false);
const cutOutObject = () => {
  // console.log(isCutOutObject.value);

  if (isCutOutObject.value) {
    isCutOutObject.value = false;
    // const div = document.querySelector(".right .el-card__body");
    // div.removeChild(div.lastChild);
    img_Detech.value.src = "";
    Detech();
  } else {
    const imgCut = new Image();
    imgCut.src = `/curimg/${index}.jpg`;
    previewImage.value = imgCut.src;
    console.log(imgCut);
    imgCut.onload = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imgCut.width;
      canvas.height = imgCut.height;
      ctx.drawImage(imgCut, 0, 0, imgCut.width, imgCut.height);
    };

    const img = new Image();
    isCutOutObject.value = true;

    // img.src = `/cut/${index}.png`;
    // const div = document.querySelector(".right .el-card__body");

    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    // img.onload = () => {
    //   div.appendChild(canvas);
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0, img.width, img.height);
    // };
  }
};

const Segment = () => {
  const img = new Image();
  img.src = `/segement/${index}.png`;
  previewImage.value = img.src;
  img_Detech.value.src = "";

  img.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };
};

const Detech = () => {
  img_Detech.value.src = img_Detech.value.src.endsWith(`/ori/${index}.jpg`)
    ? `/detect/${index}.jpg`
    : `/ori/${index}.jpg`;
  previewImage.value = img_Detech.value.src;
  // console.log(123213, img.src.endsWith(`/ori/${index}.jpg`), img.src);

  img_Detech.value.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img_Detech.value.width;
    canvas.height = img_Detech.value.height;
    ctx.drawImage(
      img_Detech.value,
      0,
      0,
      img_Detech.value.width,
      img_Detech.value.height
    );
  };
};

onMounted(() => {
  const img = document.querySelectorAll("img");
  img.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
});
const img = new Image();

const isUploading = ref(false);
const progress = ref(0);

onMounted(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  function drawImage() {
    const image = new Image();
    image.src = previewImage.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save(); // 保存当前上下文状态
    ctx.translate(offsetX, offsetY); // 设置偏移量
    ctx.scale(scale, scale); // 放大或缩小
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.restore(); // 恢复之前状态
  }
  // 初始缩放比例和位置
  let scale = 1; // 初始缩放比例
  let isZoomed = false; // 记录是否放大
  let offsetX = 0,
    offsetY = 0;

  canvas.addEventListener("click", function (event) {
    if (iszoom) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const zoomFactor = 1.5; // 放大倍数

      if (!isZoomed) {
        // 放大
        scale = zoomFactor;
        offsetX = mouseX - mouseX * zoomFactor;
        offsetY = mouseY - mouseY * zoomFactor;
      } else {
        // 缩回原始大小
        scale = 1;
        offsetX = 0;
        offsetY = 0;
      }

      isZoomed = !isZoomed; // 切换状态
      drawImage(); // 重新绘制图像
    }
  });
});

const canvasState = reactive({
  baseImage: null, // 保存原始图像
  isDrawingMode: false,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
});

// 坐标转换函数（关键修正）
const getCanvasCoordinates = (clientX, clientY) => {
  const canvas = document.getElementById("canvas");
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left - canvasState.offsetX) / canvasState.scale,
    y: (clientY - rect.top - canvasState.offsetY) / canvasState.scale,
  };
};

const txt = [
  ["矿层复合率: 6.703004190799626", "岩层丰富度: 2.2958106994628906"],
  ["矿层复合率: 6.703004190799626", "岩层丰富度: 2.2958106994628906"],
  ["矿层复合率: 6.703004190799626", "岩层丰富度: 2.2958106994628906"],
  ["矿层复合率: 6.703004190799626", "岩层丰富度: 2.2958106994628906"],
];

// 切换绘图模式
const toggleDrawingMode = () => {
  canvasState.isDrawingMode = !canvasState.isDrawingMode;
  const canvas = document.getElementById("canvas");

  if (canvasState.isDrawingMode) {
    // 进入绘图模式
    canvas.style.cursor = "crosshair";

    // 保存基础图像
    canvasState.baseImage = new Image();
    canvasState.baseImage.src = previewImage.value;

    // 绑定事件
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);
  } else {
    // 退出绘图模式
    canvas.style.cursor = "default";

    // 解绑事件
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", endDrawing);
  }
};

// 双击清除绘制
const clearDrawings = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // 重绘基础图像
  if (canvasState.baseImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasState.baseImage, 0, 0);
  }
};

// 绘图逻辑
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const startDrawing = (e) => {
  const coords = getCanvasCoordinates(e.clientX, e.clientY);
  isDrawing = true;
  [lastX, lastY] = [coords.x, coords.y];
};

const draw = (e) => {
  if (!isDrawing) return;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const coords = getCanvasCoordinates(e.clientX, e.clientY);

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(coords.x, coords.y);
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.stroke();
  [lastX, lastY] = [coords.x, coords.y];
};

const endDrawing = () => {
  isDrawing = false;
};

const isCaptureScreenshot = ref(false);

// 截图功能
const captureScreenshot = () => {
  if (isCaptureScreenshot.value) {
    const div = document.querySelector("#Classify_box");
    div.removeChild(div.lastChild);
    isCaptureScreenshot.value = false;
  } else {
    isCaptureScreenshot.value = true;
    const img = new Image();
    img.src = `/cut/${index}.png`;
    const div = document.querySelector("#Classify_box");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.addEventListener("click", () => {
      previewImage.value = img.src;
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    });

    img.onload = () => {
      div.appendChild(canvas);
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }

  // const canvas = document.getElementById("canvas");

  // // 创建临时链接
  // const link = document.createElement("a");
  // link.download = `capture_${Date.now()}.png`;
  // link.href = canvas.toDataURL();

  // // 触发下载
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
};
const router = useRouter();
const previewImage = ref("");
const img_Upload = ref("");
const pid = ref("");

// 引用隐藏的文件上传 input
const fileInput = ref(null);

// 绘制函数

// 点击图片触发 input 的点击事件
const triggerUpload = () => {
  fileInput.value.click();
};

// 处理文件上传和预览
const handleFileChange = async (event) => {
  const file = event.target.files[0];

  //   pid.value = postImg(file);
  pid.value = file.name;
  //   console.log(newfile);

  if (file) {
    // const blob = await getIdImage(pid.value === "001.png" ? 1 : 2);
    // console.log(blob);

    isUploading.value = true;
    progress.value = 0;
    const reader = new FileReader();
    // 读取文件并生成预览 URL
    reader.onload = (e) => {
      previewImage.value = e.target.result; // 将预览的URL赋值给图片
      img.src = previewImage.value;
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      const interval = setInterval(async () => {
        if (progress.value >= 100) {
          clearInterval(interval);
          isUploading.value = false;
          if (pid.value === "001.png") {
            img.src = "../../public/001.png";
            previewImage.value = "../../public/001.png";
          } else {
            img.src = "../../public/002.png";
            previewImage.value = "../../public/002.png";
          }
          img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
          };
        } else {
          progress.value += 10;
        }
      }, 300);
    };
    console.log(file);

    reader.readAsDataURL(file);
  }
};
</script>

<style lang="scss" scoped>
.upload_img.active {
  background: #f0f2f5;
  border-radius: 8px;
}
.el-progress {
  margin-top: 10px;
}
.upload-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
#img_Upload:active {
  color: transparent;
}
#img_back:active {
  color: transparent;
}
.act-Detect:active {
  background: #000;
}
.three_img {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-card {
    position: absolute;
  }
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
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    canvas {
      max-width: 100%;
      position: absolute;
    }
  }
}

.upload_img:active {
  background: #f0f2f5;
  border-radius: 8px;
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
#right {
  canvas {
    position: relative;
    z-index: 100;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
