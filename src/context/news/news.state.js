import { createContext, useContext, useReducer } from 'react';
import { newsReducer } from './news.reducer';
import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/admin.service';

// Init
const initState = {
    action: false,
    lists: [],
};

// Create Context
const NewsContext = createContext(null);

// Provider
const NewsProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [newsState, newsDispatch] = useReducer(newsReducer, initState);

    const {
        action,
        lists,
    } = newsState;

    const { Provider } = NewsContext;

    // 新增
    const newsCreate = (reqData) => {

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
        newsDispatch({ type: 'partner_create', payload: { resData, action: true } });

        // Debug
        return;
        Service.newsCreate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        newsDispatch({ type: 'partner_create', payload: { resData, action: true } });

                    },
                });

            });

    };

    // 編輯
    const newsUpdate = (reqData) => {

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
        newsDispatch({ type: 'partner_update', payload: { resData, action: true } });

        // Debug
        return;
        Service.newsUpdate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                Prompt('success', {
                    callback: () => {

                        formStorageDispatch({ type: 'CLEAR' });
                        newsDispatch({ type: 'partner_update', payload: { resData, action: true } });

                    },
                });

            });

    };

    return (

        <Provider value={{
            action,
            lists,

            newsCreate,
            newsUpdate,

            // Dispatch
            newsDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { NewsProvider, NewsContext };
