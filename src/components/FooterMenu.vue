<template>
    <footer
        class="flex relative gap-10 items-center px-10 mt-44 min-h-[193fpx] max-md:px-5 max-md:mt-10 max-md:max-w-full">

        <img loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f02c129669cdff87917f5edbaeb38e16b2485e76d36fe627761acee18113fcb?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589"
            alt="" class="object-contain z-0 shrink-0 self-stretch my-auto aspect-[1.53] min-w-[240px] w-[286px]" />


        <nav class="flex z-0 flex-col self-stretch my-auto">
            <ul class="flex flex-col w-full text-2xl text-teal-400 list-none p-0">
                <li class="text-right"><a href="#portfolio" class="no-underline text-teal-400">Portafolio</a></li>
                <li class="mt-2 text-right"><a href="#contact" class="no-underline text-teal-400">Contáctanos</a></li>
                <li class="mt-2"><a href="#about" class="no-underline text-teal-400">Acerca de Nosotros</a></li>
            </ul>

            <div class="flex gap-4 items-center self-end mt-4">
                <a href="#" aria-label="Social media link">
                    <img loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a588b2e5269fdb564da070ad9a64ffc20cc0a146c3598ac689044549e68cef02?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-8 aspect-square" />
                </a>
                <a href="#" aria-label="Social media link">
                    <img loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e152466ef40bbee522973b9897bd04c44dc8f0d907ed00a19caf3d5ae71f5f86?placeholderIfAbsent=true&apiKey=0ec1ed00d9eb4adfb001d83c3aaae589"
                        alt="" class="object-contain shrink-0 self-stretch my-auto w-8 bg-blend-normal aspect-square" />
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
  background: linear-gradient(100deg, #00bfa3 0%, #090901 50%);
  color: #00FFAA;
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
@apply text-lightGreen;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons img {
  width: 24px;
  height: 24px;
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