import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Buttons from '../../components/Buttons';
import { FormRow, ErrorMesg } from '../../components/LightboxForm';
import { GlobalContext } from '../../context/global.state';

const BannerForm = () => {

    // Context
    const {
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    // React Hook Form - 搜尋
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

        console.log('reqData:', reqData);

    };

    console.log('errors:', errors)

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            <FormRow
                labelTitle="員工編號"
                required={true}
                error={errors.title && true}
            >
                <input
                    type="text"
                    name="title"
                    // defaultValue={employeeId}
                    {...register('title', { required: true })}
                />
            </FormRow>

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
