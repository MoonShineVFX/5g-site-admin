import admin from './admin';

const Service = {
    // login
    login: ({ reqData, headers }) => admin.serviceProxy('/get_token', reqData, {
        headers: { ...headers },
    }),

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
    bannerDelete: (reqData) => admin.serviceProxy('/banner_delete', reqData),

    // 標籤管理
    tagCreate: (reqData) => admin.serviceProxy('/tag_create', reqData),
    tagUpdate: (reqData) => admin.serviceProxy('/tag_update', reqData),
    tagDelete: (reqData) => admin.serviceProxy('/tag_delete', reqData),

    // 策略夥伴
    partnerCreate: (reqData) => admin.serviceProxy('/partner_create', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    partnerUpdate: (reqData) => admin.serviceProxy('/partner_update', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    partnerDelete: (reqData) => admin.serviceProxy('/partner_delete', reqData),

    // 上傳檔案 (圖片 > 編輯器用)
    fileUploadEditor: (reqData) => admin.serviceProxy('/image_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 示範場域: 上傳圖片
    demoPlaceUploadImage: (reqData) => admin.serviceProxy('/demo_place_image_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 示範場域: 刪除圖片
    demoPlaceRemoveImage: (reqData) => admin.serviceProxy('/demo_place_image_delete', reqData),

    // 示範場域: 上傳檔案
    demoPlaceUploadFile: (reqData) => admin.serviceProxy('/demo_place_file_upload', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

    // 示範場域: 刪除檔案
    demoPlaceRemoveFile: (reqData) => admin.serviceProxy('/demo_place_file_delete', reqData),

    // 最新消息
    newsCreate: (reqData) => admin.serviceProxy('/news_create', reqData),
    newsUpdate: (reqData) => admin.serviceProxy('/news_update', reqData),
    newsDelete: (reqData) => admin.serviceProxy('/news_delete', reqData),

    // 關於我們
    aboutUpdate: (reqData) => admin.serviceProxy('/about_update', reqData),

    // 示範場域
    demoPlaceCreate: (reqData) => admin.serviceProxy('/demo_place_create', reqData),
    demoPlaceUpdate: (reqData) => admin.serviceProxy('/demo_place_update', reqData),
    demoPlaceDelete: (reqData) => admin.serviceProxy('/demo_place_delete', reqData),

    // 政策資源
    policyCreate: (reqData) => admin.serviceProxy('/policy_create', reqData),
    policyUpdate: (reqData) => admin.serviceProxy('/policy_update', reqData),
    policyDelete: (reqData) => admin.serviceProxy('/policy_delete', reqData),

    // 資安說明
    securityUpdate: (reqData) => admin.serviceProxy('/security_update', reqData),

    // 隱私權政策
    privacyUpdate: (reqData) => admin.serviceProxy('/privacy_update', reqData),
};

export default Service;
