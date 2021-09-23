import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Buttons from './Buttons';
import { GlobalContext } from '../context/global.state';

const UploadLayout = styled.div.attrs(() => ({
    className: 'fileUploadWrap',
}))(({ theme }) => ({
    '.upload-action': {
        marginBottom: '12px',
    },
    'input': {
        display: 'none',
    },
    '.info': {
        cursor: 'default',
    },
    '.size': {
        color: '#bfbfbf',
        float: 'right',
        marginTop: 'calc((34px - 22px) / 2)',
    },
    '.upload-preview': {
        height: '190px',
        textAlign: 'center',
        border: `1px solid ${theme.palette.border}`,
        padding: '8px',
        '&:before': {
            content: "''",
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        'img': {
            maxHeight: '100%',
        },
    },
    '.upload-notice': {
        marginTop: '4px',
    },
}));

const ButtonsLayout = styled(Buttons)({
    fontSize: '14px',
    marginRight: '12px',
    padding: '4px 16px',
    'span': {
        letterSpacing: 0,
    },
});

const Upload = ({ size }) => {

    // Context
    const {
        formStorageDispatch,
    } = useContext(GlobalContext);

    // State
    const [imgPreview, setImgPreview] = useState(null);

    // Ref
    const inputFileRef = useRef(null);

    //
    const handleChangeInput = ({ target }) => {

        if (target.files && target.files.length) {

            // console.log('target:', target.files[0])

            setImgPreview(target.files[0]);
            formStorageDispatch({
                type: 'COLLECT',
                payload: { files: target.files[0] },
            });

        }

    };

    // 觸發 input file
    const handleTriggerUpload = () => inputFileRef.current.click();

    // 送資料
    const handleUploadData = (param) => {

        // console.log('param:', param)

        const { file } = param;
        const isLt10M = file.size / 1024 / 1024 < 10;
        const formData = new FormData();

        if (!isLt10M) {

            message.error('檔案不能超過 5MB，請重新上傳!!!');
            return;

        }

        // formData.append('pid', pid);
        formData.append('file', file);
        // uploadFile(formData);

    };

    // console.log('imgPreview:', imgPreview);

    return (

        <UploadLayout>
            <div className="upload-action">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeInput}
                    ref={inputFileRef}
                />

                <ButtonsLayout
                    type="default"
                    text="上傳圖片"
                    icon={<UploadOutlined />}
                    onClick={handleTriggerUpload}
                />

                {
                    imgPreview &&
                        <span className="info">
                            <span>{imgPreview.name}</span>
                            <span className="size">
                                {
                                    // 小於 1MB 顯示 KB
                                    (imgPreview.size / 1024 / 1024 > 1) ?
                                        `${Math.round((imgPreview.size / 1024 / 1024) * 100) / 100} MB` :
                                        `${Math.round((imgPreview.size / 1024) * 100) / 100} KB`
                                }
                            </span>
                        </span>
                }
            </div>

            <div className="upload-preview">
                {
                    imgPreview ? (

                        <img
                            src={URL.createObjectURL(imgPreview)}
                            alt="thumb"
                        />

                    ) : '圖片預覽'

                }
            </div>

             <ul className="upload-notice">
                <li>僅支援以下格式: jpg, png</li>
                <li>檔案大小不得超過 5MB</li>
                <li>圖片尺寸為: {size}</li>
            </ul>
        </UploadLayout>

    );

};

Upload.propTypes = {
    size: PropTypes.string, // 1200x520
};

export default Upload;
