import util from './admin';

const Service = {
    bannerLengthControl: (reqData) => util.serviceProxy('/???', reqData),
    bannerCreate: (reqData) => util.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    bannerUpdate: (reqData) => util.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    tagCreate: (reqData) => util.serviceProxy('/???', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/???', reqData),
};

export default Service;
