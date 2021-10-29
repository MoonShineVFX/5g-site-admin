import { Fragment } from 'react';
import PropTypes from 'prop-types';
import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import PlaceForm from './PlaceForm';
import PlaceOtherForm from './PlaceOtherForm';

const ActionWrap = ({ title, data, serviceKey }) => (

    <Fragment>
        <HeadTag title={title} />

        <ContentHeader
            title={title}
            showButton={false}
        />

        <PlaceForm
            data={data}
            serviceKey={serviceKey}
        />

        {
            // 需先建立一筆 demo place 後，才能上傳圖片輪播與與文件
            (serviceKey === 'demoPlaceUpdate') && <PlaceOtherForm data={data} />
        }
    </Fragment>

);

ActionWrap.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    serviceKey: PropTypes.string.isRequired,
};

export default ActionWrap;
