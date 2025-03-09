<template>
<div class="w-full">
    <header-banner title="Acerca de nosotros"></header-banner>
</div>
<div class="p-20">
<h1 class="h1title">Unimos Estética & Funcionalidad</h1>
<p class="font-Inter paragraphs">
    Nos especializamos en ofrecer soluciones digitales integrales
    que impulsan el éxito de nuestros clientes en el entorno online.
    Desde el diseño web profesional, funcional y responsivo hasta el alojamiento de dominios. 
    Nos comprometemos a proporcionar servicios de alta calidad que garantizan una presencia web efectiva y duradera.
    Nuestro enfoque está en entender las necesidades únicas de cada cliente y ofrecerles las herramientas para destacar en el mundo digital.
    </p>
</div>
<div class="flex p-20 justify-center items-center">
                        <icon-section> </icon-section>
                    </div>
</template>
<script lang="ts" setup>
import HeaderBanner from '../components/HeaderBanner.vue';
import IconSection from '../components/IconSection.vue';
</script>
<style>
.h1title{
    @apply text-3xl font-semibold text-center text-txtcolor mb-5;
}
.paragraphs {
  @apply text-txtcolor text-center text-[18px] font-normal leading-normal w-[950px] h-[130px] flex-shrink-0 mx-auto p-10;
}
</style>