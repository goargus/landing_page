<template>
    <div class="flex flex-col items-center text-center bg-gray-100 rounded-lg  p-16 w-[500px]">
        <div class="flex justify-center items-center  rounded-full p-8 shadow-3xl border-white border-2">
            <img :src="imageSrc" :alt="imageAlt" class="h-50 w-50" />
        </div>
        <h3 class="mt-12 text-2xl font-bold text-gray-800">{{ title }}</h3>
        <p class="mt-6 text-gray-600 text-lg">{{ description }}</p>
    </div>
</template>

<script lang="ts">
export default {
    name: 'IconCard',
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
