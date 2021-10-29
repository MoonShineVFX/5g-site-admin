import { Fragment } from 'react';
import PropTypes from 'prop-types';
import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import PlaceForm from './PlaceForm';
import PlaceOtherForm from './PlaceOtherForm';

const ActionWrap = ({ title, serviceKey }) => (

    <Fragment>
        <HeadTag title={title} />

        <ContentHeader
            title={title}
            showButton={false}
        />

        <PlaceForm serviceKey={serviceKey} />

        {
            (serviceKey === 'demoPlaceUpdate') && <PlaceOtherForm />
        }
    </Fragment>

);

ActionWrap.propTypes = {
    title: PropTypes.string,
    serviceKey: PropTypes.string.isRequired,
};

export default ActionWrap;
