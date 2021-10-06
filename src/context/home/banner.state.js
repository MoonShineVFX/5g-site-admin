import { createContext, useContext, useReducer } from 'react';
import { bannerReducer } from './banner.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    length: null,
    imageSize: '',
    lists: [],
};

// Create Context
const BannerContext = createContext(null);

// Provider
const BannerProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [bannerState, bannerDispatch] = useReducer(bannerReducer, initState);

    const { action, length, imageSize, lists } = bannerState;
    const { Provider } = BannerContext;

    // 控制前台顯示筆數
    const bannerLengthControl = (reqData) => {

        Service.bannerLengthControl(reqData)
            .then(() => bannerDispatch({ type: 'banner_length', payload: reqData }));

    };

    // 新增
    const bannerCreate = (reqData) => {

        // Fake
        const resData = {
            id: '81344',
            title: 'create-81344',
            imgUrl: '//fakeimg.pl/1200x520?text=create-81344',
            link: 'http://google.com.tw',
            priority: 3,
        };

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });
        bannerDispatch({ type: 'banner_create', payload: { resData, action: true } });

        // Debug
        return;
        Service.bannerCreate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        bannerDispatch({ type: 'banner_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const bannerUpdate = (reqData) => {

        // Fake
        // const resData = {
        //     id: '156423',
        //     title: 'update-156423',
        //     imgUrl: '//fakeimg.pl/1200x520?text=update-156423',
        //     link: 'http://yahoo.com.tw',
        //     priority: 10,
        // };

        // lightboxDispatch({ type: 'HIDE' });
        // formStorageDispatch({ type: 'CLEAR' });
        // bannerDispatch({ type: 'banner_update', payload: { resData, action: true } });

        // Debug
        // return;
        Service.bannerUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        bannerDispatch({ type: 'banner_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            length,
            imageSize,
            lists,

            bannerLengthControl,
            bannerCreate,
            bannerUpdate,

            // Dispatch
            bannerDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { BannerProvider, BannerContext };
