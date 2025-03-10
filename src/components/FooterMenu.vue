<template>
  <footer
    class="flex relative gap-10 items-center px-10 mt-0 min-h-[193fpx] max-md:px-5 max-md:mt-10 max-md:max-w-full">

    <img loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f02c129669cdff87917f5edbaeb38e16b2485e76d36fe627761acee18113fcb?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589"
      alt="" class="object-contain z-0 shrink-0 self-stretch my-auto aspect-[1.53] min-w-[240px] w-[286px]" />


    <nav class="flex z-0 flex-col self-stretch my-auto mt-4">
      <ul class="flex flex-col w-full text-2xl list-none p-0">
        <li class="text-right">
          <router-link to="/portfolio" class="no-underline text-lightGreen-400">Portafolio</router-link>
        </li>
        <li class="mt-2 text-right">
          <router-link to="/contact" class="no-underline text-lightGreen-400">Contáctanos</router-link>
        </li>
        <li class="mt-2">
          <router-link to="/about" class="no-underline text-lightGreen-400">Acerca de Nosotros</router-link>
        </li>
      </ul>
      <div class="flex gap-3.5 items-center self-end mt-3.5 mb-8">
        <a href="#" aria-label="Social media link">
          <img loading="lazy" src="../assets/facebook.svg" alt="facebook"
            class="object-contain shrink-0 self-stretch my-auto w-8 bg-blend-normal aspect-square" />
        </a>
        <a href="#" aria-label="Social media link">
          <img loading="lazy" src="../assets/instagram.svg" alt="instagram"
            class="object-contain shrink-0 self-stretch my-auto w-8 bg-blend-normal aspect-square" />
        </a>
      </div>
    </nav>


  </footer>
</template>

<style>
footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  min-height: 193px;
  background: linear-gradient(90deg, #072F2E 40%, #090901 100%);
  @apply text-lightGreen;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: right;
}

nav ul li {
  margin: 0.5rem 0;
}

nav ul li a {
  text-decoration: none;
  @apply text-lightGreen
}

@media (max-width: 768px) {
  footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  nav ul {
    text-align: center;
  }

  .social-icons {
    margin-top: 1rem;
  }
}
</style>

<script>
export default {
  name: 'FooterMenu',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
