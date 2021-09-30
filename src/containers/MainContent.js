import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';

const MainContent = ({ children }) => {

    // Context
    const { getGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        getGlobalData();

    }, []);

    return children;

};

export default MainContent;
