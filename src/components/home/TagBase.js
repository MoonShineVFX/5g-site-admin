import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Tag } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../../../src/components/Tables';
import Buttons from '../../../src/components/Buttons';
import LightboxForm from '../LightboxForm';
import LightboxFormStyle from '../LightboxFormStyle';
import TagForm from './TagForm';

import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/home/tag.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';

const {
    pathnameKey,
    antdTableFilter,
    renderWithoutValue,
    renderDateTime,
} = admin;

const { lightboxTitle } = adminConst;

const ColLayout = styled(Col)({
    marginLeft: '10px',
});

const TagFormLayout = styled.div(({ theme }) => ({
    border: `1px solid ${theme.palette.border}`,
    padding: '30px',
    '.items': {
        display: 'flex',
        '.row': {
            flex: 1,
            '&:not(:last-child)': {
                marginRight: '20px',
            },
        },
    },
    '.row-btns': {
        margin: '16px 0 0',
    },
}));

const UpdateTagFormLayout = styled(LightboxForm).attrs(() => ({
    className: 'updateTagForm',
}))({
    '.row-create-field, .btn-clone': {
        display: 'none',
    },
    '.items .row:nth-child(2)': {
        marginRight: 0,
    },
    'p': {
        display: 'block',
    },
});

const TablesLayout = styled(Tables)(() => ({
    '*': {
        fontSize: '15px',
    },
    '.ant-tag': {
        fontSize: '14px',
    },
}));

const TagBase = ({ pageData }) => {

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
        tagDispatch,
    } = useContext(TagContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        tagDispatch({
            type: 'category_option',
            payload: pageData.data.categories,
        });

        tagDispatch({
            type: 'tag_list',
            payload: pageData.data.tags,
        });

    }, [pathname, globalDispatch, tagDispatch]);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: '標籤名稱',
            dataIndex: 'name',
            render: (name) => name ? <Tag>{name}</Tag> : '--',
        },
        {
            title: '分類',
            dataIndex: 'categoryName',
            render: (categoryName, { categoryId }) => categoryId ? `${categoryName}-${categoryId}` : renderWithoutValue(categoryName),
            sorter: (a, b) => a.categoryId - b.categoryId,
            filters: antdTableFilter(pageData.data.categories),
            onFilter: (value, { categoryId }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(categoryId);

            },
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
                    onClick={() => btnUpdate(data)}
                />
            ),
        },
    ];

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // 編輯按鈕
    const btnUpdate = ({ id, name, categoryId }) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateTag' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, name, categoryId },
        });

    };

    return (

        <Fragment>
            <LightboxFormStyle />
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            />

            <Row gutter={20}>
                <Col flex="500px">
                    <TagFormLayout className="lightbox-wrap">
                        <TagForm />
                    </TagFormLayout>
                </Col>

                <ColLayout flex="1">
                    <TablesLayout
                        rowKey="id"
                        columns={columns}
                        data={action ? lists : pageData.data.tags}
                    />
                </ColLayout>
            </Row>

            {
                visible &&
                    <UpdateTagFormLayout
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <TagForm />
                    </UpdateTagFormLayout>
            }
        </Fragment>

    );

};

export default TagBase;
