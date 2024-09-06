<template>
    <div>
        <div class="flex justify-center items-center p-5">
            <navigation-menu></navigation-menu>
        </div>

    </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu.vue';
export default {
    name: 'Home',
    components: {
        NavigationMenu
    }
}
</script>

<style></style>