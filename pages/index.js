const Home = () => <h1>這是首頁</h1>;

export default Home;

export async function getStaticProps () {

    return {
        redirect: {
            destination: '/admin/home/banner',
            permanent: false,
        },
    };

}
