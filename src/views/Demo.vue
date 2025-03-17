<template>
  <div>
    <img
      v-for="index in 4"
      :key="index"
      :src="`/ori/00${index}.jpg`"
      @click="() => click(`00${index}`)"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const click = (index) => {
  router.push(`/segment?index=${index}`);
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  img {
    width: 100%;
  }
}
</style>
