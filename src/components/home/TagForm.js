import { Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Buttons from '../Buttons';
import { FormRow, ErrorMesg } from '../LightboxForm';
import { GlobalContext } from '../../context/global.state';
import { TagContext } from '../../context/home/tag.state';

const TagForm = () => {

    // Context
    const {
        formStorageDispatch,
        lightboxDispatch,
        formStorageData,
    } = useContext(GlobalContext);

    const { categoryOpt } = useContext(TagContext);

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

    // 類別選單
    const handleChangeOpt = ({ target }) => {

        console.log('target:', target.value);

    };

    // Submit
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData);

    };

    return (

        <form onSubmit={handleSubmit(handleReqData)}>
            {
                [...Array(5).keys()].map((val) => (

                    <Fragment key={val}>
                        <div className="items">
                            <FormRow
                                labelTitle="標籤名稱"
                                required={true}
                                error={errors.title && true}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    // defaultValue={employeeId}
                                    {...register('name', { required: true })}
                                />
                            </FormRow>

                            <div className={`row ${errors.category ? 'hasError' : ''}`}>
                                <div className="title isRequired">標籤類別 (必填)</div>
                                <div className="field noBorder">
                                    <select
                                        name="category"
                                        // defaultValue={category}
                                        {...register('category', { required: true })}
                                        onChange={handleChangeOpt}
                                    >
                                        <option value="">請選擇</option>
                                        {
                                            Object.keys(categoryOpt).map((key) => (
                                                <option
                                                    key={key}
                                                    value={key}
                                                >
                                                    {categoryOpt[key]}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {errors.category && <ErrorMesg />}
                            </div>
                        </div>

                    </Fragment>

                ))
            }

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

export default TagForm;
