module.exports = {
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
