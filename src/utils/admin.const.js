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
            pageKey: 'index',
            subItems: [
                {
                    name: 'Banner輪播設定',
                    pageKey: 'banner',
                },
                {
                    name: '標籤管理',
                    pageKey: '/home/tags',
                },
            ],
        },
        {
            name: '最新消息',
            pageKey: 'news',
            subItems: [
                {
                    name: '新聞快訊',
                    pageKey: '/news/newsNews',
                },
                {
                    name: '產業訊息',
                    pageKey: '/news/newsIndustry',
                },
            ],
        },
        {
            name: '合作夥伴',
            pageKey: 'parner',
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
                    pageKey: 'policyCenter',
                },
                {
                    name: '地方資源',
                    pageKey: 'policyLocal',
                },
            ],
        },
        {
            name: '場域空間',
            pageKey: 'area',
            subItems: [
                {
                    name: '5G示範場域',
                    pageKey: 'area5g',
                },
                {
                    name: '互動科技示範場域',
                    pageKey: 'areaTech',
                },
            ],
        },
    ],

    lightboxTitle: {
        createBanner: '新增 Banner',
        updateBanner: '編輯 Banner',
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
