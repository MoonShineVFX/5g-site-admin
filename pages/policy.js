import PolicyBase from '../src/components/policy/PolicyBase';
import { PolicyProvider } from '../src/context/policy/policy.state';
import admin from '../src/utils/admin';

const Policy = ({ pageData }) => (

    <PolicyProvider>
        <PolicyBase pageData={pageData} />
    </PolicyProvider>

);

export default Policy;

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
        method: 'get', // Notes: 後端目前只允許 get
        url: '/policies',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '政策資源',
                data: data.data,
            },
        },
    };

}
