<template>
    <div class="flex items-center justify-center min-h-screen ">
      <form class="w-full max-w-[725px] space-y-12 p-24 ">
        <h1>Escríbenos</h1>
        <div v-for="field in fields" :key="field.name" class="relative">
          <input
            :type="field.type"
            :placeholder="field.placeholder"
            class="txtbox"/>
        </div>
        <div class="relative">
          <textarea
            placeholder="Mensaje"
            class="txtboxmsg"></textarea>
        </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="hover:bg-gray-300">
          Enviar
        </button>
      </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fields: [
          { name: "name", type: "text", placeholder: "Nombre" },
          { name: "lastName", type: "text", placeholder: "Apellido" },
          { name: "email", type: "email", placeholder: "Correo" },
          { name: "phone", type: "tel", placeholder: "Teléfono" },
        ],
      };
    },
  };
  </script>
 
  <style>
  h1{
    @apply text-3xl font-semibold text-center text-txtcolor mb-16;
  }
  .txtbox{
    @apply w-full px-4 py-3 text-gray rounded-full shadow-neumorphic border-0 text-center bg-snowGray text-[22px];
  }
  .txtboxmsg{
    @apply w-full h-[246px] px-4 py-[110px] text-gray rounded-3xl shadow-neumorphic border-0 focus:outline-none text-center bg-snowGray text-[22px];
  }
  button{
    @apply w-3/5 py-3 mt-2 text-gray rounded-full shadow-3xl  focus:outline-none border-white border-2;
  }
</style>