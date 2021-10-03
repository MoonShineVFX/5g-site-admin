import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ActionWrap from '../../src/components/news/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

// Mapping
const mappingCheckbox = (data, tags) => data.reduce((acc, curr) => {

    // 先找到對應的
    let temp = tags.find((obj) => obj.id === curr);
    acc[curr] = acc[curr] || {};
    acc[curr].isChecked = true;
    acc[curr].category = temp?.category;
    return acc;

}, {});

const NewsDetail = ({ pageData }) => {

    // console.log('pageData:', pageData)
    const router = useRouter();

    // Context
    const {
        newsTag,
        formStorageData,
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
                selected: mappingCheckbox(pageData.data.tag, newsTag),
                category: formStorageData.selected && Object.keys(mappingCheckbox(pageData.data.tag, newsTag)).map((key) => mappingCheckbox(pageData.data.tag, newsTag)[key].category)[0],
            },
        });

    }, [globalDispatch, formStorageDispatch, newsTag]);

    return (

        <ActionWrap
            title={pageData.title}
            newsTitle={pageData.data.title}
            content={pageData.data.detail}
            serviceKey="newsUpdate"
            successCallback={() => router.reload()}
        />

    );

};

export default NewsDetail;

export async function getStaticPaths () {

    const res = await fetch('http://localhost:1002/json/news/news.json');
    const data = await res.json();
    const paths = data.data.list.map((obj) => ({
        params: { id: obj.id },
    }));

    return { paths, fallback: false };

}

export async function getStaticProps ({ params }) {

    const res = await fetch(`http://localhost:1002/json/news/${params.id}.json`);
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/news',
                permanent: false,
            },
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
