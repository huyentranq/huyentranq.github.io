/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,md}'], // <== nếu bạn dùng file .md nội dung
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          bg: '#181818',       // Màu nền chính tối
          section: '#242424',  // Nền cho section, hơi mờ đục
          text: '#e0e0e0',     // Màu chữ mặc định (có thể không sử dụng nữa)
          accent: '#74b9ff',   // Màu accent thay đổi sang tông ấm
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      typography: (theme) => ({
        invert: {
          css: {
            // Modified: Đổi màu chữ thành trắng
            color: '#ffffff',
            a: { color: theme('colors.primary.accent') },
            strong: { color: '#ffffff' },
            h1: { color: '#ffffff' },
            h2: { color: '#ffffff' },
            h3: { color: '#ffffff' },
            blockquote: {
              color: '#ffffff',
              borderLeftColor: theme('colors.primary.accent'),
            },
            code: { color: theme('colors.primary.accent') },
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};