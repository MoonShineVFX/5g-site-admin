import dayjs from 'dayjs';

const adminConst = {
    mobileWidth: 768,
    today: dayjs().format('YYYY-MM-DD'),
    sendSuccessText: '資料已成功送出，將於 3 秒後更新。',
    emptyText: '目前沒有資料...',
    errorText: '此欄位為必填!',

    // 側邊攔
    navbar: [
        {
            name: '首頁',
            pageKey: 'home',
            subItems: [
                {
                    name: 'Banner輪播設定',
                    pageKey: 'banner',
                },
                {
                    name: '標籤管理',
                    pageKey: 'tags',
                },
            ],
        },
        {
            name: '最新消息',
            pageKey: 'news',
            subItems: [],
        },
        {
            name: '策略夥伴',
            pageKey: 'partner',
            subItems: [],
        },
        {
            name: '關於我們',
            pageKey: 'about',
            subItems: [],
        },
        {
            name: '場域空間',
            pageKey: 'place',
            subItems: [],
        },
        {
            name: '政策資源',
            pageKey: 'policy',
            subItems: [],
        },
        {
            name: '資安說明',
            pageKey: 'security',
            subItems: [],
        },
        {
            name: '隱私權政策',
            pageKey: 'privacy',
            subItems: [],
        },
    ],

    lightboxTitle: {
        createBanner: '新增 Banner',
        updateBanner: '編輯 Banner',
        createTag: '新增標籤',
        updateTag: '編輯標籤',
        createPartner: '新增夥伴',
        updatePartner: '編輯夥伴',
        createPolicy: '新增政策資源',
        updatePolicy: '編輯政策資源',
        settingTag: '設定標籤',
    },

    placeConfig: {
        '5g': '5G',
        'tech': '互動科技',
    },

    policyConfig: {
        'local': '地方資源',
        'center': '中央資源',
    },

    // Prompt type
    prompts: {
        info: '提示',
        warning: '警告',
        error: '錯誤',
        success: '成功',
    },

    // Yes or No
    yesOrNo: {
        'false': '否',
        'true': '是',
    },
};

export default adminConst;
