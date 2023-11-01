import { createContext, useContext, useReducer } from 'react';
import { bannerReducer } from './banner.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    length: null,
    loopTime: null,
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

    const { action, length, loopTime, imageSize, lists } = bannerState;
    const { Provider } = BannerContext;

    // 控制前台顯示筆數
    const bannerLengthControl = (reqData) => {

        Service.bannerLengthControl(reqData)
            .then(() => bannerDispatch({ type: 'banner_length', payload: reqData }));

    };

    //控制前台輪播時間
    const bannerLoopControl = (reqData) => {
            
            Service.bannerLoopControl(reqData)
                .then(() => bannerDispatch({ type: 'banner_loop', payload: reqData }));

    }
    // 新增
    const bannerCreate = (reqData) => {

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

    // 刪除
    const bannerDelete = (id) => {

        Service.bannerDelete({ id: +id })
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        bannerDispatch({ type: 'banner_delete', payload: { id, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            length,
            loopTime,
            imageSize,
            lists,

            bannerLengthControl,
            bannerLoopControl,
            bannerCreate,
            bannerUpdate,
            bannerDelete,

            // Dispatch
            bannerDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { BannerProvider, BannerContext };
