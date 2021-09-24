import { createContext, useContext, useReducer } from 'react';
import { partnerReducer } from './partner.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    imageSize: '',
    lists: [],
};

// Create Context
const PartnerContext = createContext(null);

// Provider
const PartnerProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [partnerState, partnerDispatch] = useReducer(partnerReducer, initState);

    const { action, imageSize, lists } = partnerState;
    const { Provider } = PartnerContext;

    // 新增
    const partnerCreate = (reqData) => {

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
        partnerDispatch({ type: 'partner_create', payload: { resData, action: true } });

        // Debug
        return;
        Service.partnerCreate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        partnerDispatch({ type: 'partner_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const partnerUpdate = (reqData) => {

        // Fake
        const resData = {
            id: '156423',
            title: 'update-156423',
            imgUrl: '//fakeimg.pl/1200x520?text=update-156423',
            link: 'http://yahoo.com.tw',
            priority: 10,
        };

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });
        partnerDispatch({ type: 'partner_update', payload: { resData, action: true } });

        // Debug
        return;
        Service.partnerUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        partnerDispatch({ type: 'partner_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            imageSize,
            lists,

            partnerCreate,
            partnerUpdate,

            // Dispatch
            partnerDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { PartnerProvider, PartnerContext };
