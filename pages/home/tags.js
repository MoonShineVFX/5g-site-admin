import TagBase from '../../src/components/home/TagBase';
import { TagProvider } from '../../src/context/home/tag.state';
import admin from '../../src/utils/admin';

const Tags = ({ pageData }) => (

    <TagProvider>
        <TagBase pageData={pageData} />
    </TagProvider>

);

export default Tags;

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
        url: '/tags_and_categories',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '標籤管理',
                data: data.data,
            },
        },
    };

}
