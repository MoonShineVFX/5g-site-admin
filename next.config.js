module.exports = {
    env: {
        HOST: '35.206.225.168',
    },
    async redirects() {
        return [
            {
                source: '/index',
                destination: '/home/banner',
                permanent: true,
            },
        ]
    },
}
