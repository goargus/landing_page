<template>
    <section class="flex flex-col w-full text-center max-w-[1167px] text-neutral-600 max-md:max-w-full">
        <h2 class="text-6xl tracking-tighter leading-none lowercase max-md:max-w-full max-md:text-4xl">
            Lo Que Ofrecemos
        </h2>
        <div class="flex flex-wrap gap-10 items-center mt-24 w-full max-md:mt-10 max-md:max-w-full">
            <OfferingCard v-for="(offering, index) in offerings" :key="index" :image-src="offering.imageSrc"
                :image-alt="offering.imageAlt" :title="offering.title" :description="offering.description" />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OfferingCard from '../components/OfferingCard.vue'

export default defineComponent({
    name: 'OfferingSection',
    components: {
        OfferingCard,
    },
    data() {
        return {
            offerings: [
                {
                    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8f3cd9f2deaa0b81e5edb1f9c81f9a3baa688635095075d5501bee1115995a3d?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589',
                    imageAlt: 'Diseño de Páginas Web',
                    title: 'Diseño de Páginas Web',
                    description: 'Creamos páginas web optimizadas para convertir visitantes en clientes potenciales, utilizando un diseño atractivo y una clara llamada a la acción.',
                },
                {
                    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0b3cf1d040412cc99121d150abe0e063ebc227d69801e4fec323e7f9b1b539e0?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589',
                    imageAlt: 'Diseño Responsivo',
                    title: 'Diseño Responsivo',
                    description: 'Nuestros diseños son responsivos, asegurando que cada página web se vea genial y funcione perfectamente en todos los dispositivos, desde ordenadores hasta móviles.',
                },
                {
                    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1316b544f5bd2cf8113d77b065e9c7bfa67c6e339c6cdb04aaeb68058420272c?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589',
                    imageAlt: 'Soporte y Mantenimiento',
                    title: 'Soporte y Mantenimiento',
                    description: 'Ofrecemos soporte y mantenimiento continuo para que nuestros clientes no tengan que preocuparse por la parte técnica de sus sitios web.',
                },
            ],
        };
    },
});
</script>