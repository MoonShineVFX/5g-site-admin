const partnerReducer = (state, { type, payload }) => {

    switch (type) {
        case 'tag_option':
            return {
                ...state,
                tagOpt: payload,
            };

        case 'partner_list':
            return {
                ...state,
                imageSize: payload.imageSize,
                lists: payload.lists,
            };

        case 'partner_create':
            return {
                ...state,
                action: payload.action,
                lists: [{ ...payload.resData }, ...state.lists],
            };

        case 'partner_update':
            return {
                ...state,
                action: payload.action,
                lists: state.lists.map((obj) => {

                    if (obj.id === payload.resData.id) obj = payload.resData;
                    return obj;

                }),
            };

        case 'partner_delete':
            return {
                ...state,
                action: payload.action,
                lists: state.lists.filter(({ id }) => id !== payload.id),
            };

        default:
            return { ...state };
    }

};

export { partnerReducer };
