import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import Buttons from './Buttons';
import TextEditor from './TextEditor';

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

const TextEditorForm = ({ name, content }) => {

    // React Hook Form
    const { handleSubmit, control } = useForm();

    const handleReqData = (reqData) => {

        console.log('reqData:', reqData);

    };

    return (

        <TextEditorFormLayout onSubmit={handleSubmit(handleReqData)}>
            <Controller
                name={name}
                control={control}
                render={(({ field: { onChange } }) => (

                    <TextEditor
                        content={content}
                        onChange={onChange}
                    />

                ))}
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
    content: PropTypes.any, // html string
};

export default TextEditorForm;
