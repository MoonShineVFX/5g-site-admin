import PartnerBase from '../src/components/partner/PartnerBase';
import { PartnerProvider } from '../src/context/partner/partner.state';

const Partner = ({ pageData }) => (

    <PartnerProvider>
        <PartnerBase pageData={pageData} />
    </PartnerProvider>

);

export default Partner;

export async function getStaticProps () {

    // const res = await util.ServiceServer('api/user/userList');
    // const { data } = res;

    const res = await fetch('http://localhost:1002/json/partner.json');
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
                title: '合作夥伴',
                imageSize: '200x150',
                data: data.data,
            },
        },
    };

}
