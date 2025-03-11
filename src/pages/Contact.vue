<template>
  <div class="w-full">
    <header-banner title="Contáctanos"></header-banner>
    <p class="font-Inter w-[1370px] h-[130px] p-20 text-center">
      ¡Te invitamos a ponerte en contacto con Go Argus! Estamos aquí para ayudarte a llevar tu presencia digital al
      siguiente nivel. Si tienes un proyecto en mente o simplemente quieres saber más sobre nuestros servicios, no dudes
      en escribirnos. Estaremos encantados de trabajar contigo y encontrar la mejor solución para tus necesidades.
      ¡Hablemos y comencemos a crear algo increíble juntos!
    </p>
  </div>
  <div>
    <ContactForm />
  </div>
</template>

<script lang="ts" setup>
import HeaderBanner from '../components/HeaderBanner.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

