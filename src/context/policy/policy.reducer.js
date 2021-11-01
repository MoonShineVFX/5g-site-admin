const policyReducer = (state, { type, payload }) => {

    switch (type) {
        case 'policy_list':
            return {
                ...state,
                lists: payload.lists,
            };

        case 'policy_create':
            return {
                ...state,
                action: payload.action,
                lists: [{ ...payload.resData }, ...state.lists],
            };

        case 'policy_update':
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

export { policyReducer };
