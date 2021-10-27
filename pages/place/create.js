import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/place/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';

const PlaceCreate = () => {

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
            title="新增示範場域"
            serviceKey="demoPlaceCreate"
        />

    );

};

export default PlaceCreate;
