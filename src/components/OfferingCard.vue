<template>
    <article
        class="flex flex-col grow shrink justify-center items-center self-stretch px-5 py-9 my-auto bg-gray-100 rounded-2xl shadow-lg min-h-[353px] min-w-[240px] w-[282px]">
        <img :src="imageSrc" :alt="imageAlt" loading="lazy" class="object-contain w-[88px]" />
        <h3 class="mt-8 text-2xl font-bold">{{ title }}</h3>
        <p class="mt-8 text-lg">{{ description }}</p>
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