import dayjs from 'dayjs';

const adminConst = {
    mobileWidth: 768,
    today: dayjs().format('YYYY-MM-DD'),
    sendSuccessText: '資料已成功送出',
    emptyText: '目前沒有資料...',
    errorText: '此欄位為必填!',
    startDateText: '開始時間',
    endDateText: '結束時間',
    formatDate: 'YYYY/MM/DD',

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
            name: '合作夥伴',
            pageKey: 'partner',
            subItems: [],
        },
        {
            name: '關於我們',
            pageKey: 'about',
            subItems: [],
        },
        {
            name: '政策資源',
            pageKey: 'policy',
            subItems: [
                {
                    name: '中央資源',
                    pageKey: 'center',
                },
                {
                    name: '地方資源',
                    pageKey: 'local',
                },
            ],
        },
        {
            name: '場域空間',
            pageKey: 'area',
            subItems: [
                {
                    name: '5G示範場域',
                    pageKey: '5g',
                },
                {
                    name: '互動科技示範場域',
                    pageKey: 'tech',
                },
            ],
        },
    ],

    lightboxTitle: {
        createBanner: '新增 Banner',
        updateBanner: '編輯 Banner',
        createTag: '新增標籤',
        updateTag: '編輯標籤',
        createPartner: '新增夥伴',
        updatePartner: '編輯夥伴',
        settingTag: '設定標籤',
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
