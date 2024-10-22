<template>
  <section class="flex flex-col w-full text-center text-neutral-600 max-md:max-w-full">
    <h2 class="text-6xl tracking-tighter leading-none lowercase max-md:max-w-full max-md:text-4xl">
      {{ title }}
    </h2>
    
    <Carousel :projects="projects" />
  </section>
</template>

<script lang="ts">
import { DefineComponent } from 'vue';
import Carousel from './carousel.vue';
import mockup from '../assets/mockup.png';

export default {
  name: 'Portfolio',
  components: {
    Carousel,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      projects: [
        {
          imagesrc: mockup ,
          imageAlt: 'Descripcion',
          link: '#',
        },
        {

        imagesrc: mockup,
          imageAlt: 'Descripcion',
          link: '#',
        },
        {
        imagesrc: mockup,
          imageAlt: 'Descripcion',
          link: '#',
        },
      ],
    };
  },
};
</script>

<style scoped>
img {
  object-fit: contain;
}
</style>