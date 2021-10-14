module.exports = {
    env: {
        HOST: '35.206.225.168',
    },
    basePath: '/admin',
    async redirects () {
        return [
            {
                source: '/',
                destination: '/home/banner',
                permanent: false,
            },
            {
                source: '/index',
                destination: '/home/banner',
                permanent: false,
            },
        ]
    },
}
