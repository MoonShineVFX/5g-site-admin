import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';
import Cookies from 'js-cookie';

const MainContent = ({ children }) => {

    // Context
    const { getGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        if (Cookies.get()?.token) getGlobalData();

    }, []);

    return <section className="section">{children}</section>;

};

export default MainContent;
