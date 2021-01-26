module.exports = {
    presets: [
        // Loads the Contao preset that comes with default configuration, e.g. purge config and default colors.
        require('@contao/backend/tailwind-preset')
    ],
    theme: {
        extend: {
            colors: {
                // Override the Contao default color
                primary: {
                    50: 'var(--color-brand-50, #FFFFFF)',
                    100: 'var(--color-brand-100, #FEF6FA)',
                    200: 'var(--color-brand-200, #FAD2E5)',
                    300: 'var(--color-brand-300, #F5ADD0)',
                    400: 'var(--color-brand-400, #F189BB)',
                    500: 'var(--color-brand-500, #ED64A6)',
                    600: 'var(--color-brand-600, #E8368C)',
                    700: 'var(--color-brand-700, #D31872)',
                    800: 'var(--color-brand-800, #A51359)',
                    900: 'var(--color-brand-900, #770E41)',
                },
            }
        },
    },
};
