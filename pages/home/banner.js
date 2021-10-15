import BannerBase from '../../src/components/home/BannerBase';
import { BannerProvider } from '../../src/context/home/banner.state';
import admin from '../../src/utils/admin';

const Banner = ({ pageData }) => (

    <BannerProvider>
        <BannerBase pageData={pageData} />
    </BannerProvider>

);

export default Banner;

export async function getStaticProps () {

    const res = await admin.serviceServer({
        method: 'get',
        url: '/banners',
    });

    const { data } = res;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        revalidate: 3,
        props: {
            pageData: {
                title: 'Banner輪播設定',
                imageSize: '1200x520',
                data: data.data,
            },
        },
    };

}
