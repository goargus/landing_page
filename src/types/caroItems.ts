interface proyects {
    imagesrc: string;
    imageAlt: string;
    link: string;
  }
  
  export default {
    props: {
      proyects: {
        type: Array as () => proyects[],
        required: true,
      },
    },
    data() {
      return {
        currentIndex: 0,
      };
    },
  };
  