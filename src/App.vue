<template>
  <div class="flex justify-center items-center p-5 bg-snowGray">
    <navigation-menu :navItems="navItems"></navigation-menu>
  </div>

  <div class="w-full bg-snowGray">
    <router-view></router-view>
    <footer-menu></footer-menu>
  </div>
</template>

<script setup lang="ts">
import NavigationMenu from './components/NavigationMenu.vue'
import FooterMenu from './components/FooterMenu.vue';
import { NavItem } from './types/navItem'


const navItems = [
  { title: 'Inicio', href: '/' },
  { title: 'Acerca de Nosotros', href: '/about' },
  { title: 'Contáctanos', href: '/contact' },
] as NavItem[];
</script>
