import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import PlaceForm from './PlaceForm';
import { GlobalContext } from '../../context/global.state';

// Mapping
const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

    acc[id] = name;
    return acc;

}, {});

//
const ActionWrap = ({
    title,
    id,
    newsTitle,
    description,
    content,
    isHot,
    serviceKey,
    successCallback,
}) => {

    // Router
    const router = useRouter();

    // Context
    const {
        formStorageData,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // State
    const [newsTtitle, setNewsTitle] = useState(newsTitle);
    const [newsDescription, setNewsDescription] = useState(description);
    const [isHotChecked, setIsHotChecked] = useState(isHot);

    useEffect(() => {

        globalDispatch({ type: 'page', payload: 'place' });

    }, [globalDispatch]);

    return (

        <Fragment>
            <HeadTag title={title} />

            <ContentHeader
                title={title}
                showButton={false}
            />

            <PlaceForm />
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
