import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ActionWrap from '../../src/components/place/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

const title = '新增示範場域';

const PlaceCreate = () => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'place',
        });

        formStorageDispatch({ type: 'CLEAR' });

    }, [globalDispatch, formStorageDispatch]);

    return (

        <ActionWrap
            title={title}
            serviceKey="placeCreate"
            successCallback={() => router.push('/place')}
        />

    );

};

export default PlaceCreate;
