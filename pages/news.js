import NewsBase from '../src/components/news/NewsBase';
import { NewsProvider } from '../src/context/news/news.state';

const News = ({ pageData }) => (

    <NewsProvider>
        <NewsBase pageData={pageData} />
    </NewsProvider>

);

export default News;

export async function getStaticProps () {

    // const res = await util.ServiceServer('api/user/userList');
    // const { data } = res;

    const res = await fetch('http://localhost:1002/json/news.json');
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    return {
        props: {
            pageData: {
                title: '最新消息',
                data: data.data,
            },
        },
    };

}
