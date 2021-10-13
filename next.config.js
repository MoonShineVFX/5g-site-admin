module.exports = {
    env: {
        HOST: '35.206.225.168',
    },
    async redirects () {
        return [
            {
                source: '/',
                destination: '/admin/home/banner',
                permanent: false,
            },
            {
                source: '/index',
                destination: '/admin/home/banner',
                permanent: false,
            },
        ]
    },
}
