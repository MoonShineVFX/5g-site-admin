const newsReducer = (state, { type, payload }) => {

    switch (type) {
        case 'tag_option':
            return {
                ...state,
                tagOpt: payload,
            };

        case 'news_list':
            return {
                ...state,
                lists: payload.lists,
            };

        case 'news_create':
            return {
                ...state,
                action: payload.action,
                lists: [{ ...payload.resData }, ...state.lists],
            };

        case 'news_update':
            return {
                ...state,
                lists: state.lists.map((obj) => {

                    if (obj.id === payload.resData.id) obj = payload.resData;
                    return obj;

                }),
            };

        default:
            return { ...state };
    }

};

export { newsReducer };
