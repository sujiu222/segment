<template>
    <div class="box">
        <div class="left">
            <el-card class="left-card" style="height: 100%">
                <h2>Tools</h2>
                <el-card>
                    <div style="display: flex; font-size: 1rem; justify-content: space-between; width: 100%">
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
                        <img src="../assets/大数据处理.svg" style="width: 35px; margin-right: 5%" alt="" />
                        <b>Model</b>
                    </div>
                </el-card>
                <el-card style="height: 250px" class="three_img_card">
                    <div class="upload_img">
                        <img src="../assets/tupianfeilei.svg" style="width: 35px; margin-right: 5%" alt="" />
                        <b>Pane</b>
                    </div>
                    <p style="font-size: 0.7rem">Choose a model that meets your task requirements.</p>
                    <div style="flex: 1; margin-top: 5px">
                        <div class="three_img">
                            <img src="../assets/图片识别.svg" alt="" style="width: 35px; margin-right: 5%" @click="Model_box" />
                            <img
                                src="../assets/视野分析.svg"
                                alt=""
                                style="width: 30px; margin-right: 5%; filter: invert(10%) sepia(3%) saturate(4467%) hue-rotate(150deg) brightness(16%) contrast(94%)"
                            />
                            <img src="../assets/分割.svg" alt="" style="width: 35px; margin-right: 5%" />
                        </div>
                        <div class="three_img">
                            <p>Classify</p>
                            <el-card id="Classify_box" style="display: none">
                                <div>
                                    <p>Model1</p>
                                    <p>Model2</p>
                                    <p>Model3</p>
                                </div>
                            </el-card>
                            <p>Detect</p>
                            <p>Segment</p>
                        </div>
                        <div class="three_img" style="margin-top: 10px; background: #f0f8ff; border-radius: 5%; box-sizing: border-box; padding: 5px">
                            <p>Data</p>
                            <p>Analysis</p>
                            <p>Charts</p>
                        </div>
                        <div class="three_img" style="margin-top: 10px; background: #f0f8ff; border-radius: 5%; box-sizing: border-box; padding: 5px; justify-content: start">
                            <img src="../assets/器械.svg" style="width: 25px" alt="" />
                            <p>Cut out object</p>
                        </div>
                    </div>
                </el-card>
                <el-card>
                    <div class="upload_img">
                        <img src="../assets/教学教育.svg" style="width: 35px; margin-right: 5%" alt="" />
                        <b>Teaching </b>
                    </div>
                </el-card>
                <el-card>
                    <div class="upload_img">
                        <img src="../assets/剪切.svg" style="width: 35px; margin-right: 5%" alt="" />
                        <b>Cut-Outs </b>
                    </div>
                </el-card>
            </el-card>
        </div>
        <div class="center">
            <canvas id="canvas" style="width: 100%"></canvas>
        </div>
        <div class="right">
            <el-card style="height: 100%">图表</el-card>
        </div>
    </div>
    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none" />
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
// 图片预览路径

const Model_box = (e) => {
    const cilentX = e.clientX
    const cilentY = e.clientY
    const box = document.getElementById("Classify_box")
    if (box.style.display == "block") {
        box.style.display = "none"
    } else {
        box.style.display = "block"
        box.style.position = "absolute"
        box.style.left = cilentX + "px"
        box.style.top = cilentY + 10 + "px"
    }
}
onMounted(() => {
    const img = document.querySelectorAll("img")
    img.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault()
        })
    })
})
const img = new Image()
onMounted(() => {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    function drawImage() {
        const image = new Image()
        image.src = previewImage.value
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save() // 保存当前上下文状态
        ctx.translate(offsetX, offsetY) // 设置偏移量
        ctx.scale(scale, scale) // 放大或缩小
        ctx.drawImage(image, 0, 0, image.width, image.height)
        ctx.restore() // 恢复之前状态
    }
    // 初始缩放比例和位置
    let scale = 1 // 初始缩放比例
    let isZoomed = false // 记录是否放大
    let offsetX = 0,
        offsetY = 0

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        const zoomFactor = 1.5 // 放大倍数

        if (!isZoomed) {
            // 放大
            scale = zoomFactor
            offsetX = mouseX - mouseX * zoomFactor
            offsetY = mouseY - mouseY * zoomFactor
        } else {
            // 缩回原始大小
            scale = 1
            offsetX = 0
            offsetY = 0
        }

        isZoomed = !isZoomed // 切换状态
        drawImage() // 重新绘制图像
    })
})

const router = useRouter()
const previewImage = ref("")
const img_Upload = ref("")
// 引用隐藏的文件上传 input
const fileInput = ref(null)

// 绘制函数

// 点击图片触发 input 的点击事件
const triggerUpload = () => {
    fileInput.value.click()
}

// 处理文件上传和预览
const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        // 读取文件并生成预览 URL
        reader.onload = (e) => {
            previewImage.value = e.target.result // 将预览的URL赋值给图片
            img.src = previewImage.value
            const canvas = document.getElementById("canvas")
            const ctx = canvas.getContext("2d")
            img.onload = function () {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0, img.width, img.height)
            }
        }
        reader.readAsDataURL(file)
    }
}
</script>

<style lang="scss" scoped>
#img_Upload:active {
    color: transparent;
}
#img_back:active {
    color: transparent;
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
