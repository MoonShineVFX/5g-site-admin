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

export async function getServerSideProps ({ params, req }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const resData = await admin.serviceServer({
        method: 'get',
        url: `/demo_places/${+params.id}`,
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '編輯示範場域',
                data: data.data,
            },
        },
    };

}
