module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/assets/common.scss";
            `,
      },
    },
  },
};
