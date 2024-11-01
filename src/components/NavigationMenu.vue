<template>
  <nav class="nav-container nav-font nav-shadow">
    <RouterLink v-for="(item, index) in navItems" :key="index" :to="item.href"
      :class="index === 0 ? 'home-link' : 'menu-item'">
      {{ item.title }}
    </RouterLink>

  </nav>
</template>

<script lang="ts">
import { NavItem } from '../types/navItem'

export default {
  name: 'NavigationMenu',
  props: {
    navItems: {
      type: Array as () => NavItem[],
      required: true,
      validator(items: NavItem[]) {
        return items.every(item => {
          return (
            typeof item.title === 'string' &&
            typeof item.href === 'string'
          );
        });
      }
    }
  }
};
</script>

<style scoped>
.nav-container {
  @apply inline-flex items-center gap-[79px] py-6 pr-[65px] pl-[74px] rounded-[62px] shadow-3xl;
}

.nav-font {
  @apply text-3xl text-gray font-normal;
}

.home-link {
  @apply text-gray font-inter text-[30px] leading-normal hover:bg-lightGreen;
}

.menu-item {
  @apply self-stretch my-auto hover:bg-lightGreen;
}
</style>