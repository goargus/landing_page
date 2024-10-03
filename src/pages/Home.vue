<template>
    <div class="flex flex-col min-h-screen bg-snowGray">
        <div class="flex-grow p-5">
            <div class="p-5">

                <div class="grid grid-cols-1 gap-4">

                    <div class="flex justify-center items-center p-5">
                        <navigation-menu></navigation-menu>
                    </div>

                    <div class="p-3">
                        <header-banner></header-banner>
                    </div>

                    <div class="flex p-4 justify-center items-center">
                        <offering-section title="lo que ofrecemos"></offering-section>
                    </div>

                    <div class="flex p-4 justify-center items-center">
                        <portfolio title="nuestros diseños"></portfolio>
                    </div>

                    <div class="p-4 mt-auto">
                        <footer-menu> </footer-menu>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu.vue';
import HeaderBanner from '../components/HeaderBanner.vue';
import OfferingSection from '../components/OfferingSection.vue';
import Portfolio from '../components/Portfolio.vue';
import FooterMenu from '../components/FooterMenu.vue';

export default {
    name: 'Home',
    components: {
        NavigationMenu,
        HeaderBanner,
        OfferingSection,
        Portfolio,
        FooterMenu,
    }
}
</script>