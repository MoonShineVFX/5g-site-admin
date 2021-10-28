import { Row } from 'antd';
import { blue } from '@ant-design/colors';
import styled from 'styled-components';

/** Place Form */
//
const FormWrap = styled.form(({ theme }) => ({
    '&.with-thumb': {
        '.upload-preview': {
            height: 'auto',
        },
    },
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
        minHeight: '120px',
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
}));

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
}));

//
const PlaceOtherFormLayout = styled(FormWrap)(({ theme }) => ({
}));

//
const CreateFieldLayout = styled.span.attrs(() => ({
    className: 'row-create-field',
}))({
    fontSize: '14px',
    color: blue.primary,
    textDecoration: 'underline',
    display: 'inline-block',
    float: 'right',
    marginTop: '3.5px',
    cursor: 'pointer',
    '& + p': {
        display: 'none',
    },
});

//
const ActionLayout = styled.div.attrs(() => ({
    className: 'btn-clone',
}))({
    color: blue.primary,
    textAlign: 'right',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    '& > *': {
        cursor: 'pointer',
    },
    '*': {
        fontSize: '1.16em',
    },
    '.hide': {
        visibility: 'hidden',
    },
});

export {
    FormWrap,
    PlaceOtherFormWrapLayout,
    PlaceOtherFormLayout,
    CreateFieldLayout,
    ActionLayout,
};
