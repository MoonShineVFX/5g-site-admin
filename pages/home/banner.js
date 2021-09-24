import BannerBase from '../../src/components/home/BannerBase';
import { BannerProvider } from '../../src/context/home/banner.state';

const Banner = ({ pageData }) => (

    <BannerProvider>
        <BannerBase pageData={pageData} />
    </BannerProvider>

);

export default Banner;

export async function getStaticProps () {

    // const res = await util.ServiceServer('api/user/userList');
    // const { data } = res;

    const res = await fetch('http://localhost:1002/json/home/banner.json');
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    return {
        props: {
            pageData: {
                title: 'Banner輪播設定',
                imageSize: '1200x520',
                data: data.data,
            },
        },
    };

}
