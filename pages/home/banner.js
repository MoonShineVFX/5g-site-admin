import BannerBase from '../../src/components/home/BannerBase';
import { BannerProvider } from '../../src/context/home/banner.state';
import admin from '../../src/utils/admin';

const Banner = ({ pageData }) => (

    <BannerProvider>
        <BannerBase pageData={pageData} />
    </BannerProvider>

);

export default Banner;

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
        url: '/banners',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    const res2Data = await admin.serviceServer({
        method: 'get',
        url: '/web_index',
        cookie: req.cookies.token,
    });

    const { data: data2 } = res2Data;
    
    return {
        props: {
            pageData: {
                title: 'Banner輪播設定',
                imageSize: '1140x428',
                data: {loopTime: data2.data.loopTime, ...data.data}
            },
        },
    };

}
