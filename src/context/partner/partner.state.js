import { createContext, useContext, useReducer } from 'react';
import { partnerReducer } from './partner.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    imageSize: '',
    tagOpt: [],
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

    const {
        action,
        imageSize,
        tagOpt,
        lists,
    } = partnerState;

    const { Provider } = PartnerContext;

    // 新增
    const partnerCreate = (reqData) => {

        // Fake
        const resData = {
            "id": '81344',
            "imgUrl": "//fakeimg.pl/200x150",
            "link": "http://google.com.tw",
            "name": "Create-81344",
            "phone": "02-11111111",
            "email": "service@xxx.com",
            "description": "Create-81344",
            "tag": ["4546", "4544"]
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
            "id": "156423",
            "imgUrl": "//fakeimg.pl/200x150",
            "link": "http://google.com.tw",
            "name": "Edit-156423",
            "phone": "02-11111111",
            "email": "service@xxx.com",
            "description": "Edit-156423",
            "tag": ["4545"]
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
            tagOpt,
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
