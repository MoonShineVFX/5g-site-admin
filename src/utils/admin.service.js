import util from './admin';

const Service = {
    bannerLengthControl: (reqData) => util.serviceProxy('/???', reqData),
    bannerCreate: (reqData) => util.serviceProxy('/???', reqData),
    bannerUpdate: (reqData) => util.serviceProxy('/???', reqData),

    tagCreate: (reqData) => util.serviceProxy('/???', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/???', reqData),
};

export default Service;
