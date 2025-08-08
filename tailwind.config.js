/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./projects/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'primaryBase': '#314170',
                'secondaryD100': '#598cca',
                'secondaryBase': '#3b82f6',
                'tertiaryBase': 'var(--c-lib-tb-tertiaryBase)',
                'complementaryBase': 'var(--c-lib-tb-complementaryBase)',
            },
            screens: {
                'sm': '576px',
                'md': '768px',
                'lg': '992px',
                'xl': '1200px',
                '2xl': '1400px',
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    'sm': '540px',
                    'md': '720px',
                    'lg': '960px',
                    'xl': '1140px',
                    '2xl': '1320px',
                },
            },
        },
    },
    plugins: [],
}