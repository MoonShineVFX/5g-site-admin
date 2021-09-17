const tagReducer = (state, { type, payload }) => {

    switch (type) {
        case 'category_option':
            return {
                ...state,
                categoryOpt: { ...payload },
            };

        case 'tag_list':
            return {
                ...state,
                lists: { ...payload },
            };

        default:
            return { ...state };
    }

};

export {
    tagReducer,
};
