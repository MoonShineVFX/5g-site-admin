import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/news/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';

// Mapping
const mappingCheckbox = (data, tags) => data.reduce((acc, curr) => {

    // 先找到對應的
    let temp = tags.find((obj) => obj.id === curr);
    acc[curr] = acc[curr] || {};
    acc[curr].isChecked = true;
    acc[curr].category = temp?.categoryKey;
    return acc;

}, {});

const NewsDetail = ({ pageData }) => {

    // Context
    const {
        newsTags,
        globalDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'news',
        });

        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                selected: mappingCheckbox(pageData.data.tags, newsTags),
                category: Object.keys(mappingCheckbox(pageData.data.tags, newsTags)).map((key) => mappingCheckbox(pageData.data.tags, newsTags)[key].category)[0],
            },
        });

    }, [globalDispatch, formStorageDispatch, newsTags]);

    return (

        <ActionWrap
            title={pageData.title}
            id={pageData.data.id}
            newsTitle={pageData.data.title}
            description={pageData.data.description}
            content={pageData.data.detail}
            isHot={pageData.data.isHot}
            serviceKey="newsUpdate"
        />

    );

};

export default NewsDetail;

export async function getServerSideProps ({ params }) {

    const response = await admin.serviceServer({
        method: 'get',
        url: `/news/${+params.id}`,
    });

    const { data } = response;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: '編輯文章',
                data: data.data,
            },
        },
    };

}
