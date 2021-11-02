import BannerBase from '../../src/components/home/BannerBase';
import { BannerProvider } from '../../src/context/home/banner.state';
import admin from '../../src/utils/admin';

const Banner = ({ pageData }) => (

    <BannerProvider>
        <BannerBase pageData={pageData} />
    </BannerProvider>

);

export default Banner;

export async function getServerSideProps ({ req, res }) {

    console.log('banner req:', req)
    // console.log('banner res:', res)
    console.log('banner req.cookies:', req.cookies)
    console.log('banner req.cookies.token:', req.cookies.token)
    // console.log('banner length:', Object.entries(req.cookies).length)

    if (!Object.entries(req.cookies).length) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    }

    const test = {
        headers: {
            // 驗證(列表需要)
            Authorization: `Bearer ${req.cookies.token}`,
        },
    };

    const resData = await admin.serviceServer({
        method: 'get',
        url: '/banners',
        cookie: req.cookies.token,
        // headers: test,
    });

    console.log('betty resData:', resData)
    const { data } = resData;
    console.log('betty data:', data)


    if (!data.result) {

        return {
            notFound: true,
            // redirect: {
            //     destination: '/login',
            //     permanent: false,
            // },
        };

    }

    return {
        props: {
            pageData: {
                title: 'Banner輪播設定',
                imageSize: '1140x428',
                data: data.data,
            },
        },
    };

}
