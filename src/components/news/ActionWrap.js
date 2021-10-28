import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import LightboxForm from '../LightboxForm';
import TextEditorForm from '../TextEditorForm';
import Checkbox from '../Checkbox';
import TagsBox from '../news/TagsBox';

import { GlobalContext } from '../../context/global.state';
import adminConst from '../../utils/admin.const';

const { lightboxTitle } = adminConst;

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

const IsHotLayout = styled.div({
    marginBottom: '16px',
    '.checkmark': {
        top: '2px',
    },
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
        verticalAlign: 'middle',
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

const NewsDescritptionLayout = styled(NewsTitleLayout)(() => ({
    '.field': {
        height: '100px',
        verticalAlign: 'top',
    },
}));

const ActionWrap = ({
    title,
    id,
    newsTitle,
    description,
    content,
    isHot,
    serviceKey,
}) => {

    // Router
    const router = useRouter();

    // Context
    const {
        visible,
        currEvent,
        newsTags,
        formStorageData,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [newsTtitle, setNewsTitle] = useState(newsTitle);
    const [newsDescription, setNewsDescription] = useState(description);
    const [isHotChecked, setIsHotChecked] = useState(isHot);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: 'news' });

    }, [globalDispatch]);

    // 隱藏 Modal
    const hideModal = () => lightboxDispatch({ type: 'HIDE' });

    // 設定標籤
    const targetTag = () => lightboxDispatch({ type: 'SHOW', currEvent: 'settingTag' });

    // 標題與簡述
    const handleChange = ({ target }) => {

        switch (target.name) {
            case 'title':
                setNewsTitle(target.value);
                break;

            case 'isHot':
                setIsHotChecked(target.checked);
                break;

            default:
                setNewsDescription(target.value);
                break;
        }

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
            </ContentHeader>

            <TagsWrapLayout>
                {
                    formStorageData.selected &&
                        <Fragment>
                            {
                                Object.keys(formStorageData.selected).map((key) => (

                                    formStorageData.selected[key].isChecked && <Tag key={key}>{mappingTagOpt(newsTags)[key]}</Tag>

                                ))
                            }
                        </Fragment>
                }
            </TagsWrapLayout>

            <TextEditorForm
                content={content}
                serviceKey={serviceKey}
                otherReqData={{
                    ...id && { id },
                    title: newsTtitle || '',
                    description: newsDescription || '',
                    isHot: isHotChecked || false,
                    tags: formStorageData.selected ? Object.keys(formStorageData.selected).filter((val) => formStorageData.selected[val].isChecked).map((val) => +val) : []
                }}
                successCallback={() => router.push('/news')}
            >
                <IsHotLayout>
                    <Checkbox
                        name="isHot"
                        value={isHot}
                        defaultChecked={isHotChecked}
                        onChange={handleChange}
                    >
                        設為熱門文章
                    </Checkbox>
                </IsHotLayout>

                <NewsTitleLayout>
                    文章標題:
                    <span className="field">
                        <input
                            type="text"
                            name="title"
                            placeholder="標題"
                            onChange={handleChange}
                            defaultValue={newsTitle}
                        />
                    </span>
                </NewsTitleLayout>

                <NewsDescritptionLayout>
                    文章簡述:
                    <span className="field">
                        <textarea
                            name="description"
                            placeholder="請輸入簡述"
                            onChange={handleChange}
                            defaultValue={description}
                        />
                    </span>
                </NewsDescritptionLayout>
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

ActionWrap.defaultProps = {
    content: '',
};

ActionWrap.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    newsTitle: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.any.isRequired, // html string
    serviceKey: PropTypes.string.isRequired,
};

export default ActionWrap;
