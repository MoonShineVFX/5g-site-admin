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
    const [selected, setSelected] = useState({ ...formStorageData.selected });

    // 隱藏 Modal
    const hideModal = () => lightboxDispatch({ type: 'HIDE' });

    // Radio Button
    const handleChangeCategory = ({ target }) => {

        setSelected({}); // 更換類別時，需還原已選取的標籤
        setCurrCate(target.value);
        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                ...formStorageData,
                category: target.value,
            },
        });

    };

    // Checkbox
    const handleChangeCheckbox = ({ target: { value, checked } }) => {

        setSelected({
            ...selected,
            [value]: {
                isChecked: checked,
                category: currCate,
            },
        });

    };

    // Cancel: 還原全部
    const handleCancel = () => {

        hideModal();
        setSelected({});

    };

    // Submit
    const handleSubmit = () => {

        hideModal();
        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                ...formStorageData,
                selected,
            },
        });

    };

    // console.log('selected:', selected);

    return (

        <TagsBoxLayout>
            <div className="row">
                <div className="title">新聞分類</div>
                <div className="field noBorder">
                    <RadioGroup
                        name="category"
                        className="form-radios"
                        defaultValue={formStorageData.category ? formStorageData.category : currCate}
                        onChange={handleChangeCategory}
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
                        arrangeCategory(newsTag)[formStorageData.category ? formStorageData.category : currCate].tag.map(({ id, name }) => (

                            <Checkbox
                                key={id}
                                name="tag"
                                value={id}
                                defaultChecked={selected ? selected[id]?.isChecked : ''}
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
                    onClick={handleSubmit}
                />
            </div>
        </TagsBoxLayout>

    );

};

export default TagsBox;
