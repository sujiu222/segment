import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const img = ref("");
  function changeimg(newimg) {
    img.value = newimg;
  }
  return { img, changeimg };
});
