import util from './admin';

const Service = {
    bannerList: (reqData) => util.serviceProxy('/???', reqData),
    bannerLengthControl: (reqData) => util.serviceProxy('/???', reqData),

    tagCreate: (reqData) => util.serviceProxy('/???', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/???', reqData),
};

export default Service;
