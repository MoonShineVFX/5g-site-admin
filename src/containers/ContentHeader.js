import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Buttons from '../components/Buttons';

const ContentHeaderLayout = styled.p({
    '&:after': {
        content: '""',
        display: 'block',
        clear: 'both',
    },
    '.btn-create': {
        float: 'right',
        paddingLeft: '40px',
        paddingRight: '40px',
    },
});

const ContentHeader = ({ title, onClick, children }) => (

    <Fragment>
        <h1>{title}</h1>
        <ContentHeaderLayout>
            {children && children}

            <Buttons
                text="新增"
                className="btn-create"
                onClick={onClick}
            />
        </ContentHeaderLayout>
    </Fragment>

);

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired, // 暫時由外層傳遞，不確定每一頁的行為是否都一致
};

export default ContentHeader;
