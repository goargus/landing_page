<template>
    <div class="flex flex-col justify-between bg-gray-100 rounded-2xl shadow-3xl h-[400px] w-[350px] px-5 py-9">
      <div class="flex justify-center">
        <img :src="imageSrc" :alt="imageAlt" class="object-contain h-24" />
      </div>
      <h3 class="mt-6 text-2xl font-bold text-center min-h-[60px] flex items-center justify-center">{{ title }}</h3>
      <p class="mt-6 text-lg text-center min-h-[80px] flex place-itmes-start justify-center">{{ description }}</p>
    </div>
  </template>


<script lang="ts">

export default {
    name: 'OfferingCard',
    props: {
        imageSrc: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
};
</script>