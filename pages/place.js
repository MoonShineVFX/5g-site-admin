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

    const dataWithSerial = data.data.list.map((item, index) => {
            item.serial = index + 1;
            return item;
        });

    return {
        props: {
            pageData: {
                title: '場域空間',
                imageSize: '563x312',
                data: {list: dataWithSerial},
            },
        },
    };

}
