<template>
  <video muted autoplay loop class="header-video">
    <source src="/header.mp4" />
  </video>
  <div class="video-content">
    <h1>
      GeoCamNet: An Extremely Light Carbonate Classification Model Distilled
      from An Extremely Deep ResNet101 Model
    </h1>
    <h3></h3>

    <a href="#">
      <el-button :icon="Search" size="large" circle />
      Try a try</a
    >
  </div>
  <div class="content">
    <div class="container">
      <h1 class="main-title">Introduction</h1>
      <p class="sub-title">
        Our main tasks so far are to train a microscopic carbonate images
        classification model on a extremely large image datasets (Fig. 1). The
        datasets include over 10K+ high-resolution optical images. The images
        are mainly from practical hydrocarbon exploration projects in Sichuan
        basin. The datasets is named as Carbonate-Sichuan-170G from the location
        and volume of the datasets. 22 types of carbonate frameworks are
        carfully divided.
      </p>
    </div>
  </div>
  <div class="three_video">
    <div class="div_video_span">
      <img src="/heatmap.gif" style="width: 600px" alt="" />

      <span>Fig 1. GIF performance of the model</span>
    </div>
  </div>
  <div class="three_video">
    <div class="div_video_span">
      <span style="display: block; width: 800px"
        >After training by a ResNet101 (parameters can be seen in Table 1, net
        framework can be seen in Fig. 2a), the .pth file to extract the
        corresponding heatmaps (CAM) on a lighter datasets, from Qi Z., Hou M.,
        Xu S., et al., A microscopic image dataset of Sinian carbonate from
        Dengying Formation on the northwestern margin of Upper Yangtze. Science
        Data Bank, 2020. (2020-07-31). DOI: 10.11922/sciencedb.j00001.00105.,
        shorten as "MidDynuy". The pre-trained ResNet101 took a role as a
        Teacher Net and distilled a light Student Net in MidDynuy (Fig. 3-4).
        The Student Net was a less than 800k ultra-lightweight model (original
        framework of MobileNetV3-Small can be seen in Fig. 2b; improved
        framework of MobileNetV3-Small can be seen in Fig. 3a; Details of
        improvements are displayed in Fig.3c-d). The 800k ultra-lightweight
        model adapted the MobileNetV3-Small framework.</span
      >
      <img src="/resnet.jpg" style="width: 800px" alt="" />
      <span>Table 1 Parameters of ResNets</span>
    </div>
  </div>
  <div class="three_video">
    <!-- <div class="div_video_span">
      <video muted autoplay loop>
        <source src="/section-1.1a.mp4" />
      </video>
      <span>Prompt it with interactive points and boxes.</span>
    </div>
    <div class="div_video_span">
      <video muted autoplay loop>
        <source src="/section-1.1b.mp4" />
      </video>
      <span>Automatically segment everything in an image. </span>
    </div>
    <div class="div_video_span">
      <video muted autoplay loop>
        <source src="/section-1.1c.mp4" />
      </video>
      <span>Generate multiple valid masks for ambiguous prompts.</span>
    </div> -->

    <div class="div_video_span">
      <img src="/RandM.jpg" alt="" />
      <span style="display: block; width: 650px"
        >Fig 2. Original Model Frameworks of (a) ResNet101 and (b)
        MobileNetV3-Small</span
      >
    </div>

    <div class="div_video_span">
      <img src="/imn.jpg" alt="" />
      <span style="display: block; width: 650px"
        >Fig 3. Frameworks improved MobileNetV3-Small; (a) Total framework; (b)
        Illustration of one bottleneck; (c) Flow of bottlenecks; (d)
        Illustration of the skip; (e) Flow of contran necks</span
      >
    </div>
  </div>

  <div class="three_video">
    <div class="div_video_span">
      <span style="display: block; width: 800px"
        >To investigating the potential deploying scenario, in addition to CAM,
        other image processing such as glcm enhancement was used in the final
        rendering.</span
      >
      <img src="/workflow.jpg" style="width: 800px" alt="" />
      <span>Fig 4. Workflow of this research</span>
    </div>
  </div>

  <div class="three_video">
    <div class="div_video_span">
      <h2>The effect and comparison of generating heatmaps are shown below</h2>
      <span style="display: block; width: 800px; margin-top: 40px"
        >The following shows the original image to CAM heatmap to the GLCM
        enhanced CAM heatmap</span
      >
    </div>
  </div>

  <div class="three_video">
    <div class="div_video_span">
      <img src="/img1.png" style="width: 350px" alt="" />
    </div>
    <div class="div_video_span">
      <img src="/hot1.png" style="width: 350px" alt="" />
    </div>
    <div class="div_video_span">
      <img src="/heat1.png" style="width: 350px" alt="" />
    </div>
  </div>
  <div class="three_video">
    <div class="div_video_span">
      <span style="width: 800px; margin: 40px 0 20px 0; text-align: center"
        >Here are some more examples</span
      >
      <img src="/imgExample.png" style="width: 950px; margin: 0" alt="" />
      <img src="/heatExample.png" style="width: 950px; margin: 0" alt="" />
    </div>
  </div>
  <div class="three_video">
    <div class="div_video_span">
      <span style="width: 800px; margin: 40px 0 20px 0; text-align: center"
        >Here's how to works in camera</span
      >
      <img src="/HeatMap_camera.gif " style="width: 550px; margin: 0" alt="" />
    </div>
  </div>
  <div class="blank"></div>

  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <div class="social-links">
        <a href="#" target="_blank">Twitter</a>
        <a href="#" target="_blank">Facebook</a>
        <a href="#" target="_blank">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.header-video {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  object-fit: cover;
  z-index: -1;
}
.video-content {
  position: absolute;
  top: calc(60px + 50%);
  left: 30%;
  transform: translate(-50%, -50%);
  color: white;
  h1 {
    width: 600px;
    font-size: 50px;
  }
  h3 {
    width: 600px;
    font-size: 20px;
  }
  a {
    color: white;
    font-size: 20px;
    outline: none; /* 去除点击后的边框高亮 */
    box-shadow: none; /* 去除阴影 */
    text-decoration-line: none;
  }
  @media (hover: hover) {
    a:hover {
      background-color: transparent;
    }
  }
}
.content {
  margin-top: calc(100vh + 40px);
  width: 100%;
  box-sizing: border-box;
}
.container {
  text-align: center; /* 使文本居中 */
  margin: 0 auto; /* 居中对齐容器 */
  max-width: 800px; /* 限制容器的最大宽度 */
}

