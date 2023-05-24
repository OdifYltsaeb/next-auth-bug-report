const daisyui = require('daisyui');

module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/styles/**/*.{css, scss}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['Inter'],
                fancy: ['Space Grotesk'],
            },
            colors: {
                orange: '#FDA769',
            },
        },
    },
    important: true,
    variants: {
        extend: {
            backgroundColor: ['checked', 'hover'],
            borderColor: ['checked', 'hover'],
            textColor: ['visited', 'hover'],
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/colors/themes')['[data-theme=bumblebee]'],
                },
            },
        ],
    },
};
