import { Fragment, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { blue } from '@ant-design/colors';
import { CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/home/tag.state';

const ActionLayout = styled.div.attrs(() => ({
    className: 'btn-clone',
}))({
    color: blue.primary,
    textAlign: 'right',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    '& > *': {
        cursor: 'pointer',
    },
    '*': {
        fontSize: '1.16em',
    },
    '.hide': {
        visibility: 'hidden',
    },
});

const CreateFieldLayout = styled.div.attrs(() => ({
    className: 'row row-create-field',
}))({
    fontSize: '14px',
    color: blue.primary,
    textDecoration: 'underline',
    cursor: 'pointer',
});

const TagForm = () => {

    // Context
    const {
        currEvent,
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    const {
        arrangeTagCategory,
        categoryOpt,
        tagCreate,
        tagUpdate,
    } = useContext(TagContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        reset,
        control,
    } = useForm({
        defaultValues: {
            tag: formStorageData ? [{ ...formStorageData }] : [{ name: '', category: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tag',
    });

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // remove
    const targetRemove = (index) => remove(index);

    // append
    const targetAppend = () => append({ name: '', category: '' });

    // reset
    const targetReset = () => reset({
        tag: [{ name: '', category: '' }],
    });

    // 送資料
    const handleReqData = (reqData) => {

        reqData = (currEvent === 'updateTag') ? [...reqData.tag][0] : reqData;

        if (currEvent === 'updateTag') tagUpdate(reqData);
        else tagCreate(reqData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <CreateFieldLayout onClick={targetAppend}>
                增加欄位
            </CreateFieldLayout>

            {
                fields.map((item, idx) => (

                    <Fragment key={item.id}>
                        <div className="items">
                            <FormRow labelTitle="標籤名稱">
                                <input
                                    type="text"
                                    name="name"
                                    control={control}
                                    defaultValue={item.name}
                                    {...register(`tag.${idx}.name`)}
                                />
                            </FormRow>

                            <div className="row">
                                <div className="title">標籤類別</div>
                                <div className="field noBorder">
                                    <select
                                        name="category"
                                        control={control}
                                        defaultValue={item.category}
                                        {...register(`tag.${idx}.category`)}
                                    >
                                        <option value="">請選擇</option>
                                        {
                                            Object.keys(arrangeTagCategory(categoryOpt)).map((key) => (
                                                <option
                                                    key={key}
                                                    value={key}
                                                >
                                                    {arrangeTagCategory(categoryOpt)[key]}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <ActionLayout>
                                <CloseCircleOutlined
                                    className={!idx && 'hide'}
                                    onClick={() => targetRemove(idx)}
                                />
                            </ActionLayout>
                        </div>
                    </Fragment>

                ))
            }

            <div className="row row-btns">
                {
                    (currEvent === 'updateTag') ? (

                        <Buttons
                            text="取消"
                            type="default"
                            onClick={hideModal}
                        />

                    ) : (

                        <Buttons
                            text="清除"
                            type="default"
                            onClick={targetReset}
                        />

                    )
                }

                <Buttons
                    text="送出"
                    htmlType="submit"
                />
            </div>
        </form>

    );

};

export default TagForm;
