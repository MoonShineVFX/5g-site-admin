import { createGlobalStyle } from 'styled-components';

const LightboxFormStyle = createGlobalStyle`
    .noBorder {
        height: 34px;
        background-color: #FFF;
        padding: 4px 12px;
        transition: all .3s ease-in-out;
        outline: 0;
    }
    .row {
        display: block;
        margin-bottom: 20px;
        .field {
            height: 34px;
            font-size: 15px;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            padding: 4px 12px;
            transition: all .3s ease-in-out;
            outline: 0;
            &:hover,
            &:focus {
                border-color: #2196f3;
            }
            &:focus {
                box-shadow: 0 0 1px 2px rgba(33, 150, 243, .3);
            }
            > * {
                &:not(.ant-switch) {
                    width: 100%;
                }
            }
        }
        .disabled {
            &:hover,
            &:focus {
                border-color: #d9d9d9;
            }
            [disabled] {
                background-color: #f0f0f0;
                cursor: not-allowed;
                &:hover {
                    border-color: #d9d9d9;
                }
            }
        }
        .ant-picker {
            width: 100%;
            height: 34px;
            &:focus,
            &:active {
                border: 1px solid #2196f3;
                box-shadow: none;
                outline: 0;
            }
            &.ant-picker-focused {
                box-shadow: none;
                .ant-picker-active-bar {
                    display: none;
                }
            }
            .ant-picker-input {
                &:focus {
                    outline: 0;
                }
                input {
                    font-size: 15px;
                    letter-spacing: 1px;
                }
            }
        }
        .noBorder {
            border: 0;
            padding: 0;
            select {
                padding: 4px 8px;
            }
        }
        .ant-input,
        select {
            height: 34px;
            font-size: 15px;
        }
        select {
            font-size: 15px;
            border-color: #d9d9d9;
            border-radius: 2px;
            padding: 4px 12px;
            transition: all .3s ease-in-out;
            &:hover {
                border-color: #2196f3;
            }
        }
        textarea {
            height: 100%;
            font-size: 15px;
            color: #333;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            padding: 8px 12px;
            resize: none;
            outline: 0;
            transition: all .3s ease-in-out;
            &:hover {
                border-color: #2196f3;
            }
        }
        &.textarea {
            .field {
                min-height: 60px;
            }
        }
    }
    .row-btns {
        text-align: center;
        margin-top: 20px;
        .ant-btn {
            height: auto;
            line-height: initial;
            padding: 8px 40px;
        }
        .ant-btn-primary {
            margin-left: 20px;
        }
        [class*="btn-"] {
            margin: 0 20px;
        }
    }
    .isRequired {
        &:before {
            content: '*';
            font-size: 13px;
            color: #ef5350;
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
    .hasError {
        .field {
            border-color: #ef5350;
            &:hover {
                border-color: #ef5350;
            }
        }
        .error {
            font-size: 15px;
            color: #ef5350;
            margin: 2px 0;
        }
        .noBorder select {
            border-color: #ef5350;
        }
    }
`;

export default LightboxFormStyle;
