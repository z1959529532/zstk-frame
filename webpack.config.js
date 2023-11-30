const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 不显示文件过大优化建议
    performance: {
        hints: false
    },
    resolve: {
        alias: {
            '#': resolve('projects'),
            '@': resolve('src'),
            'vue$': process.env.NODE_ENV === 'production' ? 'vue' : 'vue/dist/vue.esm.js'
        },
        extensions: ['.ts']
    }
};
