<template>
    <div class="w-full">
        <header-banner title="ARGUS"></header-banner>
    </div>

    <div class="flex ">
        <div class="flex-grow p-5">
            <div class="p-5">
                <div class="grid grid-cols-1 gap-4">


                    <div class="flex p-20 justify-center items-center">
                        <offering-section title="lo que ofrecemos"></offering-section>
                    </div>

                    <div class="flex p-4 justify-center items-center">
                        <portfolio title="nuestros diseños"></portfolio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBanner from '../components/HeaderBanner.vue';
import OfferingSection from '../components/OfferingSection.vue';
import Portfolio from '../components/Portfolio.vue';
import { NavItem } from '../types/navItem';

const navItems = [
    { title: 'Inicio', href: '/' },
    { title: 'Portafolio', href: '/portfolio' },
    { title: 'Acerca de Nosotros', href: '/about' },
    { title: 'Contáctanos', href: '/contact' },
] as NavItem[];
</script>
