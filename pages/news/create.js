import { Fragment, useContext, useEffect } from 'react';
import { Tag } from 'antd';
import { PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import Buttons from '../../src/components/Buttons';
import Checkbox from '../../src/components/Checkbox';
import Links from '../../src/components/Links';
import LightboxForm from '../../src/components/LightboxForm';
import TextEditorForm from '../../src/components/TextEditorForm';
import TagsBox from '../../src/components/news/TagsBox';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';
import adminConst from '../../src/utils/admin.const';

const { lightboxTitle } = adminConst;

const title = '新增文章';

const SettingTagLayout = styled.span({
    color: blue.primary,
    float: 'none',
    cursor: 'pointer',
    '*': {
        fontSize: '15px',
        color: blue.primary,
    },
});

const NewsCreate = () => {

    // Context
    const {
        visible,
        currEvent,
        formStorageData,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'news',
        });

    }, [globalDispatch]);

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    //
    const targetTag = () => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'settingTag' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    return (

        <Fragment>
            <HeadTag title={title} />

            <ContentHeader
                title={title}
                showButton={false}
            >
                <SettingTagLayout onClick={targetTag}>
                    <PlusOutlined /> 設定標籤
                </SettingTagLayout>

                <div className="tagsWrap">
                    {
                        formStorageData.selected.map(() => (

                            <Tag>{mappingTagOpt(newsTag)[val]}</Tag>

                        ))
                    }
                </div>
            </ContentHeader>

            <TextEditorForm
                name="detail"
                serviceKey="newsCreate"
            />

            {
                visible &&
                    <LightboxForm
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <TagsBox />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default NewsCreate;
