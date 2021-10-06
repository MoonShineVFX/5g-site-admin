import admin from './admin';

const Service = {
    // common
    common: (reqData) => admin.serviceProxy('/common', reqData),

    // Banner
    bannerLengthControl: (reqData) => admin.serviceProxy('/banner_length_setting', reqData),
    bannerCreate: (reqData) => admin.serviceProxy('/banner_create', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    bannerUpdate: (reqData) => admin.serviceProxy('/banner_update', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 標籤管理
    tagCreate: (reqData) => admin.serviceProxy('/???', reqData),
    tagUpdate: (reqData) => admin.serviceProxy('/???', reqData),

    // 合作夥伴
    partnerCreate: (reqData) => admin.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    partnerUpdate: (reqData) => admin.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 上傳檔案 (圖片 > 編輯器用)
    fileUploadEditor: (reqData) => admin.serviceProxy('/???', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 最新消息
    newsDetail: (reqData) => admin.serviceProxy('/???', reqData),
    newsCreate: (reqData) => admin.serviceProxy('/???', reqData),
    newsUpdate: (reqData) => admin.serviceProxy('/???', reqData),

    // 關於我們
    aboutDetail: (reqData) => admin.serviceProxy('/???', reqData),
    aboutUpdate: (reqData) => admin.serviceProxy('/???', reqData),
};

export default Service;
