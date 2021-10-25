import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ActionWrap from '../../src/components/news/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

const title = '新增文章';

const NewsCreate = () => {

    // Router
    const router = useRouter();

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
            successCallback={() => router.push('/news')}
        />

    );

};

export default NewsCreate;
