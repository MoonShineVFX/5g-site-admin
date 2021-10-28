import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Row, Col, message } from 'antd';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { FormRow, ErrorMesg } from '../LightboxForm';
import Prompt from '../Prompt';
import UploadSingle from '../Upload';
import { FormWrap } from './PlaceFormLayout';

import { GlobalContext } from '../../context/global.state';
import adminConst from '../../utils/admin.const';
import Service from '../../utils/admin.service';

const { placeConfig } = adminConst;

//
const PlaceForm = ({ serviceKey }) => {

    // Router
    const router = useRouter();

    // Context
    const {
        formStorageData,
        formStorageDispatch,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        const formData = new FormData();

        reqData = {
            ...reqData,
            ...formStorageData?.file && { thumb: formStorageData?.file },
            ...formStorageData.id ? { id: formStorageData.id } : null,
        };

        // 檢查: 圖片尺寸
        if (formStorageData?.files) {

            const limitSize = (reqData.image.size / 1024 / 1024) < 5;

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

                        formStorageDispatch({ type: 'CLEAR' });

                        // Betty: 先暫時註解
                        // router.push('/place');

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
                                                defaultChecked="tech"
                                                // defaultChecked={(formStorageData.type === key)}
                                                {...register('type', { required: true })}
                                            />
                                            {placeConfig[key]}
                                        </label>

                                    ))
                                }
                            </div>

                            {errors.type && <ErrorMesg />}
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
                                    defaultValue={formStorageData.title}
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
                                    defaultValue={formStorageData.locationUrl}
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
                                defaultValue={formStorageData.description}
                                {...register('description')}
                            />
                        </FormRow>

                        <div className="items">
                            <FormRow labelTitle="相關連結名稱" >
                                <input
                                    type="text"
                                    name="relativeLinkName"
                                    defaultValue={formStorageData.relativeLinkName}
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
                                    defaultValue={formStorageData.relativeLinkUrl}
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
                                    defaultValue={formStorageData.contact?.unit}
                                    {...register('contactUnit', { required: true })}
                                />
                            </FormRow>

                            <FormRow labelTitle="聯絡人">
                                <input
                                    type="text"
                                    name="contactName"
                                    defaultValue={formStorageData.contact?.name}
                                    {...register('contactName')}
                                />
                            </FormRow>
                        </div>

                        <div className="items">
                            <FormRow labelTitle="聯絡電話">
                                <input
                                    type="text"
                                    name="contactPhone"
                                    defaultValue={formStorageData.contact?.phone}
                                    {...register('contactPhone')}
                                />
                            </FormRow>

                            <FormRow labelTitle="傳真">
                                <input
                                    type="text"
                                    name="contactFax"
                                    defaultValue={formStorageData.contact?.fax}
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
                                    defaultValue={formStorageData.contact?.email}
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
                                    defaultValue={formStorageData.byMRT}
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
                                    defaultValue={formStorageData.byDrive}
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
                                defaultValue={formStorageData.videoIframe}
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