.main-title {
  font-size: 2.5rem; /* 设置主标题的字体大小 */
  font-weight: bold; /* 设置主标题加粗 */
  margin: 20px 0; /* 设置上下间距 */
}

.sub-title {
  font-size: 1rem; /* 设置副标题的字体大小 */
  font-weight: normal; /* 设置副标题的正常字体重量 */
  color: #555; /* 设置副标题的字体颜色 */
  line-height: 1.5; /* 设置行高以增加可读性 */
}
.three_video {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  video {
    width: 350px;
    margin: 25px;
  }
  img {
    width: 450px;
    margin: 25px;
  }
  .div_video_span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.footer {
  background-color: gray; /* 背景颜色 */
  color: white; /* 文字颜色 */
  text-align: center; /* 文字居中 */
  padding: 20px 0; /* 上下内边距 */
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-content {
  max-width: 1200px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中对齐内容 */
}

.footer p {
  margin: 10px 0; /* 设置文字上下间距 */
  font-size: 1rem; /* 设置字体大小 */
}

.social-links {
  margin-top: 10px; /* 设置社交链接的间距 */
}

.social-links a {
  margin: 0 15px; /* 设置社交链接之间的间距 */
  color: white; /* 设置链接颜色 */
  text-decoration: none; /* 去除下划线 */
  font-size: 1rem;
}

.social-links a:hover {
  color: #007bff; /* 悬停时改变链接颜色 */
}
.blank {
  height: 1000px;
}
</style>
