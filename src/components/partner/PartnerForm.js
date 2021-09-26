import { useContext } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from '../Buttons';
import Checkbox from '../Checkbox';
import Upload from '../Upload';
import { FormRow } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { PartnerContext } from '../../context/partner/partner.state';

const RowUpload = styled.div.attrs(() => ({
    className: 'row row-upload',
}))({
    marginTop: '30px',
    marginBottom: '40px',
});

const CheckboxWrapLayout = styled.div({
    display: 'flex',
    '.checkbox-item': {
        flex: 1,
    },
});

const PartnerForm = () => {

    // Context
    const {
        currEvent,
        formStorageData,
        formStorageDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    const {
        imageSize,
        tagOpt,
        partnerCreate,
        partnerUpdate,
    } = useContext(PartnerContext);

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
            ...formStorageData?.file && { file: formStorageData?.file },
            tag: reqData.tag.filter((val) => val),
        };

        if (formStorageData?.files) {

            const limitSize = (reqData.image.size / 1024 / 1024) < 5;

            // 檢查圖片大小是否超過 5MB
            if (!limitSize) {

                message.error('檔案不能超過 5MB，請重新上傳');
                return;

            }

        }

        if (currEvent === 'updatePartner') partnerUpdate(reqData);
        else partnerCreate(reqData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            {(currEvent === 'updatePartner') && <p>id: {formStorageData.id}</p>}

            <div className="items">
                <FormRow
                    labelTitle="夥伴名稱"
                    required={true}
                    error={errors.name && true}
                >
                    <input
                        type="text"
                        name="name"
                        defaultValue={formStorageData.name}
                        {...register('name', { required: true })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="外部網址(URL)"
                    required={true}
                    error={errors.link && true}
                    {...(errors.link?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="link"
                        defaultValue={formStorageData.link}
                        placeholder="請輸入完整連結 (https 或 http)"
                        {...register('link', {
                            required: true,
                            pattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g,
                        })}
                    />
                </FormRow>
            </div>

            <div className="items">
                <FormRow
                    labelTitle="聯絡電話"
                    required={true}
                    error={errors.phone && true}
                    {...(errors.phone?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="phone"
                        defaultValue={formStorageData.phone}
                        placeholder="02-22222222"
                        {...register('phone', {
                            required: true,
                            pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g,
                        })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="聯絡信箱"
                    required={true}
                    error={errors.email && true}
                    {...(errors.email?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="email"
                        defaultValue={formStorageData.email}
                        placeholder="xxx@xxx.com"
                        {...register('email', {
                            required: true,
                            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g,
                        })}
                    />
                </FormRow>
            </div>

            <div className="row">
                <div className="title">標籤</div>
                <div className="field noBorder">
                    <CheckboxWrapLayout>
                        {
                            tagOpt.map(({ id, name }, idx) => (

                                <div
                                    key={idx}
                                    className="checkbox-item"
                                >
                                    <Checkbox
                                        name="tag"
                                        value={id}
                                        defaultChecked={formStorageData?.tag?.some((val) => val === id)}
                                        register={register(`tag.${idx}`)}
                                    >
                                        {name}-{id}
                                    </Checkbox>
                                </div>

                            ))
                        }
                    </CheckboxWrapLayout>
                </div>
            </div>

            <FormRow
                labelTitle="夥伴介紹"
                className="textarea"
                noBorder={true}
                required={true}
                error={errors.description && true}
                {...(errors.description?.type === 'maxLength') && { errorMesg: '字數超過' }}
            >
                <textarea
                    name="description"
                    placeholder="限制 80 字內"
                    defaultValue={formStorageData.description}
                    {...register('description', {
                        required: true,
                        maxLength: 80,
                    })}
                />
            </FormRow>

            <RowUpload>
                <Upload size={imageSize} />
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

export default PartnerForm;
