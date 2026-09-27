/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // تأكد أن المسار يشمل ملفات React الخاصة بك
    ],
    theme: {
      extend: {
        colors: {
          primary: '#6366f1', 
          background: '#0f172a', 
          surface: '#1e293b',    
          border: '#334155',     
          textMain: '#f8fafc',   
          textMuted: '#94a3b8',  
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], 
        },
      },
    },
    plugins: [],
  }