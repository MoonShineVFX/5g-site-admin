import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from './Buttons';
import TextEditor from './TextEditor';
import Prompt from './Prompt';
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

const TextEditorForm = ({
    name,
    content,
    serviceKey,
    otherReqData,
    successCallback,
    children,
}) => {

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
            ...otherReqData,
            ...reqData,
            detail: formStorageData.detail ? formStorageData.detail : reqData.detail,
        };

        console.log('reqData:', reqData);

        // return;
        Prompt('success', {
            mesg: '文章已更新，將重新整理頁面',
            enableEsc: false,
            callback: () => {

                formStorageDispatch({ type: 'CLEAR' });
                successCallback();

            },
        });

        // Debug
        return;
        Service[serviceKey](reqData)
            .then(({ data }) => {

                Prompt('success', {
                    mesg: '文章已更新，將重新整理頁面',
                    enableEsc: false,
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        successCallback();

                    },
                });

            });

    };

    return (

        <Fragment>
            <TextEditor content={content} />

            <TextEditorFormLayout onSubmit={handleSubmit(handleReqData)}>
                {children}

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
        </Fragment>

    );

};

TextEditorForm.defaultProps = {
    name: 'detail',
    content: '',
};

TextEditorForm.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired, // html string
    serviceKey: PropTypes.string.isRequired,
    otherReqData: PropTypes.object,
    successCallback: PropTypes.func.isRequired,
    children: PropTypes.any,
};

export default TextEditorForm;
