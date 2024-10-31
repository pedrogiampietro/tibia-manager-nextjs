/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  container: {
		center: true,
		padding: '2rem',
		screens: {
		  '2xl': '1400px'
		}
	  },
	  extend: {
		colors: {
		  border: '#3f4475',
		  input: '#2c3158',
		  ring: '#7f84b5',
		  background: '#242a4d',
		  foreground: '#7f84b5',
		  primary: {
			DEFAULT: '#794de2',
			foreground: '#ffffff',
		  },
		  secondary: {
			DEFAULT: '#2c3158',
			foreground: '#7f84b5',
		  },
		  destructive: {
			DEFAULT: '#7f84b5',
			foreground: '#242a4d',
		  },
		  muted: {
			DEFAULT: '#3f4475',
			foreground: '#7f84b5',
		  },
		  accent: {
			DEFAULT: '#794de2',
			foreground: '#ffffff',
		  },
		  popover: {
			DEFAULT: '#2c3158',
			foreground: '#7f84b5',
		  },
		  card: {
			DEFAULT: '#2c3158',
			foreground: '#ffffff',
		  },
		  sidebar: {
			DEFAULT: '#3f4475',
			foreground: '#ffffff',
			primary: '#242a4d',
			'primary-foreground': '#7f84b5',
			accent: '#7f84b5',
			'accent-foreground': '#ffffff',
			border: '#3f4475',
			ring: '#7f84b5',
		  },
		  panel: {
			DEFAULT: '#2c3158',
			foreground: '#ffffff',
			border: '#7f84b5',
		  },
		  contrast: {
			light: '#ffffff',
			dark: '#121212',
		  },
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
		  'accordion-down': {
			from: { height: '0' },
			to: { height: 'var(--radix-accordion-content-height)' }
		  },
		  'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0' }
		  }
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out'
		}
	  }
	},
	plugins: [
	  require("tailwindcss-animate"),
	  require('@tailwindcss/typography'),
	],
  }
  