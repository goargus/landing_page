interface projects {
    imagesrc: string;
    imageAlt: string;
    link: string;
  }
  
  export default {
    props: {
      projects: {
        type: Array as () => projects[],
        required: true,
      },
    },
  };
  