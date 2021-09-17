import React, { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import styled from 'styled-components';

import ContentHeader from '../../containers/ContentHeader';
import LightboxForm from '../LightboxForm';
import TagForm from './TagForm';

import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/home/tag.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';
import Service from '../../utils/admin.service';

const { lightboxTitle } = adminConst;

const TagWrapLayout = styled.div(() => ({
    marginBottom: '40px',
    'h3': {
        fontSize: '18px',
        marginBottom: '6px',
        '& + div': {
            padding: '0 20px',
        },
    },
    '.tag-item': {
        fontSize: '15px',
        marginRight: '16px',
        padding: '4px 10px',
        cursor: 'pointer',
    },
}));

const TagBase = ({ pageData }) => {

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

    const { tagDispatch } = useContext(TagContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: admin.pathnameKey(pathname),
        });

        tagDispatch({
            type: 'category_option',
            payload: pageData.data.category,
        });

    }, [pathname, globalDispatch, tagDispatch]);

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createTag' });

    return (

        <Fragment>
            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            />

            <div className="tag-container">
                {
                    Object.keys(pageData.data.tag).map((key) => (

                        <TagWrapLayout key={key}>
                            <h3>{pageData.data.category[key]}</h3>
                            <div>
                                {
                                    pageData.data.tag[key].map(({ id, name }) => (

                                            <Tag
                                                key={id}
                                                className="tag-item"
                                            >
                                                {name}
                                            </Tag>

                                    ))
                                }
                            </div>
                        </TagWrapLayout>

                    ))
                }
            </div>

            {
                visible &&
                    <LightboxForm
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <TagForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default TagBase;
