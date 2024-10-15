<template>
    <article
        class="flex flex-col justify-center items-center bg-gray-100 rounded-2xl shadow-3xl h-[350px] w-[350px] px-5 py-9">
        <img :src="imageSrc" :alt="imageAlt" loading="lazy" class="object-contain w-[88px]" />
        <h3 class="mt-6 text-2xl font-bold text-center">{{ title }}</h3>
        <p class="mt-6 text-lg text-center">{{ description }}</p>
    </article>
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