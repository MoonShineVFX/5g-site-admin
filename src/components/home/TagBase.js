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
import Prompt from '../Prompt';
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
        tagDelete,
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

    // ????????????
    const columns = [
        {
            title: '??????(ID)',
            dataIndex: 'id',
        },
        {
            title: '????????????',
            dataIndex: 'name',
            render: (name) => name ? <Tag>{name}</Tag> : '--',
        },
        {
            title: '??????',
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
            title: '?????? / ????????????',
            dataIndex: '',
            render: ({ createTime, updateTime }) => `${renderDateTime(createTime)} / ${renderDateTime(updateTime)}`,
        },
        {
            title: '?????? / ?????????',
            dataIndex: '',
            render: ({ creator, updater }) => `${renderWithoutValue(creator)} / ${renderWithoutValue(updater)}`,
        },
        {
            title: '??????',
            dataIndex: '',
            width: 200,
            render: (data) => (

                <Fragment>
                    <Buttons
                        text="??????"
                        onClick={() => btnUpdate(data)}
                    />
                    <Buttons
                        danger
                        text="??????"
                        onClick={() => btnDelete(data)}
                    />
                </Fragment>
            ),
        },
    ];

    // ?????? Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // ????????????
    const btnUpdate = ({ id, name, categoryId }) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateTag' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, name, categoryId },
        });

    };

    // ????????????
    const btnDelete = ({ id }) => {

        Prompt('confirm', {
            title: <Fragment>?????? <span className="small-text">(ID: {id})</span></Fragment>,
            mesg: '????????????????????????',
            callback: () => tagDelete(id),
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
