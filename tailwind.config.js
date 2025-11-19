/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Container ko beech mein laane ke liye (centring)
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1320px', // Max width set kiya
        },
      },
      colors: {
        // Exclusive ki primary color (Lal)
        'primary': 'hsl(0, 95%, 58%)',     // Original: #DB4444
        
        // Dark/Black background aur Text ke liye
        'foreground': 'hsl(0, 0%, 3.5%)',  // Original: #000000 (Text, Dark BG)
        
        // Secondary color, jiska upyog buttons aur headers mein ho sakta hai
        'secondary': 'hsl(214, 20%, 65%)', // Original: #0F64FF (Blue ka substitute)
        
        // Disabled text ya subtle text ke liye
        'dark-gray': 'hsl(0, 0%, 46%)',    // Original: #7D7D7D
        
        // Lightest gray/background jahan white dikhna chahiye
        'accent-gray': 'hsl(0, 0%, 96%)',  // Original: #F5F5F5
        
        // White (Pure White)
        'white': 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}