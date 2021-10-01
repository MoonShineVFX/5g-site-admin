import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Links from '../Links';
import Tables from '../Tables';
import Buttons from '../Buttons';

import { GlobalContext } from '../../context/global.state';
import { NewsContext } from '../../context/news/news.state';
import admin from '../../utils/admin';

const { pathnameKey } = admin;

// Mapping
const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

    acc[id] = name;
    return acc;

}, {});

const CreateBtnLayout = styled(Buttons)({
    float: 'none',
});

const TablesLayout = styled(Tables)({
    '.col-tags > div': {
        marginBottom: '6px',
    },
});

const antdTableFilter = (data) => data.reduce((acc, { category, categoryName }) => {

    const obj = { text: categoryName, value: category };

    // 檢查是否重複
    if (!acc.some((obj) => obj.value === category)) acc.push(obj);
    return acc;

}, []);

const NewsBase = ({ pageData }) => {

    // console.log('pageData:', pageData);
    const router = useRouter();

    // Context
    const {
        newsTag,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const {
        action,
        lists,
        newsDispatch,
    } = useContext(NewsContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(router.pathname, true),
        });

        newsDispatch({
            type: 'news_list',
            payload: {
                lists: pageData.data.list,
            },
        });

    }, [globalDispatch, router, newsDispatch]);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: '標題',
            dataIndex: 'title',
        },
        {
            title: '簡述',
            dataIndex: 'description',
            width: 300,
        },
        {
            title: '新聞分類',
            dataIndex: 'categoryName',
            render: (categoryName, { category }) => (category === '') ? '--' : `${categoryName}-${category}`,
            sorter: (a, b) => a.category.length - b.category.length,
            filters: antdTableFilter(newsTag),
            onFilter: (value, { category }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(category);

            },
        },
        {
            title: '標籤',
            dataIndex: 'tag',
            className: 'col-tags',
            render: (tag) => (

                tag.length ? (

                    tag.map((val) => (

                        <div key={val}>
                            <Tag>{mappingTagOpt(newsTag)[val]}</Tag>
                        </div>

                    ))

                ) : '--'
            ),
        },
        {
            title: '操作',
            dataIndex: '',
            width: 200,
            render: (data) => (

                <Buttons
                    text="編輯"
                    onClick={() => router.push(`/news/${data.id}`)}
                />
            ),
        },
    ];

    // 編輯按鈕
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateNews' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            >
                <CreateBtnLayout className="btn-create">
                    <Links url="/news/create">新增</Links>
                </CreateBtnLayout>
            </ContentHeader>

            <TablesLayout
                rowKey="id"
                columns={columns}
                data={action ? lists : pageData.data.list}
            />
        </Fragment>

    );

};

export default NewsBase;
