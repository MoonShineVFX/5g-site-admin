module.exports = {
    env: {
        HOST: '5gkh.kcg.gov.tw',
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
