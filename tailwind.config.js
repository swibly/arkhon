/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#0175af',
                    secondary: '#ffa333',
                    neutral: '#D9D9D9',
                    'base-100': '#f5f5f5',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030'
                },
                dark: {
                    primary: '#0175af',
                    secondary: '#ffa333',
                    neutral: '#000000',
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
