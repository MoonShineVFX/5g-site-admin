import { createContext, useContext, useReducer } from 'react';
import { policyReducer } from './policy.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    lists: [],
};

// Create Context
const PolicyContext = createContext(null);

// Provider
const PolicyProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [policyState, policyDispatch] = useReducer(policyReducer, initState);
    const { action, lists } = policyState;
    const { Provider } = PolicyContext;

    // 新增
    const policyCreate = (reqData) => {

        Service.policyCreate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        policyDispatch({ type: 'policy_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const policyUpdate = (reqData) => {

        Service.policyUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        policyDispatch({ type: 'policy_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 刪除
    const policyDelete = (id) => {

        Service.policyDelete({ id: +id })
            .then(() => {

                Prompt('success', {
                    callback: () => {

                        policyDispatch({ type: 'policy_delete', payload: { id, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            lists,

            policyCreate,
            policyUpdate,
            policyDelete,

            // Dispatch
            policyDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { PolicyProvider, PolicyContext };
