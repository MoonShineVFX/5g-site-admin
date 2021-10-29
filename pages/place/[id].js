import { useContext, useEffect } from 'react';
import ActionWrap from '../../src/components/place/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';

const PlaceDetail = ({ pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: 'place',
        });

    }, [globalDispatch]);

    return (

        <ActionWrap
            title={pageData.title}
            data={pageData.data}
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
