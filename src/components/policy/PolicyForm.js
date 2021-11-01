import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';
import Buttons from '../Buttons';
import Checkbox from '../Checkbox';
import { FormRow } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { PolicyContext } from '../../context/policy/policy.state';

// 整理分類資料結構
const arrangeCategory = (data) => data.reduce((acc, obj) => {

    const key = obj.categoryKey;
    acc[key] = acc[key] || {};
    acc[key].tags = acc[key].tags || [];
    acc[key].label = obj.categoryName;
    acc[key].tags.push(obj);
    return acc;

}, {});

//
const FormWrapLayout = styled.form({
    '.row.textarea .field': {
        minHeight: '100px',
    },
    '.warning-text': {
        color: blue.primary,
    },
});

//
const CheckboxWrapLayout = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -10px 40px',
    '.checkboxGrid': {
        flex: '1',
        padding: '0 10px',
    },
    'h4': {
        marginBottom: '4px',
    },
    '.checkbox-item': {
        marginBottom: '8px',
    },
});

//
const PolicyForm = () => {

    // Context
    const {
        policyTags,
        currEvent,
        formStorageData,
        formStorageDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    const { policyCreate, policyUpdate } = useContext(PolicyContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            tags: reqData.tags.filter((val) => val).map((val) => +val),
            ...formStorageData.id ? { id: formStorageData.id } : null,
        };

        if (currEvent === 'updatePolicy') policyUpdate(reqData);
        else policyCreate(reqData);

    };

    return (

        <FormWrapLayout onSubmit={handleSubmit(handleReqData)}>
            {(currEvent === 'updatePolicy') && <p>id: {formStorageData.id}</p>}

            <div className="items">
                <FormRow
                    labelTitle="標題"
                    required={true}
                    error={errors.title && true}
                >
                    <input
                        type="text"
                        name="title"
                        defaultValue={formStorageData.title}
                        {...register('title', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="次標題"
                    required={true}
                    error={errors.titleSecondary && true}
                >
                    <input
                        type="text"
                        name="titleSecondary"
                        defaultValue={formStorageData.titleSecondary}
                        {...register('titleSecondary', { required: true })}
                    />
                </FormRow>
            </div>

            <FormRow
                labelTitle="介紹"
                className="textarea"
                noBorder={true}
            >
                <textarea
                    name="description"
                    defaultValue={formStorageData.description}
                    {...register('description')}
                />
            </FormRow>

            <div className="items">
                <FormRow
                    labelTitle="聯絡單位"
                    required={true}
                    error={errors.contactUnit && true}
                >
                    <input
                        type="text"
                        name="contactUnit"
                        defaultValue={formStorageData.contact?.unit}
                        {...register('contactUnit', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="聯絡人"
                    required={true}
                    error={errors.contactName && true}
                >
                    <input
                        type="text"
                        name="contactName"
                        defaultValue={formStorageData.contact?.name}
                        {...register('contactName', { required: true })}
                    />
                </FormRow>
            </div>

            <div className="items">
                <FormRow
                    labelTitle="聯絡電話"
                    required={true}
                    error={errors.contactPhone && true}
                    {...(errors.contactPhone?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="contactPhone"
                        placeholder="02-22222222"
                        defaultValue={formStorageData.contact?.phone}
                        {...register('contactPhone', {
                            required: true,
                            pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g,
                        })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="傳真"
                    required={true}
                    error={errors.contactFax && true}
                >
                    <input
                        type="text"
                        name="contactFax"
                        defaultValue={formStorageData.contact?.fax}
                        {...register('contactFax', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="聯絡信箱"
                    required={true}
                    error={errors.contactEmail && true}
                    {...(errors.contactEmail?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="contactEmail"
                        placeholder="xxx@xxx.com"
                        defaultValue={formStorageData.contact?.email}
                        {...register('contactEmail', {
                            required: true,
                            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g,
                        })}
                    />
                </FormRow>
            </div>

            <div className="items">
                <FormRow labelTitle="資金額度">
                    <input
                        type="text"
                        name="amountQuota"
                        defaultValue={formStorageData.amountQuota}
                        {...register('amountQuota')}
                    />
                </FormRow>

                <FormRow
                    labelTitle="網站連結 (URL)"
                    error={errors.link && true}
                    {...(errors.link?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="link"
                        placeholder="請輸入完整連結 (https 或 http)"
                        defaultValue={formStorageData.link}
                        {...register('link', {
                            pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                        })}
                    />
                </FormRow>
            </div>

            <FormRow
                labelTitle="申請方式"
                className="textarea"
                noBorder={true}
            >
                <textarea
                    name="applicationWay"
                    defaultValue={formStorageData.applicationWay}
                    {...register('applicationWay')}
                />
            </FormRow>

            <FormRow
                labelTitle="申請對象"
                className="textarea"
                noBorder={true}
            >
                <textarea
                    name="applicationObject"
                    defaultValue={formStorageData.applicationObject}
                    {...register('applicationObject')}
                />
            </FormRow>

            <div className="row row-checkbox">
                <div className="warning-text">(請勿選取不同類別)</div>
                <CheckboxWrapLayout>
                    {
                        Object.keys(arrangeCategory(policyTags)).map((key) => (

                            <div
                                key={key}
                                className="checkboxGrid"
                            >
                                <h4>{arrangeCategory(policyTags)[key].label}</h4>
                                <div className="checkboxItemWrap">
                                    {
                                        arrangeCategory(policyTags)[key].tags.map(({ id, name }, idx) => (

                                            <div
                                                key={idx}
                                                className="checkbox-item"
                                            >
                                                <Checkbox
                                                    name="tags"
                                                    value={id}
                                                    defaultChecked={formStorageData?.tags?.some((val) => val === id)}
                                                    register={register(`tags.${idx}`)}
                                                    data-key={key}
                                                >
                                                    {name}-{id}
                                                </Checkbox>
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>


                        ))
                    }
                </CheckboxWrapLayout>
            </div>

            <div className="row row-btns">
                <Buttons
                    text="取消"
                    type="default"
                    onClick={hideModal}
                />
                <Buttons
                    text="送出"
                    htmlType="submit"
                />
            </div>
        </FormWrapLayout>

    );

};

export default PolicyForm;
