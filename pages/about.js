import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadTag from '../src/containers/HeadTag';
import ContentHeader from '../src/containers/ContentHeader';
import TextEditorForm from '../src/components/TextEditorForm';
import { GlobalContext } from '../src/context/global.state';
import admin from '../src/utils/admin';

const { pathnameKey } = admin;

const About = ({ pageData }) => {

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
                serviceKey="aboutUpdate"
                successCallback={() => router.reload()}
            />
        </Fragment>

    );

};

export default About;

export async function getStaticProps () {

    const res = await admin.serviceServer({ url: '/about' });
    const { data } = res;

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
                title: '關於我們',
                data: data.data.detail,
            },
        },
    };

}
