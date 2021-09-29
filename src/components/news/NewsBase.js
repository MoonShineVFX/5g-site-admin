import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Buttons from '../Buttons';
import LightboxForm from '../LightboxForm';
import NewsForm from '../news/NewsForm';

import { GlobalContext } from '../../context/global.state';
import { NewsContext } from '../../context/news/news.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';

const { pathnameKey } = admin;
const { lightboxTitle } = adminConst;

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

const BannerBase = ({ pageData }) => {

    // console.log('pageData:', pageData);
    const { pathname } = useRouter();

    // Context
    const {
        visible,
        currEvent,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const {
        action,
        lists,
        tagOpt,
        newsDispatch,
    } = useContext(NewsContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname, true),
        });

        newsDispatch({
            type: 'tag_option',
            payload: pageData.data.tag,
        });

        newsDispatch({
            type: 'news_list',
            payload: {
                lists: pageData.data.list,
            },
        });

    }, [globalDispatch, pathname, newsDispatch]);

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
            filters: antdTableFilter(pageData.data.tag),
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
                            <Tag>{mappingTagOpt(tagOpt)[val]}</Tag>
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
                    onClick={() => btnUpdate(data)}
                />
            ),
        },
    ];

    // Mapping
    const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

        acc[id] = name;
        return acc;

    }, {});

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createNews' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateNews' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            />

            <TablesLayout
                rowKey="id"
                columns={columns}
                data={action ? lists : pageData.data.list}
            />

            {
                visible &&
                    <LightboxForm
                        width={600}
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <NewsForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default BannerBase;
