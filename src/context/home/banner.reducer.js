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
                imageSize: payload.imageSize,
                lists: payload.lists,
            };

        case 'banner_create':
            return {
                ...state,
                action: payload.action,
                lists: [...state.lists, { ...payload.resData }],
            };

        case 'banner_update':
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

export { bannerReducer };
