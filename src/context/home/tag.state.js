import { createContext, useReducer } from 'react';
import { tagReducer } from './tag.reducer';

// Init
const initState = {
    lists: [],
    categoryOpt: [],
};

// Create Context
const TagContext = createContext(null);

// Provider
const TagProvider = ({ children }) => {

    // Context
    const [tagState, tagDispatch] = useReducer(tagReducer, initState);

    const { lists, categoryOpt } = tagState;
    const { Provider } = TagContext;

    return (

        <Provider value={{
            lists,
            categoryOpt,

            // Dispatch
            tagDispatch,
        }}>
            {children}
        </Provider>
    );

};

export {
    TagProvider,
    TagContext,
};
