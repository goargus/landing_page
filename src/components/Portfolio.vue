<template>
    <section class="flex flex-col w-full text-center max-w-[1167px] text-neutral-600 max-md:max-w-full">
        <h2 class="text-6xl tracking-tighter leading-none lowercase max-md:max-w-full max-md:text-4xl">
            {{ title }}
        </h2>
    </section>
</template>

<script>
export default {
    name: 'Portfolio',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>