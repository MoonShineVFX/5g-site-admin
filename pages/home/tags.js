import TagBase from '../../src/components/home/TagBase';
import { TagProvider } from '../../src/context/home/tag.state';

const Tags = ({ pageData }) => (

    <TagProvider>
        <TagBase pageData={pageData} />
    </TagProvider>

);

export default Tags;

export async function getStaticProps () {

    // const res = await util.ServiceServer('api/user/userList');
    // const { data } = res;

    const res = await fetch('http://localhost:1002/json/home/tags.json');
    const data = await res.json();

    // 整理標籤結構
    const arrangeTagData = (data) => data.reduce((acc, obj) => {

        const key = obj.category;

        acc[key] = acc[key] || [];
        acc[key].push(obj);
        return acc;

    }, {});

    // 整理標籤類別結構
    const arrangeTagCategory = (data) => data.reduce((acc, { key, name }) => {

        acc[key] = name;
        return acc;

    }, {});

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
                data: {
                    tag: arrangeTagData(data.data.tag),
                    category: arrangeTagCategory(data.data.category),
                },
            },
        },
    };

}
