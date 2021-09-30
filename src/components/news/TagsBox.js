import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import styled from 'styled-components';

import { FormRow } from '../LightboxForm';
import Checkbox from '../Checkbox';
import Buttons from '../Buttons';

import { GlobalContext } from '../../context/global.state';
import { NewsContext } from '../../context/news/news.state';
import admin from '../../utils/admin';

// 整理分類資料結構
const arrangeCategory = (data) => data.reduce((acc, obj) => {

    const key = obj.category;
    acc[key] = acc[key] || {};
    acc[key].tag = acc[key].tag || [];
    acc[key].label = obj.categoryName;
    acc[key].tag.push(obj);
    return acc;

}, {});

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
    const [checkboxes, setCheckboxes] = useState({});

    // 隱藏 Modal
    const hideModal = () => lightboxDispatch({ type: 'HIDE' });

    // 下拉選單
    const handleChangeOpt = ({ target }) => {

        setCurrCate(target.value);
        formStorageDispatch({ type: 'CLEAR' });

    };

    // Checkbox
    const handleChangeCheckbox = ({ target: { value, checked } }) => {

        setCheckboxes({ ...checkboxes, [value]: checked });

        // let selected = {};
        // selected = {
        //     ...selected,
        //     [value]: checked,
        // };

        // console.log('selected:', selected)

        formStorageDispatch({
            type: 'COLLECT',
            payload: {
                selected: Object.keys(checkboxes).filter((val) => val),
            },
        });

    };

    // Cancel
    const handleCancel = () => {

        hideModal();
        formStorageDispatch({ type: 'CLEAR' });

    };

    return (

        <Fragment>
            <div className="row">
                <div className="title">新聞分類</div>
                <div className="field noBorder">
                    <select
                        name="category"
                        // defaultValue={formStorageData.priority}
                        onChange={handleChangeOpt}
                    >
                        {
                            Object.keys(arrangeCategory(newsTag)).map((key) => (
                                <option
                                    key={key}
                                    value={key}
                                >
                                    {arrangeCategory(newsTag)[currCate].label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="row">
                {
                    arrangeCategory(newsTag)[currCate].tag.map(({ id, name }, idx) => (

                        <div
                            key={id}
                            className="checkbox-item"
                        >
                            <Checkbox
                                name="tag"
                                value={id}
                                // defaultChecked={formStorageData?.tag?.some((val) => val === id)}
                                onChange={handleChangeCheckbox}
                            >
                                {name}-{id}
                            </Checkbox>
                        </div>

                    ))
                }
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
        </Fragment>

    );

};

export default TagsBox;
