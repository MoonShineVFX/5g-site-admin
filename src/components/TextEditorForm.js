import { useContext } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from './Buttons';
import TextEditor from './TextEditor';
import { GlobalContext } from '../context/global.state';
import Service from '../utils/admin.service';

const TextEditorFormLayout = styled.form.attrs(() => ({
    className: 'textEditorForm',
}))({
    height: 'calc(100% - 60px)', // title: 60px
    '.admin-btn': {
        minWidth: '16%',
        marginTop: '20px',
        padding: '6px 24px',
    },
});

const TextEditorForm = ({ name, content, serviceKey }) => {

    // Context
    const { formStorageData, formStorageDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm({
        defaultValues: {
            detail: content,
        },
    });

    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            detail: formStorageData.detail ? formStorageData.detail : reqData.detail,
        };

        console.log('reqData:', reqData);

        // Debug
        return;
        Service[serviceKey](reqData)
            .then(({ data }) => {

                formStorageDispatch({ type: 'CLEAR' });
                message.success('更新成功');

            });

    };

    return (

        <TextEditorFormLayout onSubmit={handleSubmit(handleReqData)}>
            <TextEditor content={content} />

            <textarea
                name={name}
                {...register(name)}
                style={{ display: 'none' }}
            />

            <Buttons
                text="儲存"
                htmlType="submit"
            />
        </TextEditorFormLayout>

    );

};

TextEditorForm.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired, // html string
    serviceKey: PropTypes.string.isRequired,
};

export default TextEditorForm;
