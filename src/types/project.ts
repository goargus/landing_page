interface project {
    imagesrc: string;
    imageAlt: string;
    link: string;
  }
  
  export default {
    props: {
      projects: {
        type: Array as () => project[],
        required: true,
      },
    },
  };
  