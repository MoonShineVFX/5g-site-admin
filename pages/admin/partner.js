import PartnerBase from '../../src/components/partner/PartnerBase';
import { PartnerProvider } from '../../src/context/partner/partner.state';
import admin from '../../src/utils/admin';

const Partner = ({ pageData }) => (

    <PartnerProvider>
        <PartnerBase pageData={pageData} />
    </PartnerProvider>

);

export default Partner;

export async function getStaticProps () {

    const res = await admin.serviceServer({ url: '/partners' });
    const { data } = res;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: '合作夥伴',
                imageSize: '200x150',
                data: data.data,
            },
        },
    };

}
