import {
    Fragment,
    useContext,
    useEffect,
    useState
} from 'react';

import { useRouter } from 'next/router';
import { Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';

import HeadTag from '../../src/containers/HeadTag';
import ContentHeader from '../../src/containers/ContentHeader';
import Buttons from '../../src/components/Buttons';
import LightboxForm from '../../src/components/LightboxForm';
import TextEditorForm from '../../src/components/TextEditorForm';
import TagsBox from '../../src/components/news/TagsBox';

import { GlobalContext } from '../../src/context/global.state';
import adminConst from '../../src/utils/admin.const';

const { lightboxTitle } = adminConst;
const title = '新增文章';

// Mapping
const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

    acc[id] = name;
    return acc;

}, {});

const SettingTagLayout = styled.span({
    color: blue.primary,
    float: 'none',
    cursor: 'pointer',
    '*': {
        fontSize: '15px',
        color: blue.primary,
    },
});

const TagsWrapLayout = styled.div({
    minHeight: '27px',
    marginBottom: '16px',
});

const NewsTitleLayout = styled.div(({ theme }) => ({
    marginBottom: '16px',
    '.field': {
        minWidth: '300px',
        height: '34px',
        fontSize: '15px',
        border: `1px solid ${theme.palette.border}`,
        borderRadius: '2px',
        display: 'inline-block',
        marginLeft: '10px',
        padding: '4px 8px',
        transition: 'all .3s ease-in-out',
        '&:hover': {
            borderColor: blue.primary,
        },
    },
    'input': {
        width: '100%',
        outline: 0,
    },
}));

const NewsCreate = () => {

    //
    const router = useRouter();

    // Context
    const {
        visible,
        currEvent,
        newsTag,
        formStorageData,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [newsTtitle, setNewsTitle] = useState('');

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'news',
        });

    }, [globalDispatch]);

    // 隱藏 Modal
    const hideModal = () => lightboxDispatch({ type: 'HIDE' });

    // 設定標籤
    const targetTag = () => lightboxDispatch({ type: 'SHOW', currEvent: 'settingTag' });

    // 標題
    const handleChange = ({ target: { value } }) => setNewsTitle(value);

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
            </ContentHeader>

            <TagsWrapLayout>
                {
                    formStorageData.selectedCheckbox &&
                        <Fragment>
                            {
                                Object.keys(formStorageData.selectedCheckbox).map((key) => (

                                    formStorageData.selectedCheckbox[key] && <Tag key={key}>{mappingTagOpt(newsTag)[key]}</Tag>

                                ))
                            }
                        </Fragment>
                }
            </TagsWrapLayout>

            <TextEditorForm
                serviceKey="newsCreate"
                otherReqData={{
                    title: newsTtitle,
                    tag: formStorageData.selectedCheckbox ? Object.keys(formStorageData.selectedCheckbox).filter((val) => formStorageData.selectedCheckbox[val]) : []
                }}
                successCallback={() => router.push('/news')}
            >
                <NewsTitleLayout>
                    文章標題:
                    <span className="field">
                        <input
                            type="text"
                            placeholder="標題"
                            onChange={handleChange}
                        />
                    </span>
                </NewsTitleLayout>
            </TextEditorForm>

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
