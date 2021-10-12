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

const { pathnameKey, renderWithoutValue, renderDateTime } = admin;

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

    console.log('pageData:', pageData);
    const router = useRouter();

    // Context
    const { newsTags, globalDispatch } = useContext(GlobalContext);

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
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '簡述',
            dataIndex: 'description',
            width: 300,
            render: (description) => renderWithoutValue(description),
        },
        {
            title: '新聞分類',
            dataIndex: 'categoryName',
            render: (categoryName, { categoryId }) => categoryId ? `${categoryName}-${categoryId}` : renderWithoutValue(categoryName),
            sorter: (a, b) => a.categoryId - b.categoryId,
            filters: antdTableFilter(newsTags),
            onFilter: (value, { categoryId }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(categoryId);

            },
        },
        {
            title: '標籤',
            dataIndex: 'tags',
            className: 'col-tags',
            render: (tags) => (

                (tags.length && newsTags.length) ? (

                    tags.map((val) => (

                        <div key={val}>
                            <Tag>{mappingTagOpt(newsTags)[val]}</Tag>
                        </div>

                    ))

                ) : '--'
            ),
        },
        {
            title: '新增 / 編輯時間',
            dataIndex: '',
            render: ({ createTime, updateTime }) => `${renderDateTime(createTime)} / ${renderDateTime(updateTime)}`,
        },
        {
            title: '新增 / 編輯者',
            dataIndex: '',
            render: ({ creator, updater }) => `${renderWithoutValue(creator)} / ${renderWithoutValue(updater)}`,
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
