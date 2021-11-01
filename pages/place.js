import PlaceBase from '../src/components/place/PlaceBase';
import admin from '../src/utils/admin';

const Place = ({ pageData }) => (

    <PlaceBase pageData={pageData} />

);

export default Place;

export async function getServerSideProps ({ req }) {

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
        url: '/demo_places',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '場域空間',
                imageSize: '563x312',
                data: data.data,
            },
        },
    };

}
