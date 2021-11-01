import PolicyBase from '../src/components/policy/PolicyBase';
import { PolicyProvider } from '../src/context/policy/policy.state';
import admin from '../src/utils/admin';

const Policy = ({ pageData }) => (

    <PolicyProvider>
        <PolicyBase pageData={pageData} />
    </PolicyProvider>

);

export default Policy;

export async function getServerSideProps () {

    const res = await admin.serviceServer({ method: 'get', url: '/policies' });
    const { data } = res;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: '政策資源',
                data: data.data,
            },
        },
    };

}
