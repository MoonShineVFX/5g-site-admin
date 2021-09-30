import React, { createContext, useReducer } from 'react';
import Service from '../utils/admin.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
    page: 'banner',
    newsTag: [],
    user: {},
};

// Form values
const formStorageInitState = {
    formStorageData: {},
};

// Lightbox
const lightboxInitState = {
    visible: false,
    currEvent: '',
};

// Create Context
const GlobalContext = createContext(null);

// Provider
const GlobalProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [formStorageState, formStorageDispatch] = useReducer(formStorageReducer, formStorageInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const {
        page,
        newsTag,
        user,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    // 取得全域資料
    const getGlobalData = () => {

        Service.common()
            .then((resData) => {

                const { tag, ...rest } = resData;
                globalDispatch({
                    type: 'global_data',
                    payload: {
                        tag,
                        other: rest,
                    },
                });

            });

    };

    return (

        <Provider value={{
            // 全域資料
            page,
            newsTag,
            user,
            getGlobalData,

            // Form 表單暫存
            formStorageData,

            // Lightbox
            visible,
            currEvent,

            // Dispatch
            globalDispatch,
            formStorageDispatch,
            lightboxDispatch,
        }}>
            {children}
        </Provider>

    );

};

export { GlobalContext, GlobalProvider };
