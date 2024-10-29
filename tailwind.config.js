/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-1px, -1px)' },
                    '20%': { transform: 'translate(1px, -1px)' },
                    '30%': { transform: 'translate(-1px, 1px)' },
                    '40%': { transform: 'translate(1px, 1px)' },
                    '50%': { transform: 'translate(-1px, 0)' },
                    '60%': { transform: 'translate(1px, 1px)' },
                    '70%': { transform: 'translate(1px, -1px)' },
                    '80%': { transform: 'translate(-1px, 1px)' },
                    '90%': { transform: 'translate(1px, -1px)' }
                }
            },
            animation: {
                shake: 'shake 0.5s ease-in-out infinite'
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        logs: false,
        darkTheme: 'dark',
        themes: [
            {
                light: {
                    primary: '#0175AF',
                    secondary: '#FFA333',
                    neutral: '#E0E0E0',
                    accent: '#FF4081',
                    'base-100': '#F4F4F4',
                    info: '#2196F3',
                    success: '#00AB6B',
                    warning: '#CC7722',
                    error: '#F44336'
                },
                dark: {
                    primary: '#0175AF',
                    secondary: '#FFA333',
                    neutral: '#E0E0E0',
                    accent: '#FF4081',
                    'base-100': '#121212',
                    'base-200': '#363636',
                    'base-300': '#484848',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#DAA520',
                    error: '#F44336'
                },
                contrast: {
                    primary: '#FAE931',
                    secondary: '#5C5CB8',
                    accent: '#FF4081',
                    neutral: '#FFFFFF',
                    'base-100': '#000000',
                    info: '#29B6F6',
                    success: '#66BB6A',
                    warning: '#FFA726',
                    error: '#EF5350'
                }
            }
        ]
    },
    darkMode: ['class', '[data-theme="dark"]']
};
