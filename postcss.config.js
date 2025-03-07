module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      base: './src/app/globals.css',
      config: './tailwind.config.ts',
    },
    autoprefixer: {},
  },
}
