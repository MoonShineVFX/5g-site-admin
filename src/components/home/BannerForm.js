import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from '../../components/Buttons';
import UploadFile from '../../components/UploadFile';
import { FormRow, ErrorMesg } from '../../components/LightboxForm';
import { GlobalContext } from '../../context/global.state';

const RowUpload = styled.div.attrs(() => ({
    className: 'row row-upload',
}))({
    marginBottom: '40px',
});

const BannerForm = () => {

    // Context
    const {
        currEvent,
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

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

    // Submit
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            priority: +reqData.priority,
        };

        console.log('reqData:', reqData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            {(currEvent === 'updateBanner') && <p>id: {formStorageData.id}</p>}

            <div className="items">
                <FormRow labelTitle="小標題">
                    <input
                        type="text"
                        name="title"
                        defaultValue={formStorageData.title}
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
                <UploadFile />
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
