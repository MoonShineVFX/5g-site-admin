import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Links from '../components/Links';
import { GlobalContext } from '../context/global.state';
import adminConst from '../utils/admin.const';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const { navbar } = adminConst;

const SiderLayout = styled(Sider)({
    height: '100vh',
    textAlign: 'center',
    padding: '20px 0',
    position: 'fixed',
    left: '0',
    overflow: 'auto',
    zIndex: '1',
    '.logo': {
        display: 'inline-block',
        marginBottom: '20px',
    },
    'li': {
        fontSize: '16px',
    },
});

const Navbar = ({ width }) => {

    // Context
    const { page } = useContext(GlobalContext);

    return (

        <SiderLayout width={width}>
            <Links url="/home/banner" className="logo">
                <img src="//fakeimg.pl/200x60?text=LOGO" alt="LOGO" />
            </Links>

            <Menu
                theme="dark"
                mode="inline"
                openKeys={navbar.flatMap(({ pageKey }) => pageKey)}
                selectedKeys={[page]}
            >
                {
                    navbar.map(({ name, pageKey, subItems }) => (

                        subItems.length ? (

                            <SubMenu key={pageKey} title={name}>
                                {
                                    subItems.map((obj) => (

                                        <Item key={obj.pageKey}>
                                            <Links url={`/${pageKey}/${obj.pageKey}`}>{obj.name}</Links>
                                        </Item>

                                    ))
                                }
                            </SubMenu>

                        ) : (

                            <Item key={pageKey}>
                                <Links url={`/${pageKey}`}>{name}</Links>
                            </Item>

                        )

                    ))
                }
            </Menu>
        </SiderLayout>

    );

};

Navbar.defaultProps = {
    width: 240,
};

Navbar.propTypes = {
    width: PropTypes.number,
};

export default Navbar;
