import { useContext, useState } from 'react';
import { Radio } from 'antd';
import styled from 'styled-components';
import Checkbox from '../Checkbox';
import Buttons from '../Buttons';
import { GlobalContext } from '../../context/global.state';

const RadioGroup = Radio.Group;

// 整理分類資料結構
const arrangeCategory = (data) => data.reduce((acc, obj) => {

    const key = obj.category;
    acc[key] = acc[key] || {};
    acc[key].tag = acc[key].tag || [];
    acc[key].label = obj.categoryName;
    acc[key].tag.push(obj);
    return acc;

}, {});

const TagsBoxLayout = styled.div({
    '*': {
        fontSize: '15px',
    },
    '.ant-radio-wrapper': {
        marginRight: '16px',
    },
    '.checkboxItemWrap': {
        lineHeight: 1.2,
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both',
        },
        '> *': {
            float: 'left',
            margin: '0 20px 10px 0',
        },
    },
});

const TagsBox = () => {

    // Context
    const {
        newsTag,
        formStorageData,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // State
    const [currCate, setCurrCate] = useState('news');

    // 隱藏 Modal
    const hideModal = () => lightboxDispatch({ type: 'HIDE' });

    // 下拉選單
    const handleChangeOpt = ({ target }) => {

        setCurrCate(target.value);
        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                selectedCate: target.value,
            },
        });

    };

    // Checkbox
    const handleChangeCheckbox = ({ target: { value, checked } }) => {

        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                ...formStorageData,
                selectedCheckbox: {
                    ...formStorageData.selectedCheckbox,
                    [value]: checked,
                },
            },
        });

    };

    // Cancel
    const handleCancel = () => {

        hideModal();
        formStorageDispatch({ type: 'CLEAR' });

    };

    return (

        <TagsBoxLayout>
            <div className="row">
                <div className="title">新聞分類</div>
                <div className="field noBorder">
                    <RadioGroup
                        name="category"
                        className="form-radios"
                        defaultValue={formStorageData?.selectedCate ? formStorageData.selectedCate : currCate}
                        onChange={handleChangeOpt}
                    >
                        {
                            Object.keys(arrangeCategory(newsTag)).map((key) => (

                                <Radio
                                    key={key}
                                    value={key}
                                >
                                    {arrangeCategory(newsTag)[key].label}
                                </Radio>

                            ))
                        }
                    </RadioGroup>
                </div>
            </div>

            <div className="row">
                <div className="title">標籤</div>
                <div className="checkboxItemWrap">
                    {
                        arrangeCategory(newsTag)[formStorageData?.selectedCate ? formStorageData.selectedCate : currCate].tag.map(({ id, name }) => (

                            <Checkbox
                                key={id}
                                name="tag"
                                value={id}
                                defaultChecked={formStorageData?.selectedCheckbox ? formStorageData.selectedCheckbox[id] : ''}
                                onChange={handleChangeCheckbox}
                            >
                                {name}-{id}
                            </Checkbox>

                        ))
                    }
                </div>
            </div>

            <div className="row row-btns">
                <Buttons
                    text="取消"
                    type="default"
                    onClick={handleCancel}
                />
                <Buttons
                    text="送出"
                    onClick={hideModal}
                />
            </div>
        </TagsBoxLayout>

    );

};

export default TagsBox;
