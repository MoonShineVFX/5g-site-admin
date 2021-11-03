import PartnerBase from '../src/components/partner/PartnerBase';
import { PartnerProvider } from '../src/context/partner/partner.state';
import admin from '../src/utils/admin';

const Partner = ({ pageData }) => (

    <PartnerProvider>
        <PartnerBase pageData={pageData} />
    </PartnerProvider>

);

export default Partner;

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
        url: '/partners',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '策略夥伴',
                imageSize: '152x114',
                data: data.data,
            },
        },
    };

}
