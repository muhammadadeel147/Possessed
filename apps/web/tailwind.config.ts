import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07060B',
        crypt: '#121019',
        tomb: '#1C1926',
        bone: '#ECE6D9',
        fog: '#A49FB0',
        ectoplasm: '#7CFFB2',
        candle: '#F5C66B',
        blood: '#E0485F',
        spectre: '#9D8CFF',
      },
      fontFamily: {
        display: ['"IM Fell English SC"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      ringColor: {
        DEFAULT: '#7CFFB2',
      },
    },
  },
  plugins: [],
};

export default config;
