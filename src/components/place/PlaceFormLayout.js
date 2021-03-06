import { Row } from 'antd';
import styled from 'styled-components';

/** Place Form */
//
const FormWrap = styled.form({
    '.upload-preview': {
        minHeight: '312px',
    },
    '.left': {
        maxWidth: '600px',
        marginRight: '40px',
    },
    '.items': {
        display: 'flex',
        '.row': {
            flex: 1,
            '&:not(:last-child)': {
                marginRight: '20px',
            },
        },
    },
    '.row.textarea .field': {
        minHeight: '150px',
    },
    '.row-btns': {
        textAlign: 'left',
        marginTop: '20px',
        '> *': {
            width: '200px',
            marginLeft: '0',
            marginRight: '20px',
        },
    },
    '.row.radio-button .field': {
        'label': {
            marginRight: '20px',
            cursor: 'pointer',
        },
        'input[type="radio"]': {
            verticalAlign: 'middle',
            marginRight: '4px',
        },
    },
    'hr': {
        margin: '30px 0',
    },
    'h3': {
        fontWeight: 'bold',
    },
    '.row.place-textarea .field': {
        minHeight: '240px',
        'textarea': {
            lineHeight: '1.5',
        },
    },
});

/** Place Other Fields Form */
//
const PlaceOtherFormWrapLayout = styled(Row)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.border}`,
    marginTop: '40px',
    paddingTop: '40px',
    'h3': {
        fontWeight: 'bold',
    },
    '.ant-col': {
        paddingRight: '40px',
    },
    '.upload-preview': {
        maxWidth: '778px',
        height: '438px',
    },
    '.ant-upload-list-item-info': {
        display: 'inline-block',
    },
}));

//
const ImagesWrapLayout = styled.div({
    border: '1px solid',
    marginBottom: '20px',
});

export {
    FormWrap,
    PlaceOtherFormWrapLayout,
    ImagesWrapLayout,
};
