import React, { Fragment, useContext } from 'react';
import {
    Upload,
    Tooltip,
    message,
} from 'antd';

import {
    UploadOutlined,
    DeleteOutlined,
    FileJpgOutlined,
    FilePdfOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';

import dayjs from 'dayjs';
import styled from 'styled-components';
import Buttons from '../components/Buttons';
import UploadFileStyle from './UploadFileStyle';
import { BannerContext } from '../context/home/banner.state';
import Service from '../utils/admin.service';

// 允許上船格式: jpg/jpeg/pdf
const formatRegex = new RegExp('(jpe?g|png|gif)');

// 檔案路徑
const filePath = (id) => `/files/${id}`;

// 檔名切割
const splitFileName = (fileName) => {

    const splitName = fileName.split('.')[1];
    const obj = {
        jpg: <FileJpgOutlined />,
        jpeg: <FileJpgOutlined />,
        pdf: <FilePdfOutlined />,
    };

    return obj[splitName];
};

// 檔案列表
const renderFileItems = (originNode, file, currFileList, { handleFileRemove }) => {

    const { uid, name, size, uploadTime, creator } = file;

    // render tooltip title
    const renderTooltipTitle = ({ creator, uploadTime }) => `${creator || ''}於 ${dayjs(uploadTime).format('YYYY/MM/DD HH:mm:ss')} 上傳`;

    // 檔案預覽
    const handleFilePreview = () => window.open(Service.previewFile(+uid));

    return (

        <div
            className="fileItemWrap"
            // onClick={handleFilePreview}
        >
            <div
                className="upload-file-avatar"
                title={renderTooltipTitle({ creator, uploadTime })}
            >
                {formatRegex.test(name) ? splitFileName(file.name) : <FileUnknownOutlined />}
            </div>

            <h5
                className="upload-file-name"
                title={name}
            >
                {name}
            </h5>

            <div className="upload-file-info">
                <span className="size">
                    {
                        // 小於 1MB 顯示 KB
                        (size / 1024 / 1024 > 1) ? `${Math.floor((size / 1024 / 1024) * 100) / 100} MB` : `${Math.floor(size / 1024)} KB`
                    }
                </span>
                <Tooltip
                    title="刪除"
                    placement="bottom"
                    overlayClassName="tooltip"
                >
                    <span
                        className="action"
                        onClick={(e) => handleFileRemove(e, uid)}
                    >
                        <DeleteOutlined />
                    </span>
                </Tooltip>
            </div>
        </div>

    );

};

// 整理成 Ant Design 的格式
const handleFileList = (files) => files.reduce((arr, { id, name, size, uploadTime, creator }) => {

    const obj = {
        uid: id,
        name,
        size,
        uploadTime,
        creator,
        url: filePath(id),
    };

    arr.push(obj);
    return arr;

}, []);

const ButtonsLayout = styled(Buttons)({
    padding: '4px 16px',
    'span': {
        letterSpacing: 0,
    },
});

const UploadFiles = () => {

    // 刪除檔案按鈕
    const btnRemove = (e, uid) => {

        e.stopPropagation();
        // removeFile({ pid, id: uid });

    };

    // 送資料
    const handleUploadData = (param) => {

        const { file } = param;
        const isLt10M = file.size / 1024 / 1024 < 10;
        const formData = new FormData();

        if (!isLt10M) {

            message.error('檔案不能超過 10MB，請重新上傳!!!');
            return;

        }

        // formData.append('pid', pid);
        formData.append('file', file);
        // uploadFile(formData);

    };

    return (

        <Fragment>
            <UploadFileStyle />

            <ul className="upload-warning-box">
                <li>僅支援以下圖片格式: jpg, jpeg, png, gif</li>
                <li>檔案大小不得超過 5MB</li>
            </ul>

            <Upload
                className="fileUpload"
                accept=".jpg,.jpeg,.png,.gif" // 限制檔案格式
                // fileList={handleFileList(fileList)}
                itemRender={(originNode, file, currFileList) => renderFileItems(originNode, file, currFileList, { handleFileRemove: btnRemove })}
                customRequest={handleUploadData}
            >
                <ButtonsLayout
                    type="default"
                    text="上傳圖片"
                    icon={<UploadOutlined />}
                />
            </Upload>
        </Fragment>

    );

};

export default UploadFiles;
