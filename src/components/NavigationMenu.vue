<template>
  <nav class="nav-container nav-font nav-shadow">
    <a href="#inicio" class="home-link">Inicio</a>
    <a href="#portafolio" class="menu-item">Portafolio</a>
    <a href="#acerca-de-nosotros" class="menu-item">Acerca de Nosotros</a>
    <a href="#contactanos" class="menu-item">Contáctanos</a>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavigationMenu',
};
</script>

<style scoped>
.nav-container {
  @apply inline-flex items-center gap-[79px] py-6 pr-[65px] pl-[74px] rounded-[62px];
  box-shadow: -10px -10px 30px 0px #FFF, 10px 10px 30px 0px rgba(174, 174, 192, 0.40);
}

.nav-font {
  @apply text-3xl text-gray font-normal;
}

.home-link {
  @apply text-gray font-inter text-[30px] leading-normal;
}

.menu-item {
  @apply self-stretch my-auto;
}
</style>