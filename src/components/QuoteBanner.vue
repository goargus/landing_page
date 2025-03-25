<template>
  <section class="relative flex flex-col md:flex-row items-center justify-center w-auto max-h-[225px] text-center  py-1 bg-white">

    <div class="w-1/3 font-inter max-w-[300px] text-3xl uppercase">
      <h1 class="text-lightGreen">Y TÚ, ¿YA TIENES WEBSITE?</h1>
    </div>

    <div class="relative flex flex-col items-center justify-center w-2/3">
      <img :src="websiteDesign3" alt="Website Preview" class="max-w-full h-auto relative ">
      <h3 class="text-3xl font-bold text-txtcolor mb-[175px]">¡Quiero Mi Website!</h3>
    </div>
    
    <div class="w-3/3 flex flex-col items-center mt-4 md:mt-0">
      <button class="mt-2 px-20 py-2 bg-lightGreen text-white border-2 rounded-full shadow-3xl hover:bg-lightGreen transition text-xl">
        Cotizar
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import websiteDesign3 from '../assets/websiteDesign3.png';

export default {
  name: 'WebsiteQuote',
  data() {
    return {
      websiteDesign3,
    };
  },
};
</script>
