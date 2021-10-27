import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import { Row, Col, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { FormRow, ErrorMesg } from '../LightboxForm';
import Upload from '../Upload';
import {
    FormWrap,
    ActionLayout,
    CreateFieldLayout,
} from './PlaceFormLayout';

import { GlobalContext } from '../../context/global.state';
import adminConst from '../../utils/admin.const';

const { placeConfig } = adminConst;

// Mapping
const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

    acc[id] = name;
    return acc;

}, {});

//
const PlaceForm = ({
    title,
    id,
    newsTitle,
    description,
    content,
    isHot,
    serviceKey,
    successCallback,
}) => {

    // Router
    const router = useRouter();

    // Context
    const {
        formStorageData,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            ...formStorageData,
            links: formStorageData ? [{ ...formStorageData }] : [{ name: '', url: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'links',
    });

    // remove
    const targetRemove = (index) => remove(index);

    // append
    const targetAppend = () => append({ name: '', url: '' });

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            ...formStorageData?.file && { file: formStorageData?.file },
            ...formStorageData.id ? { id: formStorageData.id } : null,
        };

        console.log('reqData:', reqData)

        // 檢查: 圖片尺寸
        // if (formStorageData?.files) {

        //     const limitSize = (reqData.image.size / 1024 / 1024) < 5;

        //     // 檢查圖片大小是否超過 5MB
        //     if (!limitSize) {

        //         message.error('檔案不能超過 5MB，請重新上傳');
        //         return;

        //     }

        // }

        // 先排除 tags
        // for (let key in reqData) {

        //     if (key !== 'tags') formData.append(key, reqData[key]);

        // }

        // // 為了 tags 陣列而轉格式
        // for (let i = 0; i < reqData.tags.length; i++) {

        //     formData.append('tags', reqData.tags[i]);

        // }

        // if (currEvent === 'updatePartner') partnerUpdate(formData);
        // else partnerCreate(formData);

    };

    console.log('errors:', errors)

    return (

        <Fragment>
            <LightboxFormStyle />

            <FormWrap onSubmit={handleSubmit(handleReqData)}>
                <Row>
                    <Col span={12} className="left">
                        <div className="row row-thumb">
                            <h3>列表頁縮圖</h3>
                            <Upload size="563x312" />
                        </div>

                        <hr />

                        <div className="row">
                            <h3>
                                相關連結
                                <CreateFieldLayout onClick={targetAppend}>
                                    增加欄位
                                </CreateFieldLayout>
                            </h3>

                            {
                                fields.map((item, idx) => (

                                    <Fragment key={item.id}>
                                        <div className="items">
                                            <FormRow labelTitle="名稱">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    control={control}
                                                    defaultValue={item.name}
                                                    {...register(`links.${idx}.name`)}
                                                />
                                            </FormRow>

                                            <FormRow
                                                labelTitle="連結(URL)"
                                                error={errors.links && errors.links[idx]?.url && true}
                                                {...(errors.links && errors.links[idx]?.url.type === 'pattern') && { errorMesg: '格式錯誤' }}
                                            >
                                                <input
                                                    type="text"
                                                    name="url"
                                                    control={control}
                                                    defaultValue={item.url}
                                                    placeholder="請輸入完整連結 (https 或 http)"
                                                    {...register(`links.${idx}.url`, {
                                                        pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                                                    })}
                                                />
                                            </FormRow>

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
                        </div>
                    </Col>

                    <Col flex={1}>
                        <div className="items">
                            <FormRow
                                labelTitle="場域名稱"
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

                            <div className={`row radio-button ${errors.type ? 'hasError' : ''}`}>
                                <div className="title isRequired">場域分類 (必填)</div>
                                <div className="field noBorder">
                                    {
                                        Object.keys(placeConfig).map((key) => (

                                            <label key={key}>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    defaultValue={key}
                                                    defaultChecked={(formStorageData.type === key)}
                                                    {...register('type', { required: true })}
                                                />
                                                {placeConfig[key]}
                                            </label>

                                        ))
                                    }
                                </div>

                                {errors.type && <ErrorMesg />}
                            </div>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="地址"
                                required={true}
                                error={errors.address && true}
                            >
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={formStorageData.address}
                                    {...register('address', { required: true })}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="地址連結 (URL)"
                                error={errors.locationUrl && true}
                                {...(errors.locationUrl?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                            >
                                <input
                                    type="text"
                                    name="locationUrl"
                                    defaultValue={formStorageData.locationUrl}
                                    placeholder="請輸入完整連結 (https 或 http)"
                                    {...register('locationUrl', {
                                        pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                                    })}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="聯絡單位"
                                required={true}
                                error={errors.contactUnit && true}
                            >
                                <input
                                    type="text"
                                    name="contactUnit"
                                    defaultValue={formStorageData.contactUnit}
                                    {...register('contactUnit', { required: true })}
                                />
                            </FormRow>

                            <FormRow labelTitle="聯絡人">
                                <input
                                    type="text"
                                    name="contactName"
                                    defaultValue={formStorageData.contactName}
                                    {...register('contactName')}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow labelTitle="聯絡電話">
                                <input
                                    type="text"
                                    name="contactPhone"
                                    defaultValue={formStorageData.contactPhone}
                                    {...register('contactPhone')}
                                />
                            </FormRow>

                            <FormRow labelTitle="傳真">
                                <input
                                    type="text"
                                    name="contactFax"
                                    defaultValue={formStorageData.contactFax}
                                    {...register('contactFax')}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="聯絡信箱"
                                error={errors.contactEmail && true}
                                {...(errors.contactEmail?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                            >
                                <input
                                    type="text"
                                    name="contactEmail"
                                    defaultValue={formStorageData.contactEmail}
                                    placeholder="xxx@xxx.com"
                                    {...register('contactEmail', {
                                        required: true,
                                        pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g,
                                    })}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="場域介紹"
                                className="textarea"
                                noBorder={true}
                            >
                                <textarea
                                    name="description"
                                    defaultValue={formStorageData.description}
                                    {...register('description')}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="影片嵌入"
                                className="textarea"
                                noBorder={true}
                            >
                                <textarea
                                    name="videoIframe"
                                    defaultValue={formStorageData.videoIframe}
                                    {...register('videoIframe')}
                                />
                            </FormRow>
                        </div>
                    </Col>
                </Row>

                <div className="row-btns">
                    <Buttons
                        text="儲存"
                        htmlType="submit"
                    />
                </div>
            </FormWrap>
        </Fragment>

    );

};

PlaceForm.defaultProps = {
    // content: '',
};

PlaceForm.propTypes = {
    title: PropTypes.string,
    // id: PropTypes.number,
    // newsTitle: PropTypes.string,
    // description: PropTypes.string,
    // content: PropTypes.any.isRequired, // html string
    // serviceKey: PropTypes.string.isRequired,
    // successCallback: PropTypes.func.isRequired,
};

export default PlaceForm;
