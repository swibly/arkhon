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
                    primary: '#FFA333',
                    secondary: '#0175AF',
                    neutral: '#38414A',
                    accent: '33BBFF',
                    'base-100': '#252627',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030'
                }
            }
        ]
    },
    plugins: [require('daisyui')],
    
    theme: {
        screens: {            
            sm: '640px',
            md: '768px',
            lg: '1024px',
            ml: '1120px',
            xl: '1280px',
            '2xl': '1536px'
        }
    }
};