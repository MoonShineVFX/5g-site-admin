const tagReducer = (state, { type, payload }) => {

    switch (type) {
        case 'category_option':
            return {
                ...state,
                categoryOpt: payload,
            };

        case 'tag_list':
            return {
                ...state,
                lists: payload,
            };

        case 'tag_create':
            return {
                ...state,
                action: payload.action,
                lists: payload.resData.tags,
            };

        case 'tag_update':
            return {
                ...state,
                action: payload.action,
                lists: state.lists.map((obj) => {

                    if (obj.id === payload.resData.id) obj = payload.resData;
                    return obj;

                }),
            };

        default:
            return { ...state };
    }

};

export { tagReducer };
