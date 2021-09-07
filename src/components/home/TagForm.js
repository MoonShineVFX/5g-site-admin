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
    '& + p': {
        display: 'none',
    },
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
            tags: formStorageData ? [{ ...formStorageData }] : [{ name: '', categoryId: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tags',
    });

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // remove
    const targetRemove = (index) => remove(index);

    // append
    const targetAppend = () => append({ name: '', categoryId: '' });

    // reset
    const targetReset = () => reset({
        tags: [{ name: '', categoryId: '' }],
    });

    // 送資料
    const handleReqData = (reqData) => {

        // 將 categoryId 轉為 number
        if (currEvent === 'updateTag') {

            reqData = [...reqData.tags][0];
            reqData.categoryId = +reqData.categoryId;

        }
        else {

            reqData.tags.map((obj) => {

                obj.categoryId = obj.categoryId ? +obj.categoryId : null;
                return obj;

            });

        }

        if (currEvent === 'updateTag') tagUpdate(reqData);
        else tagCreate(reqData);
        targetReset();

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <CreateFieldLayout onClick={targetAppend}>
                增加欄位
            </CreateFieldLayout>

            {(currEvent === 'updateTag') && <p>id: {formStorageData.id}</p>}

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
                                    {...register(`tags.${idx}.name`)}
                                />
                            </FormRow>

                            <div className="row">
                                <div className="title">標籤類別</div>
                                <div className="field noBorder">
                                    <select
                                        name="categoryId"
                                        control={control}
                                        defaultValue={item.categoryId}
                                        {...register(`tags.${idx}.categoryId`)}
                                    >
                                        <option value="">請選擇</option>
                                        {
                                            categoryOpt.map(({ id, name }) => (

                                                <option
                                                    key={id}
                                                    value={id}
                                                >
                                                    {name}
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
