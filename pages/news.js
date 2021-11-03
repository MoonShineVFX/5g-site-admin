import NewsBase from '../src/components/news/NewsBase';
import admin from '../src/utils/admin';

const News = ({ pageData }) => (

    <NewsBase pageData={pageData} />

);

export default News;

export async function getServerSideProps ({ req }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await admin.serviceServer({
        url: '/news',
        cookie: req.cookies.token
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '最新消息',
                data: data.data,
            },
        },
    };

}
