<template>
    <div class="w-full">
      <HeaderBanner title="Acerca de nosotros" />
    </div>
  
    <div class="p-20 text-center">
      <h1 class="mb-5">Unimos Estética & Funcionalidad</h1>
      <p class="p-5 max-w-[1000px]">
        Nos especializamos en ofrecer soluciones digitales integrales que impulsan el éxito de nuestros clientes en el entorno online.
        Desde el diseño web profesional, funcional y responsivo hasta el alojamiento de dominios.
        Nos comprometemos a proporcionar servicios de alta calidad que garantizan una presencia web efectiva y duradera.
        Nuestro enfoque está en entender las necesidades únicas de cada cliente y ofrecerles las herramientas para destacar en el mundo digital.
      </p>
    </div>
  
    <div class="flex p-1 mb-20 justify-center items-center">
      <IconSection />
    </div>
  
    <div>
      <QuoteBanner />
    </div>
  </template>
  
  <script lang="ts" setup>
  import HeaderBanner from "../components/HeaderBanner.vue";
  import IconSection from "../components/IconSection.vue";
  import QuoteBanner from "../components/QuoteBanner.vue";
  </script>

  