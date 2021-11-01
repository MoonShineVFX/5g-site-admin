module.exports = {
    env: {
        HOST: '35.206.225.168',
    },
    basePath: '/admin',
    async redirects () {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: false,
            },
            {
                source: '/index',
                destination: '/login',
                permanent: false,
            },
        ]
    },
}
