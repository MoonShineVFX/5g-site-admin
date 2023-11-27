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
        url: '/policies',
        cookie: req.cookies.token,
    });

    const { data } = resData;
    const dataWithSerial = data.data.list.map((item, index) => {
            item.serial = index + 1;
            return item;
        }
    );

    return {
        props: {
            pageData: {
                title: '政策資源',
                data: {list: dataWithSerial},
            },
        },
    };

}
