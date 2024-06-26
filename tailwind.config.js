/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#0175AF',
                    secondary: '#FFA333',
                    neutral: '#D9D9D9',
                    accent: '#E6C883',
                    'base-100': '#f8f8f8',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030'
                },
                dark: {
                    primary: '#252627',
                    secondary: '#ffa333',
                    neutral: '#38414A',
                    accent: '33BBFF',
                    'base-100': '#000000',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030'
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
