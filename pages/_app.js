import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import Navbar from '../src/containers/Navbar';
import MainContent from '../src/containers/MainContent';
import FontIcon from '../src/components/FontIcon';

// Context
import { GlobalProvider } from '../src/context/global.state';

const { Header, Content, Footer } = Layout;
const navbarWidth = 240;

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #F0F2F5;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const theme = {
    // main: 'mediumseagreen',
};

const HeaderBase = styled(Header)`
    text-align: right;
    background-color: #FFF;
    padding: 0 20px;
    svg {
        font-size: 1.4em;
    }
    .account {
        font-size: 16px;
        margin-left: 8px;
    }
    .logout {
        margin-left: 12px;
        padding: 4px;
        cursor: pointer;
    }
`;

const ContentBase = styled(Content)`
    margin-bottom: 40px;
    padding: 20px;
    section {
        background-color: #FFF;
        padding: 30px;
    }
`;

//
const AdminSite = ({ Component, pageProps }) => {

    const router = useRouter();

    // useEffect(() => {

    //     const handleRouteChange = (url, { shallow }) => {

    //         console.log(
    //             `App is changing to ${url} ${
    //             shallow ? 'with' : 'without'
    //             } shallow routing`
    //         );

    //     };

    //     router.events.on('routeChangeStart', handleRouteChange);

    //     return () => {

    //         router.events.off('routeChangeStart', handleRouteChange);

    //     };

    // }, []);

    const handleLogout = () => {

        console.log('logout');

    };

    return (

        <Fragment>
            <Head>
                <title>5G 後台</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <ThemeProvider theme={theme}>
                <GlobalStyle />

                <GlobalProvider>
                    <Layout>
                        <Navbar width={navbarWidth} />

                        <Layout
                            style={{ marginLeft: navbarWidth }}
                        >
                            <HeaderBase>
                                <span>
                                    <FontIcon icon={faUserShield} />
                                    <span className="account">administrator</span>
                                </span>
                                <span
                                    className="logout"
                                    onClick={handleLogout}
                                >
                                    <FontIcon icon={faSignOutAlt} />
                                </span>
                            </HeaderBase>

                            <ContentBase>
                                <section>
                                    <MainContent
                                        Component={Component}
                                        pageProps={pageProps}
                                    />
                                </section>
                            </ContentBase>

                            <Footer style={{ textAlign: 'center' }}>中華電信 5G ©2021 Created by MoonShine</Footer>
                        </Layout>
                    </Layout>
                </GlobalProvider>
            </ThemeProvider>
        </Fragment>

    );

};

export default AdminSite;
