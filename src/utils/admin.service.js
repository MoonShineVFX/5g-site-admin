import util from './admin';

const Service = {
    // common
    common: (reqData) => util.serviceProxy({
        url: '/common.json',
        method: 'get',
    }, reqData),

    // Banner
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

    // 標籤管理
    tagCreate: (reqData) => util.serviceProxy('/???', reqData),
    tagUpdate: (reqData) => util.serviceProxy('/???', reqData),

    // 合作夥伴
    partnerCreate: (reqData) => util.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    partnerUpdate: (reqData) => util.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 上傳檔案 (圖片 > 編輯器用)
    fileUploadEditor: (reqData) => util.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 最新消息
    newsDetail: (reqData) => util.serviceProxy('/???', reqData),
    newsCreate: (reqData) => util.serviceProxy('/???', reqData),
    newsUpdate: (reqData) => util.serviceProxy('/???', reqData),

    // 關於我們
    aboutDetail: (reqData) => util.serviceProxy('/???', reqData),
    aboutUpdate: (reqData) => util.serviceProxy('/???', reqData),
};

export default Service;
