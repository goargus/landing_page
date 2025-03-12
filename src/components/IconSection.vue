<template>
    <section class="flex flex-col items-center text-center w-full max-w-[1167px] text-neutral-600 mx-auto">
        <article class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-3 w-full">
            <IconCard
                v-for="(offering, index) in offerings" 
                :key="index" 
                :image-src="offering.imageSrc"
                :image-alt="offering.imageAlt" 
                :title="offering.title" 
                :description="offering.description" 
            />
        </article>
    </section>
</template>

<script lang="ts">
import IconCard from '../components/IconCard.vue';
import webDesign from '../assets/webDesign2.svg';
import laptopIcon from '../assets/laptopIcon.svg';

export default {
    name: 'IconSection',
    components: {
        IconCard,
    },
    props: {
    },
    data() {
        return {
            offerings: [
                {
                    imageSrc: webDesign,
                    imageAlt: 'Desarrollo',
                    title: 'Desarrollo',
                    description: 'Contamos con un equipo de desarrolladores expertos dedicados a crear soluciones digitales de alta calidad. Nuestros especialistas en desarrollo están listos para transformar ideas en plataformas funcionales y personalizadas, adaptándose a las necesidades de cada proyecto. Desde el diseño hasta la implementación, trabajamos con las mejores prácticas para ofrecer resultados efectivos y escalables.',
                },
                {
                    imageSrc: laptopIcon,
                    imageAlt: 'Diseño',
                    title: 'Diseño',
                    description: 'Nuestro equipo de expertos en UX/UI se especializa en crear experiencias intuitivas y atractivas. Nos enfocamos en el diseño centrado en el usuario, asegurando que cada interfaz no solo sea visualmente impactante, sino también fácil de usar. Con un enfoque en funcionalidad y estética, optimizamos cada proyecto para ofrecer una experiencia memorable y efectiva para el usuario.',
                },
            ],
        };
    },
};
</script>
