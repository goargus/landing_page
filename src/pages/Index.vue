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
                        <portfolio-of-pages title="nuestros diseños"></portfolio-of-pages>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBanner from '../components/HeaderBanner.vue';
import OfferingSection from '../components/OfferingSection.vue';
import PortfolioOfPages from '../components/PortfolioOfPages.vue';
</script>
