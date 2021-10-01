import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ActionWrap from '../../src/components/news/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

// Mapping
const mappingCheckbox = (data) => data.reduce((acc, curr) => {

    acc[curr] = true;
    return acc;

}, {});

// 整理分類資料結構
const arrangeCategory = (data) => data.reduce((acc, obj) => {

    const key = obj.id;
    acc[key] = acc[key] || {};
    // acc[key].tag = acc[key].tag || [];
    acc[key].name = obj.name;
    acc[key].category = obj.category;
    acc[key].categoryName = obj.categoryName;
    // acc[key].tag.push(obj);
    return acc;

}, {});

const NewsDetail = ({ pageData }) => {

    // console.log('pageData:', pageData)

    // Context
    const { newsTag, globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'news',
        });

        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                selectedCheckbox: mappingCheckbox(pageData.data.tag),
                // selectedCate: Object.keys(mappingCheckbox(pageData.data.tag)).map((key) => arrangeCategory(newsTag)[key].category),
            },
        });

    }, [globalDispatch]);

    console.log('selectedCate:', arrangeCategory(newsTag))
    console.log('selectedCheckbox:', mappingCheckbox(pageData.data.tag))
    // console.log('check:', Object.keys(mappingCheckbox(pageData.data.tag)).map((key) => arrangeCategory(newsTag)[key]))

    return (

        <ActionWrap
            title={pageData.title}
            newsTitle={pageData.data.title}
            content={pageData.data.detail}
            serviceKey="newsUpdate"
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
