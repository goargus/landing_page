<template>
    <header class="relative">
        <img src="../assets/Bannerpicture.png" alt="Banner" class="object-cover w-full h-full" />
        <div class="degraded">
        </div>

<div class="absolute inset-0 flex items-center justify-center">
    <img loading="lazy"
      src="../assets/defaultLogo.png"
      alt="" class="bg-image" />
</div>
       </header>
</template>

<style>
.degraded{
    @apply absolute inset-0;
    background: linear-gradient(90deg, rgba(7, 47, 46, 0.8) 40%, rgba(9, 9, 1, 0.8) 100%);
}
.bg-image{
    @apply object-contain z-0 shrink-0 self-stretch my-auto aspect-[1.53] min-w-[483px] w-[316px];
}
</style>