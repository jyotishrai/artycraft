module.exports = {
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx']
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  assets: ["./src/assets/fonts/"], // stays the same
};
