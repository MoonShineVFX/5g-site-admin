module.exports = {
    env: {
        HOST: (process.env.API_URL === undefined) ? 'https://5gkh.kcg.gov.tw' : process.env.API_URL,
    },
    basePath: '/admin',
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000',
                    }
                ],
            },
        ]
    },
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
