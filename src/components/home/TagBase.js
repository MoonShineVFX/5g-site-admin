import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import LightboxForm from '../LightboxForm';
import LightboxFormStyle from '../LightboxFormStyle';
import TagContainer from './TagContainer';
import TagForm from './TagForm';

import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/home/tag.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';

const { lightboxTitle } = adminConst;

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

const ColLayout = styled(Col)({
    marginLeft: '40px',
});

const TagBase = ({ pageData }) => {

    // console.log('pageData:', pageData.data);
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
        arrangeTagData,
        arrangeTagCategory,
        tagDispatch,
    } = useContext(TagContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: admin.pathnameKey(pathname),
        });

        tagDispatch({
            type: 'category_option',
            payload: pageData.data.category,
        });

        tagDispatch({
            type: 'tag_list',
            payload: pageData.data.tag,
        });

    }, [pathname, globalDispatch, tagDispatch]);

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

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

                <ColLayout flex="auto">
                    <TagContainer
                        tag={arrangeTagData(action ? lists : pageData.data.tag)}
                        category={arrangeTagCategory(pageData.data.category)}
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
