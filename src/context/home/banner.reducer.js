const bannerReducer = (state, { type, payload }) => {

    switch (type) {
        case 'banner_length':
            return {
                ...state,
                ...payload,
            };

        case 'banner_list':
            return {
                ...state,
                lists: payload,
            };

        case 'banner_create':
            return {
                ...state,
                lists: [...payload.resData, ...state.lists],
            };

        case 'banner_update':
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

export { bannerReducer };
