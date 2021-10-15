import NewsBase from '../src/components/news/NewsBase';
import { NewsProvider } from '../src/context/news/news.state';
import admin from '../src/utils/admin';

const News = ({ pageData }) => (

    <NewsProvider>
        <NewsBase pageData={pageData} />
    </NewsProvider>

);

export default News;

export async function getStaticProps () {

    const res = await admin.serviceServer({ url: '/news' });
    const { data } = res;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        revalidate: 3,
        props: {
            pageData: {
                title: '最新消息',
                data: data.data,
            },
        },
    };

}
