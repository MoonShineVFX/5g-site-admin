import TagBase from '../../src/components/home/TagBase';
import { TagProvider } from '../../src/context/home/tag.state';
import admin from '../../src/utils/admin';

const Tags = ({ pageData }) => (

    <TagProvider>
        <TagBase pageData={pageData} />
    </TagProvider>

);

export default Tags;

export async function getStaticProps () {

    const res = await admin.serviceServer({ url: '/tags_and_categories' });
    const { data } = res;

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
                title: '標籤管理',
                data: data.data,
            },
        },
    };

}
