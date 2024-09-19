/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    plugins: [require('daisyui')],
    daisyui: {
        logs: false,
        darkTheme: 'dark',
        themes: [
            {
                light: {
                    primary: '#0175AF',
                    secondary: '#FFA333',
                    neutral: '#D9D9D9',
                    accent: '#0175AF',
                    'base-100': '#F8F8F8',
                    success: '#4FD35C',
                    warning: '#EAD45F',
                    error: '#DA3030'
                },
                dark: {
                    primary: '#FFA333',
                    secondary: '#0175AF',
                    neutral: '#38414A',
                    accent: '#252627',
                    'base-100': '#252627',
                    success: '#4FD35C',
                    warning: '#EAD45F',
                    error: '#DA3030'
                },
                night: {
                    primary: '#FAE931',
                    secondary: '#5C5CB8',
                    accent: '#FDFEFF',
                    neutral: '#FAE931',
                    'base-100': '#000000',
                    'base-200': '#070707',
                    'base-300': '#0E0E0E',
                    info: '#00FFFF',
                    success: '#00FF00',
                    warning: '#FFFF00',
                    error: '#FF0000'
                }
            }
        ]
    },
    darkMode: ['class', '[data-theme="dark"]']
};
