import NewsBase from '../src/components/news/NewsBase';
import admin from '../src/utils/admin';

const News = ({ pageData }) => (

    <NewsBase pageData={pageData} />

);

export default News;

export async function getServerSideProps () {

    const res = await admin.serviceServer({ url: '/news' });
    const { data } = res;

    if (!data.result) {

        return {
            notFound: true,
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
