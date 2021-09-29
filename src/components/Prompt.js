import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ExclamationCircleOutlined  } from '@ant-design/icons';
import PromptStyle from './PromptStyle';
import adminConst from '../utils/admin.const';

const { confirm } = Modal;
const { prompts, sendSuccessText } = adminConst;

const Prompt = (type, obj) => {

    <PromptStyle />
    return (type === 'confirm') ? (

        confirm({
            title: obj.title,
            icon: <ExclamationCircleOutlined />,
            content: obj.mesg,
            okText: '確認',
            okType: 'primary',
            cancelText: '取消',
            className: `prompt-wrap prompt-confirm ${obj.className ? obj.className : ''}`,
            centered: true,
            // maskClosable: true, // confirm 要允許使用者點 mask?
            onOk: () => {

                if (obj.callback) obj.callback();

            },
        })

    ) : (

        Modal[type]({
            title: prompts[type],
            content: obj?.mesg ? obj.mesg : sendSuccessText,
            okText: '確認',
            okType: 'primary',
            className: `prompt-wrap prompt-${type}`,
            centered: true,
            ...obj && {
                onOk: () => {

                    if (obj.callback) obj.callback();

                },
            },
        })

    );

};

Prompt.defaultProps = {
    type: 'info',
};

Prompt.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    mesg: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    className: PropTypes.string,
    callback: PropTypes.func,
};

export default Prompt;
