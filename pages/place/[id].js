import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/place/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';

const PlaceDetail = ({ pageData }) => {

    // Context
    const { globalDispatch, formStorageDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'place',
        });

        formStorageDispatch({
            type: 'COLLECT',
            payload: pageData.data,
        });

    }, [globalDispatch, formStorageDispatch]);

    return (

        <ActionWrap
            title={pageData.title}
            serviceKey="demoPlaceUpdate"
        />

    );

};

export default PlaceDetail;

export async function getServerSideProps ({ params }) {

    const response = await admin.serviceServer({
        method: 'get',
        url: `/demo_places/${+params.id}`,
    });

    const { data } = response;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: '編輯示範場域',
                data: data.data,
            },
        },
    };

}
