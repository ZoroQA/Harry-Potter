import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gryffindor: '#740001',
        slytherin: '#1a472a',
        hufflepuff: '#ecb939',
        ravenclaw: '#0e1a40',
      }
    }
  },
  plugins: [],
} satisfies Config
