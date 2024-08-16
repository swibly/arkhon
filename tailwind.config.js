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
        },
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
                    error: '#da3030',
                },
                dark: {
                    primary: '#FFA333',
                    secondary: '#0175AF',
                    neutral: '#38414A',
                    accent: '#252627',
                    'base-100': '#252627',
                    success: '#4fd35c',
                    warning: '#ead45f',
                    error: '#da3030',                    
                },
                mytheme: {
                    "primary": "#000000",      // Preto para contraste máximo com o fundo
                    "secondary": "#ffffff",    // Branco para contraste com o primário
                    "accent": "#00ffff",       // Mantém o ciano para destaque
                    "neutral": "#ffffff",      // Branco para garantir legibilidade
                    "base-100": "#000000",     // Preto como cor base para fundo
                    "info": "#00ffff",         // Ciano, para manter consistência com o tema
                    "success": "#00ff00",      // Verde, já que é uma cor padrão de sucesso
                    "warning": "#ffff00",      // Amarelo, para maior distinção do sucesso
                    "error": "#ff0000",        // Vermelho permanece o mesmo para indicar erro
                  },
                  
            }
        ]
    },    
};
