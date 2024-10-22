<template>
  <div class="relative mt-4 overflow-hidden h-[680px]">
    <div
      class="flex transition-transform duration-300" :style="`transform: translateX(-${currentIndex * 100}%)`">
      <div
        v-for="(proyects, index) in proyects"
        :key="index"
        class="flex-none w-full flex flex-col justify-center items-center relative">
        
        <div class="absolute bg-gray-500 rounded-[30px] shadow-3xl border-2 border-white z-0"
             style="width: 60%; height: 100%; top: 5%;">
        </div>

        <img :src="proyects.imagesrc" :alt="proyects.imageAlt"
          class="relative z-10 object-contain max-w-full rounded-[30px]"/>

        <a :href="proyects.link"
          class="mt-4 z-20 inline-block bg-gray-300 text-gray-700 px-20 py-2.5 transition shadow-3xl rounded-3xl border-solid border-2 border-white"
          target="_blank">Ver Website</a>
      </div>
    </div>
    <button
      @click="prevSlide" class="absolute top-1/2 left-20 transform -translate-y-1/2 rounded-full p-2">
      <img src="../assets/arrow.svg" alt="Arrow left" class="w-139 h-189" />
    </button>
    <button
     @click="nextSlide"class="absolute top-1/2 right-20 transform -translate-y-1/2 rounded-full p-2">
      <img src="../assets/arrow-2.svg" alt="Arrow right" class="w-139 h-189" />
    </button>
  </div>
</template>

<script lang="ts">
import {proyects} from '../types/caroItems'

export default {
  name: 'Carousel',
  props: {
    proyects: {
      type: Array as () => proyects[],
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.proyects.length;
    },
    prevSlide() {
      this.currentIndex =(this.currentIndex - 1 + this.proyects.length) % this.proyects.length;
    },
  },
};
</script>
