/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#374151',
          850: '#1f2937',
          950: '#111827',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            // Thay đổi kích cỡ cho đoạn văn bản
            p: {
              fontSize: '30px',
            },
            // Nếu cần, bạn thay đổi cho heading, list, v.v.
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-lead': '#9ca3af',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-counters': '#9ca3af',
            '--tw-prose-bullets': '#4b5563',
            '--tw-prose-hr': '#374151',
            '--tw-prose-quotes': '#f3f4f6',
            '--tw-prose-quote-borders': '#374151',
            '--tw-prose-captions': '#9ca3af',
            '--tw-prose-code': '#f9fafb',
            '--tw-prose-pre-code': '#d1d5db',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#374151',
            '--tw-prose-td-borders': '#4b5563',
          },
        },
      },
      fontSize: {
        // Ví dụ thay đổi kích cỡ font chữ mặc định
        base: '16px',
        lg: '18px',
        xl: '20px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};