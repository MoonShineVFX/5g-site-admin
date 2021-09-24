import { createContext, useContext, useReducer } from 'react';
import { tagReducer } from './tag.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    lists: [],
    categoryOpt: [],
};

// Create Context
const TagContext = createContext(null);

// Provider
const TagProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [tagState, tagDispatch] = useReducer(tagReducer, initState);

    const { action, lists, categoryOpt } = tagState;
    const { Provider } = TagContext;

    // 新增
    const tagCreate = (reqData) => {

        // Fake
        const resData = [
            {
                id: '81344',
                name: 'create-81344',
                category: '',
                categoryName: '',
            },
            {
                id: '81345',
                name: 'create-81345',
                category: 'newsIndustry',
                categoryName: '產業訊息',
            },
        ];

        formStorageDispatch({ type: 'CLEAR' });
        tagDispatch({ type: 'tag_create', payload: { resData, action: true } });

        // Debug
        return;
        Service.tagCreate(reqData)
            .then((resData) => {

                formStorageDispatch({ type: 'CLEAR' });
                tagDispatch({ type: 'tag_create', payload: { resData, action: true } });

            });

    };

    // 編輯
    const tagUpdate = (reqData) => {

        // Fake
        const resData = {
            id: '156421',
            name: 'update-11111',
            category: 'news',
            categoryName: '新聞快訊',
        };

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });
        tagDispatch({ type: 'tag_update', payload: { resData, action: true } });

        // Debug
        return;
        Service.tagUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        tagDispatch({ type: 'tag_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            lists,
            categoryOpt,

            tagCreate,
            tagUpdate,

            // Dispatch
            tagDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { TagProvider, TagContext };
