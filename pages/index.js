const Home = () => <h1>這是首頁</h1>;

export default Home;

export async function getStaticProps () {

    return {
        redirect: {
            destination: '/home/banner',
            permanent: false,
        },
    };

}
