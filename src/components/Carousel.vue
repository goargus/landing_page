<template>
  <div class="relative mt-4 overflow-hidden h-[680px]">
    <div class="flex transition" :style="`transform: translateX(-${currentIndex * 100}%)`">
      <div v-for="(project, index) in projects" :key="index"
        class="flex-none w-full flex flex-col justify-center items-center relative">
        <div class="bg-square" style="width: 60%; height: 100%; top: 5%;">
        </div>
        <img :src="project.imagesrc" :alt="project.imageAlt" class="image-size" />
        <a :href="project.link" class="transition button-website" target="_blank">Ver Website</a>
      </div>
    </div>
    <button @click="prevSlide" class="transform arrow-left">
      <img src="../assets/arrow.svg" alt="Arrow left" class="w-139 h-189" />
    </button>
    <button @click="nextSlide" class="transform arrow-right">
      <img src="../assets/arrow-2.svg" alt="Arrow right" class="w-139 h-189" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Project } from '../types/project'

const props = defineProps<{
  projects: Project[];
}>();

const currentIndex = ref(0);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.projects.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.projects.length) % props.projects.length;
};
</script>

<style>
.transition {
  @apply transition-transform duration-300;
}

.bg-square {
  @apply absolute rounded-[30px] shadow-3xl border-2 border-white z-0;
}

.image-size {
  @apply relative z-10 object-contain max-w-full rounded-[30px];
}

.button-website {
  @apply mt-4 z-20 inline-block px-20 py-2.5 shadow-3xl rounded-3xl border-solid border-2 border-white;
}

.arrow-left {
  @apply absolute top-1/2 left-20 -translate-y-1/2 rounded-full p-2;
}

.arrow-right {
  @apply absolute top-1/2 right-20 -translate-y-1/2 rounded-full p-2
}
</style>