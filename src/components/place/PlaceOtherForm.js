import {
    Fragment,
    useContext,
    useEffect,
    useState,
    useMemo,
} from 'react';

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import { Row, Col, message } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

import LightboxFormStyle from '../LightboxFormStyle';
import Buttons from '../Buttons';
import { FormRow, ErrorMesg } from '../LightboxForm';
import UploadSingle, { UploadMultiple } from '../Upload';
import {
    PlaceOtherFormWrapLayout,
    PlaceOtherFormLayout,
    CreateFieldLayout,
    ActionLayout,
} from './PlaceFormLayout';

import { GlobalContext } from '../../context/global.state';
import adminConst from '../../utils/admin.const';

const { placeConfig } = adminConst;

//
const PlaceOtherForm = () => {

    // Router
    const router = useRouter();

    // Context
    const {
        formStorageData,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    return (

        <Fragment>
            <LightboxFormStyle />

            <PlaceOtherFormWrapLayout>
                <Col flex={1}>
                    <div className="row">
                        <h3>圖片輪播(詳細頁)</h3>
                        <div className="upload-wrap">
                            {/* <UploadMultiple /> */}
                        </div>
                    </div>
                </Col>

                <Col flex={1}>
                    <div className="row">
                        <h3>相關文件</h3>
                        upload document
                    </div>
                </Col>
            </PlaceOtherFormWrapLayout>
        </Fragment>

    );

};

PlaceOtherForm.defaultProps = {
    // content: '',
};

PlaceOtherForm.propTypes = {
    // title: PropTypes.string,
};

export default PlaceOtherForm;
