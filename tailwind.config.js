/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    plugins: [require('daisyui')],

    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            mlg: '1120px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '1800px'
        }
    },

    daisyui: {
        themes: [
            {
                light: {
                    primary: '#0175AF',
                    secondary: '#FFA333',
                    neutral: '#D9D9D9',
                    accent: '#0175AF',
                    'base-100': '#F8F8F8',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030'
                },
                dark: {
                    primary: '#FFA333',
                    secondary: '#0175AF',
                    neutral: '#38414A',
                    accent: '#252627',
                    'base-100': '#252627',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030'
                },
                night: {
                    primary: '#FAE931',
                    secondary: '#5C5CB8',
                    accent: '#FDFEFF',
                    neutral: '#FAE931',
                    'base-100': '#000000',
                    'base-200': '#070707',
                    'base-300': '#0E0E0E',
                    info: '#00ffff',
                    success: '#00ff00',
                    warning: '#ffff00',
                    error: '#ff0000'
                }
            }
        ]
    }
};
