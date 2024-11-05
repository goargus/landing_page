<template>
<div class="w-full">
<header-banner title="Contáctanos"></header-banner>
<p class="font-Inter pcontact">¡Te invitamos a ponerte en contacto con Go Argus! Estamos aquí para ayudarte a llevar tu presencia digital al siguiente nivel. Si tienes un proyecto en mente o simplemente quieres saber más sobre nuestros servicios, no dudes en escribirnos. Estaremos encantados de trabajar contigo y encontrar la mejor solución para tus necesidades. ¡Hablemos y comencemos a crear algo increíble juntos!
</p>
</div>
<div>
    <ContactForm />
</div>
</template>

<script setup lang="ts">
import HeaderBanner from '../components/HeaderBanner.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

<style>
.pcontact{
    @apply text-txtcolor text-center  text-[18px] font-normal leading-normal w-[1500px] h-[130px] flex-shrink-0 mx-auto p-20;
}
</style>