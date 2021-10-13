module.exports = {
    env: {
        HOST: '35.206.225.168',
    },
    async redirects() {
        return [
            {
                source: '/index',
                destination: '/admin/home/banner',
                permanent: true,
            },
        ]
    },
}
