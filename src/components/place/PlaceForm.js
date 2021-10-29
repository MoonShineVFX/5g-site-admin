import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Row, Col, message } from 'antd';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { FormRow } from '../LightboxForm';
import Prompt from '../Prompt';
import UploadSingle from '../Upload';
import { FormWrap } from './PlaceFormLayout';
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/admin.service';

const PlaceForm = ({ serviceKey }) => {

    // Router
    const router = useRouter();

    // Context
    const { formStorageData, formStorageDispatch } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {

        // 取 detail 與送的欄位名稱有些不同，直接繼承會包括那些不必要的欄位
        reset({
            title: formStorageData.title,
            imgUrl: formStorageData.imgUrl,
            locationUrl: formStorageData.locationUrl,
            description: formStorageData.description,
            type: formStorageData.type,
            relativeLinkName: formStorageData.relativeLinkName,
            relativeLinkUrl: formStorageData.relativeLinkUrl,
            contactUnit: formStorageData.contact?.unit,
            contactName: formStorageData.contact?.name,
            contactPhone: formStorageData.contact?.phone,
            contactFax: formStorageData.contact?.fax,
            contactEmail: formStorageData.contact?.email,
            videoIframe: formStorageData.videoIframe,
            byMRT: formStorageData.byMRT,
            byDrive: formStorageData.byDrive,
        });

    }, [formStorageData, reset]);

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            ...formStorageData?.file && { thumb: formStorageData?.file },
            ...formStorageData.id ? { id: formStorageData.id } : null,
        };

        // 檢查: 圖片尺寸
        if (formStorageData?.file) {

            const limitSize = (reqData.thumb.size / 1024 / 1024) < 5;

            // 檢查圖片大小是否超過 5MB
            if (!limitSize) {

                message.error('檔案不能超過 5MB，請重新上傳');
                return;

            }

        }

        for (let key in reqData) {

            formData.append(key, reqData[key]);

        }

        Service[serviceKey](formData)
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        if (serviceKey === 'demoPlaceCreate') {

                            formStorageDispatch({ type: 'CLEAR' });
                            router.push('/place');

                        }

                    },
                });

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <FormWrap
                onSubmit={handleSubmit(handleReqData)}
                className={(serviceKey === 'demoPlaceUpdate') ? 'with-thumb' : ''}
            >
                <Row>
                    <Col span={12} className="left">
                        <div className="row row-thumb">
                            <h3>縮圖(列表頁)</h3>
                            <UploadSingle size="563x312" />
                        </div>
                    </Col>

                    <Col flex={1}>
                        <div className="row radio-button">
                            <div className="title">場域分類</div>
                            <div className="field noBorder">
                                 <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="5g"
                                        defaultChecked={(formStorageData.type === '5g')}
                                        {...register('type')}
                                    />
                                    5G
                                </label>

                                 <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="tech"
                                        defaultChecked={(formStorageData.type === 'tech')}
                                        {...register('type')}
                                    />
                                    互動科技
                                </label>
                            </div>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="場域名稱"
                                required={true}
                                error={errors.title && true}
                            >
                                <input
                                    type="text"
                                    name="title"
                                    {...register('title', { required: true })}
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
                                    placeholder="請輸入完整連結 (https 或 http)"
                                    {...register('locationUrl', {
                                        pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                                    })}
                                />
                            </FormRow>
                        </div>

                        <FormRow
                            labelTitle="場域介紹"
                            className="textarea"
                            noBorder={true}
                        >
                            <textarea
                                name="description"
                                {...register('description')}
                            />
                        </FormRow>

                        <div className="items">
                            <FormRow labelTitle="相關連結名稱" >
                                <input
                                    type="text"
                                    name="relativeLinkName"
                                    {...register('relativeLinkName')}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="相關連結 (URL)"
                                error={errors.relativeLinkUrl && true}
                                {...(errors.relativeLinkUrl?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                            >
                                <input
                                    type="text"
                                    name="relativeLinkUrl"
                                    placeholder="請輸入完整連結 (https 或 http)"
                                    {...register('relativeLinkUrl', {
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
                                    {...register('contactName', { required: true })}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="聯絡電話"
                                required={true}
                                error={errors.contactPhone && true}
                            >
                                <input
                                    type="text"
                                    name="contactPhone"
                                    {...register('contactPhone', { required: true })}
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
                                    {...register('contactEmail', {
                                        required: true,
                                        pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g,
                                    })}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow
                                labelTitle="大眾運輸"
                                className="textarea"
                                noBorder={true}
                            >
                                <textarea
                                    name="byMRT"
                                    {...register('byMRT')}
                                />
                            </FormRow>

                            <FormRow
                                labelTitle="自行開車"
                                className="textarea"
                                noBorder={true}
                            >
                                <textarea
                                    name="byDrive"
                                    {...register('byDrive')}
                                />
                            </FormRow>
                        </div>

                        <FormRow
                            labelTitle="影片嵌入"
                            className="textarea"
                            noBorder={true}
                        >
                            <textarea
                                name="videoIframe"
                                {...register('videoIframe')}
                            />
                        </FormRow>
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

export default PlaceForm;
