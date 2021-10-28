import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ActionWrap from '../../src/components/place/ActionWrap';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';

const PlaceDetail = ({ pageData }) => {

    // console.log('pageData:', pageData)

    // Router
    const router = useRouter();

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

    }, [globalDispatch]);

    return (

        <ActionWrap
            title={pageData.title}
            serviceKey="demoPlaceUpdate"
            successCallback={() => router.push('/place')}
        />

    );

};

export default PlaceDetail;

export async function getServerSideProps ({ params }) {

    // const response = await admin.serviceServer({
    //     method: 'get',
    //     url: `/demo_places/${+params.id}`,
    // });

    // const { data } = response;

    const res = await fetch('http://localhost:1002/admin/json/place/8313.json');
    const data = await res.json();

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
