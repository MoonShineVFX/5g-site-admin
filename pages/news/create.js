import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/news/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

const title = '新增文章';

const NewsCreate = () => {

    // Context
    const { globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'news',
        });

        formStorageDispatch({ type: 'CLEAR' });

    }, [globalDispatch, formStorageDispatch]);

    return (

        <ActionWrap
            title={title}
            serviceKey="newsCreate"
            isActive={true}
        />

    );

};

export default NewsCreate;
