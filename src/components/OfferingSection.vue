<template>
    <section class="flex flex-col w-full text-center max-w-[1167px] text-neutral-600 max-md:max-w-full">
      <h2 class="text-6xl tracking-tighter leading-none lowercase max-md:max-w-full max-md:text-4xl">
        {{ title }}
      </h2>
      <article class="grid grid-cols-3 gap-10 mt-24 w-full max-md:mt-10 max-md:max-w-full max-md:grid-cols-1">
        <OfferingCard 
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
import { defineComponent } from 'vue';
import OfferingCard from '../components/OfferingCard.vue'
import WebDesignImage from '../assets/websiteIcon.svg';
import phoneimage from '../assets/phoneIcon.svg';
import checkicon from '../assets/checkIcon.svg';

export default {
    name: 'OfferingSection',
    components: {
        OfferingCard,
    },
    props: {
        title: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            offerings: [
                {
                    imageSrc: WebDesignImage,
                    imageAlt: 'Diseño de Páginas Web',
                    title: 'Diseño de Páginas Web',
                    description: 'Creamos páginas web optimizadas para convertir visitantes en clientes potenciales, utilizando un diseño atractivo y una clara llamada a la acción.',
                },
                {
                    imageSrc: phoneimage,
                    imageAlt: 'Diseño Responsivo',
                    title: 'Diseño Responsivo',
                    description: 'Nuestros diseños son responsivos, asegurando que cada página web se vea genial y funcione perfectamente en todos los dispositivos, desde ordenadores hasta móviles.',
                },
                {
                    imageSrc: checkicon,
                    imageAlt: 'Soporte y Mantenimiento',
                    title: 'Soporte y Mantenimiento',
                    description: 'Ofrecemos soporte y mantenimiento continuo para que nuestros clientes no tengan que preocuparse por la parte técnica de sus sitios web.',
                },
            ],
        };
    },
};
</script>