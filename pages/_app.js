import { Fragment } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../src/containers/GlobalStyle';
import theme from '../src/utils/theme';
import Navbar from '../src/containers/Navbar';
import MainContent from '../src/containers/MainContent';
import FontIcon from '../src/components/FontIcon';

// Context
import { GlobalProvider } from '../src/context/global.state';

const { Header, Content, Footer } = Layout;
const navbarWidth = 240;

const HeaderLayout = styled(Header)(({ theme }) => ({
    textAlign: 'right',
    backgroundColor: theme.palette.container,
    padding: '0 20px',
    'svg': {
        fontSize: '1.4em',
    },
    '.account': {
        fontSize: '16px',
        marginLeft: '8px',
    },
    '.logout': {
        marginLeft: '12px',
        padding: '4px',
        cursor: 'pointer',
    },
}));

const ContentLayout = styled(Content)({
    marginBottom: '40px',
    padding: '30px 30px 20px',
});

const FooterLayout = styled(Footer)(({ theme}) => ({
    textAlign: 'center',
    backgroundColor: theme.palette.container,
}));

//
const AdminSite = ({ Component, pageProps }) => {

    const handleLogout = () => {

        console.log('logout');

    };

    return (

        <Fragment>
            <Head>
                <title>中華電信5G後台管理</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <ThemeProvider theme={theme}>
                <GlobalStyle />

                <GlobalProvider>
                    <Layout>
                        <Navbar width={navbarWidth} />

                        <Layout
                            style={{ marginLeft: navbarWidth, backgroundColor: '#FFF' }}
                        >
                            <HeaderLayout>
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
                            </HeaderLayout>

                            <ContentLayout>
                                <section>
                                    <MainContent
                                        Component={Component}
                                        pageProps={pageProps}
                                    />
                                </section>
                            </ContentLayout>

                            <FooterLayout>中華電信 5G ©2021 Created by MoonShine</FooterLayout>
                        </Layout>
                    </Layout>
                </GlobalProvider>
            </ThemeProvider>
        </Fragment>

    );

};

export default AdminSite;
