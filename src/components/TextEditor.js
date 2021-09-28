import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { blue } from '@ant-design/colors';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

//
const htmlToDraft = (typeof window === 'object') && require('html-to-draftjs').default;

// 動態載入模組
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false },
);

const EditorLayout = styled.div(({ theme }) => ({
    height: 'calc(100% - 58px)', // button: 58px
    border: `1px solid ${theme.palette.border}`,
    overflow: 'hidden',
    '.adminEditor-wrapper, .DraftEditor-root': {
        height: '100%',
    },
    '.adminEditor-wrapper *': {
        boxSizing: 'initial',
    },
    '.adminEditor-toolbar': {
        border: 0,
        borderBottom: `1px solid ${theme.palette.border}`,
        padding: '10px 10px 6px',
        'a': {
            color: theme.palette.font,
        },
    },
    '.adminEditor-editor': {
        height: 'calc(100% - 58px - 58px)', // toolbar: 58px, button: 58px
        padding: '10px 12px',
        'a[href] span': {
            color: blue.primary,
            textDecoration: 'underline',
        },
    },
    '.public-DraftStyleDefault-block': {
        margin: 0,
    },
    '.rdw-option-wrapper, .rdw-dropdown-wrapper': {
        '&:hover': {
            borderColor: '#CDCDCD',
            boxShadow: 'none',
            '.rdw-dropdown-optionwrapper': {
                borderColor: '#CDCDCD',
                boxShadow: 'none',
            },
        },
    },
}));

const TextEditor = (props) => {

    // State
    const [editor, setEditor] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {

        setEditor(true);

        const contentBlock = htmlToDraft(props.content);
        if (contentBlock) {

            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);

        }

    }, [props.content]);

    const handleEditorChange = (state) => {

        setEditorState(state);
        return props.onChange(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );

    };

    const uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                console.log(response)
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                console.log(error)
                reject(error);
            });
            }
        );
    };

    return (

        <EditorLayout>
            {
                editor &&
                    <Editor
                        wrapperClassName="adminEditor-wrapper"
                        toolbarClassName="adminEditor-toolbar"
                        editorClassName="adminEditor-editor"
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        toolbar={{
                            image: {
                                // uploadCallback: uploadImageCallBack,
                                // previewImage: true,
                                alt: { present: true, mandatory: true },
                            },
                        }}
                    />
            }
        </EditorLayout>

    );

};

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default TextEditor;

/**
 * Example
 * https://github.com/jpuri/react-draft-wysiwyg/tree/master/stories
 * https://www.gyanblog.com/javascript/how-integrate-next-js-draft-js-strapi-create-article-upload-image-view-page
 */
