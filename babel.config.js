// babel.config.js — drop at repo root. Enables @/* path aliases.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: { '@': './src' },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
      // keep this LAST if you add reanimated:
      // 'react-native-reanimated/plugin',
    ],
  };
};
