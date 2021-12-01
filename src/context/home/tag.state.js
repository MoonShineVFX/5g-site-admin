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

        Service.tagCreate(reqData)
            .then((resData) => {

                formStorageDispatch({ type: 'CLEAR' });
                tagDispatch({ type: 'tag_create', payload: { resData, action: true } });

            });

    };

    // 編輯
    const tagUpdate = (reqData) => {

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

    // 刪除
    const tagDelete = (id) => {

        Service.tagDelete({ id: +id })
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        tagDispatch({ type: 'tag_delete', payload: { id, action: true } });

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
            tagDelete,

            // Dispatch
            tagDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { TagProvider, TagContext };
