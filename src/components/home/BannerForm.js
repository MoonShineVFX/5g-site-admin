import { useContext, useRef } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from '../../components/Buttons';
import Upload from '../Upload';
import { FormRow, ErrorMesg } from '../../components/LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { BannerContext } from '../../context/home/banner.state';

const RowUpload = styled.div.attrs(() => ({
    className: 'row row-upload',
}))({
    marginTop: '30px',
    marginBottom: '40px',
});

const BannerForm = () => {

    // Context
    const {
        currEvent,
        formStorageData,
        formStorageDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    const {
        bannerCreate,
        bannerUpdate,
    } = useContext(BannerContext);

    // React Hook Form
    const {
        // handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // Ref
    const form = useRef(null);

    // 隱藏 Modal
    const hideModal = () => {

        formStorageDispatch({ type: 'CLEAR' });
        lightboxDispatch({ type: 'HIDE' });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            priority: +reqData.priority,
            image: formStorageData.files,
        };

        const limitSize = (reqData.image.size / 1024 / 1024) < 5;
        const formData = new FormData();

        // 檢查圖片大小是否超過 5MB
        if (!limitSize) {

            message.error('檔案不能超過 5MB，請重新上傳');
            return;

        }

        console.log('reqData:', reqData);

        // append form data
        for (const key in reqData) {

            formData.append(key, reqData[key]);

        }

        if (currEvent === 'updateBanner') bannerUpdate(formData);
        else bannerCreate(formData);

    };

    const handleSubmit = (e) => {

        // console.log('form.current:', form.current)
        e.preventDefault();
        const formData = new FormData(form.current);

        // Debug
        if (currEvent === 'updateBanner') bannerUpdate(formData);
        else bannerCreate(formData);

    };

    return (

        // <form onSubmit={handleSubmit(handleReqData)}>
        <form ref={form} onSubmit={handleSubmit}>
            {(currEvent === 'updateBanner') && <p>id: {formStorageData.id}</p>}

            <div className="items">
                <FormRow labelTitle="小標題">
                    <input
                        type="text"
                        name="title"
                        defaultValue={formStorageData.title}
                        placeholder="給 SEO 用"
                        {...register('title')}
                    />
                </FormRow>

                <div className={`row ${errors.priority ? 'hasError' : ''}`}>
                    <div className="title isRequired">優先度 (必填)</div>
                    <div className="field noBorder">
                        <select
                            name="priority"
                            defaultValue={formStorageData.priority}
                            {...register('priority', { required: true })}
                        >
                            <option value="">請選擇</option>
                            {
                                [...Array(10).keys()].map((val) => (
                                    <option
                                        key={val}
                                        value={val + 1}
                                    >
                                        {val + 1}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {errors.priority && <ErrorMesg />}
                </div>
            </div>

            <FormRow
                labelTitle="外連網址"
                required={true}
                error={errors.link && true}
                {...(errors.link?.type === 'pattern') && { errorMesg: '格式錯誤' }}
            >
                <input
                    type="text"
                    name="link"
                    defaultValue={formStorageData.link}
                    placeholder="請輸入完整 URL"
                    {...register('link', {
                        required: true,
                        pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                    })}
                />
            </FormRow>

            <RowUpload>
                <Upload size="1200x520" />
            </RowUpload>

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
        </form>

    );

};

export default BannerForm;
