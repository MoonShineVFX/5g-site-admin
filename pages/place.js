import PlaceBase from '../src/components/place/PlaceBase';
import admin from '../src/utils/admin';

const Place = ({ pageData }) => (

    <PlaceBase pageData={pageData} />

);

export default Place;

export async function getServerSideProps () {

    // const res = await admin.serviceServer({ url: '/demo_places' });
    // const { data } = res;

    const res = await fetch('http://localhost:1002/admin/json/place/place.json');
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

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