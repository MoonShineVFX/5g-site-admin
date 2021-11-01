import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, message } from 'antd';
import LightboxFormStyle from '../LightboxFormStyle';
import UploadFiles from '../UploadFiles';
import { PlaceOtherFormWrapLayout } from './PlaceFormLayout';
import Service from '../../utils/admin.service';

const PlaceOtherForm = ({ data }) => {

    // State
    const [imageLists, setImageLists] = useState(data.images);
    const [fileLists, setFileLists] = useState(data.files);

    // 送資料
    const handleUploadData = ({ file }, type = 'image') => {

        const isLt10M = file.size / 1024 / 1024 < 10;
        const formData = new FormData();
        const config = {
            image: 'demoPlaceUploadImage',
            file: 'demoPlaceUploadFile',
        };

        if (!isLt10M) {

            message.error('檔案不能超過 5MB，請重新上傳!!!');
            return;

        }

        formData.append('demoPlaceId', data.id);
        formData.append('file', file);

        Service[config[type]](formData)
            .then((resData) => {

                if (type === 'image') setImageLists([...imageLists, { ...resData }]);
                else setFileLists([...fileLists, { ...resData }]);

            });

    };

    // 刪除檔案
    const handleRemove = (file, type = 'image') => {

        const config = {
            image: 'demoPlaceRemoveImage',
            file: 'demoPlaceRemoveFile',
        };

        Service[config[type]]({ id: file.uid })
            .then(() => {

                if (type === 'image') setImageLists(imageLists.filter(({ id }) => id !== file.uid));
                else setFileLists(fileLists.filter(({ id }) => id !== file.uid));

            });

    };

    return (

        <Fragment>
            <LightboxFormStyle />

            <PlaceOtherFormWrapLayout>
                <Col span={12}>
                    <div className="row">
                        <h3>圖片輪播(詳細頁)</h3>
                        <UploadFiles
                            fileData={imageLists}
                            size="778x438"
                            handleUploadData={handleUploadData}
                            handleRemove={handleRemove}
                        />
                    </div>
                </Col>

                <Col span={12}>
                    <div className="row">
                        <h3>相關文件</h3>
                        <UploadFiles
                            type="file"
                            fileData={fileLists}
                            handleUploadData={(obj) => handleUploadData(obj, 'file')}
                            handleRemove={(obj) => handleRemove(obj, 'file')}
                        />
                    </div>
                </Col>
            </PlaceOtherFormWrapLayout>
        </Fragment>

    );

};

PlaceOtherForm.propTypes = {
    data: PropTypes.object,
};

export default PlaceOtherForm;
