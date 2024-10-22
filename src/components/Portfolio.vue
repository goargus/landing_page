<template>
  <section class="flex flex-col w-full text-center text-neutral-600 max-md:max-w-full">
    <h2 class="text-6xl tracking-tighter leading-none lowercase max-md:max-w-full max-md:text-4xl">
      {{ title }}
    </h2>
    
    <Carousel :proyects="proyects" />
  </section>
</template>

<script lang="ts">
import { DefineComponent } from 'vue';
import Carousel from './carousel.vue';

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
      proyects: [
        {
          imagesrc: 'https://s3-alpha-sig.figma.com/img/9df2/e43a/a33d73a7bd56af1a9509f7d0965b72d6?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KT6CC6xZZ5r093lXqeBKzznGQ9NUfVjn33oDZ4bnOMXy2n1U951xI1q7p2gr1RY0bEyMTYmvaFprvdpXGEAdsADPKqqIyz453P6bsMiwxg7bq26ZeGV249ID1JSpCRKZ5X1dAcmiTXdymt80Ug3qrG0qJ1fANOoom0kVTuAfBCXuzarQ3bTc5v4xEXo13ompRtzfft3a3a8wdvadKIySBXleG4yd3eSuMjIBhcWlbOC9XfQpmg82XYl-URNnX7fFTtkChA0zIjaIG80KO4YQeEaMNMUsxtHNkeuCWWsGYQSUnzQVCnvz8uxFihiEO5tlRi1odNFsg88vcz5qPYUPcw__',
          imageAlt: 'Descripcion',
          link: '#',
        },
        {
        imagesrc: 'https://s3-alpha-sig.figma.com/img/9df2/e43a/a33d73a7bd56af1a9509f7d0965b72d6?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KT6CC6xZZ5r093lXqeBKzznGQ9NUfVjn33oDZ4bnOMXy2n1U951xI1q7p2gr1RY0bEyMTYmvaFprvdpXGEAdsADPKqqIyz453P6bsMiwxg7bq26ZeGV249ID1JSpCRKZ5X1dAcmiTXdymt80Ug3qrG0qJ1fANOoom0kVTuAfBCXuzarQ3bTc5v4xEXo13ompRtzfft3a3a8wdvadKIySBXleG4yd3eSuMjIBhcWlbOC9XfQpmg82XYl-URNnX7fFTtkChA0zIjaIG80KO4YQeEaMNMUsxtHNkeuCWWsGYQSUnzQVCnvz8uxFihiEO5tlRi1odNFsg88vcz5qPYUPcw__',
          imageAlt: 'Descripcion',
          link: '#',
        },
        {
        imagesrc: 'https://s3-alpha-sig.figma.com/img/9df2/e43a/a33d73a7bd56af1a9509f7d0965b72d6?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KT6CC6xZZ5r093lXqeBKzznGQ9NUfVjn33oDZ4bnOMXy2n1U951xI1q7p2gr1RY0bEyMTYmvaFprvdpXGEAdsADPKqqIyz453P6bsMiwxg7bq26ZeGV249ID1JSpCRKZ5X1dAcmiTXdymt80Ug3qrG0qJ1fANOoom0kVTuAfBCXuzarQ3bTc5v4xEXo13ompRtzfft3a3a8wdvadKIySBXleG4yd3eSuMjIBhcWlbOC9XfQpmg82XYl-URNnX7fFTtkChA0zIjaIG80KO4YQeEaMNMUsxtHNkeuCWWsGYQSUnzQVCnvz8uxFihiEO5tlRi1odNFsg88vcz5qPYUPcw__',
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