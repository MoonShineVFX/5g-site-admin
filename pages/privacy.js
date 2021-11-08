import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadTag from '../src/containers/HeadTag';
import ContentHeader from '../src/containers/ContentHeader';
import TextEditorForm from '../src/components/TextEditorForm';
import { GlobalContext } from '../src/context/global.state';
import admin from '../src/utils/admin';

const { pathnameKey } = admin;

const Privacy = ({ pageData }) => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(router.pathname, true),
        });

    }, [globalDispatch, router.pathname]);

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            />

            <TextEditorForm
                content={pageData.data}
                serviceKey="privacyUpdate"
                successCallback={() => router.reload()}
            />
        </Fragment>

    );

};

export default Privacy;

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
        url: '/privacy',
        cookie: req.cookies.token,
    });

    const { data } = resData;

    return {
        props: {
            pageData: {
                title: '隱私權政策',
                data: data.data.detail,
            },
        },
    };

}
