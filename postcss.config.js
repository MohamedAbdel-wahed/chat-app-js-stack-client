const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: [
                './public/index.html',
                './src/**/*.jsx',
                './src/*.jsx'
            ],
            defaultExtractor: content=> content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
    ],
};
