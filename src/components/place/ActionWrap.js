import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import PlaceForm from './PlaceForm';
import PlaceOtherForm from './PlaceOtherForm';
import { GlobalContext } from '../../context/global.state';

const ActionWrap = ({ title, serviceKey }) => {

    // Context
    const {
        formStorageData,
        globalDispatch,
    } = useContext(GlobalContext);

    return (

        <Fragment>
            <HeadTag title={title} />

            <ContentHeader
                title={title}
                showButton={false}
            />

            <PlaceForm serviceKey={serviceKey} />

            {
                (serviceKey === 'demoPlaceUpdate') &&
                    <PlaceOtherForm />
            }
        </Fragment>

    );

};

ActionWrap.defaultProps = {
    // content: '',
};

ActionWrap.propTypes = {
    title: PropTypes.string,
    // id: PropTypes.number,
    // newsTitle: PropTypes.string,
    // description: PropTypes.string,
    // content: PropTypes.any.isRequired, // html string
    // serviceKey: PropTypes.string.isRequired,
    // successCallback: PropTypes.func.isRequired,
};

export default ActionWrap;
