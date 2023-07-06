import type { Config } from 'tailwindcss'
import iconsPlugin from '@jcamp/tailwindcss-plugin-icons'
import animate from '../dist/index'

export default <Partial<Config>>{
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [animate, iconsPlugin({ scale: 1.5 })],
}
