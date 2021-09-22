import { blue, grey } from '@ant-design/colors';
import { createGlobalStyle } from 'styled-components';

const UploadFileStyle = createGlobalStyle`
    .upload-warning-box {
        margin-bottom: 4px;
    }
    .fileUpload {
        display: block;
    }
    .fileItemWrap {
        border: 1px solid ${({ theme }) => theme.palette.border};
        padding: 4px 8px;
        cursor: pointer;
        * {
            line-height: 1.4;
            color: ${({ theme }) => theme.palette.black};
            &:not(.anticon-delete) {
                font-size: 14px;
            }
        }
        .upload-file-avatar {
            font-size: 40px;
            text-align: center;
            margin-bottom: 0;
            * {
                font-size: 40px;
            }
        }
        .upload-file-name {
            color: ${blue};
            margin-bottom: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .upload-file-info {
            * {
                color: ${grey.primary};
            }
            .size {
                font-size: 13px;
            }
            .action {
                float: right;
                font-size: 16px;
                * {
                    font-size: 16px;
                }
            }
        }
    }
`;

export default UploadFileStyle;
