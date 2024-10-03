<template>
  <nav class="nav-container nav-font nav-shadow">
    <a v-for="(item, index) in navItems" :key="index" :href="item.href" class="menu-item">
      {{ item.title }}
    </a>
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