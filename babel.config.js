module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['./app'],
        alias: {
          // this must be synchronized with tsconfig.json's path configuration
          '@app': './app',
        },
      },
    ],
  ]
};
