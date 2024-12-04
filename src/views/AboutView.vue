<template>
  <video muted autoplay loop class="header-video">
    <source src="/header.mp4" />
  </video>
  <div class="video-content">
    <h1>
      Segment Anything Model (SAM): a new AI model from Meta AI that can "cut
      out" any object, in any image, with a single click
    </h1>
    <h3>
      SAM is a promptable segmentation system with zero-shot generalization to
      unfamiliar objects and images, without the need for additional training.
    </h3>

    <a href="#">
      <el-button :icon="Search" size="large" circle />
      Try a try</a
    >
  </div>
  <div class="content">
    <div class="container">
      <h1 class="main-title">SAM uses a variety of input prompts</h1>
      <p class="sub-title">
        Prompts specifying what to segment in an image allow for a wide range of
        segmentation tasks without the need for additional training.
      </p>
    </div>
  </div>
  <div class="three_video">
    <div class="div_video_span">
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
  margin-top: calc(100vh);
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
