import { Fragment } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled, { ThemeProvider } from 'styled-components';

import HeadTag from '../src/containers/HeadTag';
import GlobalStyle from '../src/containers/GlobalStyle';
import theme from '../src/utils/theme';
import Navbar from '../src/containers/Navbar';
import FontIcon from '../src/components/FontIcon';

// Context
import { GlobalProvider } from '../src/context/global.state';

const { Header, Content, Footer } = Layout;
const navbarWidth = 240;

const HeaderLayout = styled(Header)(({ theme }) => ({
    height: 'auto',
    lineHeight: '1',
    textAlign: 'right',
    backgroundColor: theme.palette.container,
    padding: '16px 20px',
    'svg': {
        fontSize: '1.1em',
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
    height: 'calc(100vh - 50px - 54px - 30px)', // header: 50px, footer: 54px, main margin bottom: 30px
    marginBottom: '30px',
    padding: '30px 30px 20px',
    '> section': {
        height: '100%',
    },
});

const FooterLayout = styled(Footer)(({ theme}) => ({
    textAlign: 'center',
    backgroundColor: theme.palette.container,
    paddingTop: '16px',
    paddingBottom: '16px',
}));

//
const AdminSite = ({ Component, pageProps }) => {

    const handleLogout = () => {

        console.log('logout');

    };

    return (

        <Fragment>
            <HeadTag />

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
                                    <Component {...pageProps} />
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
