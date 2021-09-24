const partnerReducer = (state, { type, payload }) => {

    switch (type) {
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
                lists: state.lists.map((obj) => {

                    if (obj.id === payload.resData.id) obj = payload.resData;
                    return obj;

                }),
            };

        default:
            return { ...state };
    }

};

export { partnerReducer };
