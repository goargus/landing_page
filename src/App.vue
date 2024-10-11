<template>
  <div class="flex flex-col justify-center items-center p-5 bg-snowGray">
    <navigation-menu :navItems="navItems"></navigation-menu>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import NavigationMenu from './components/NavigationMenu.vue'
import FooterMenuVue from './components/FooterMenu.vue';
import { NavItem } from './types/navItem'


const navItems = [
  { title: 'Inicio', href: '/' },
  { title: 'Portafolio', href: '/portfolio' },
  { title: 'Acerca de Nosotros', href: '/about' },
  { title: 'Contáctanos', href: '/contact' },
] as NavItem[];
</script>
