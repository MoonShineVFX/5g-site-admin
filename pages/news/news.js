import React, { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';

const News = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    const { globalDispatch } = useContext(GlobalContext);
    const { pathname } = useRouter();

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: admin.pathnameKey(pathname),
        });

    }, [globalDispatch, pathname]);

    return (

        <Fragment>
            <div>This is News~</div>
        </Fragment>

    );

};

export default News;

// export async function getStaticProps () {

//     // const res = await util.ServiceServer('api/user/userList');
//     // const { data } = res;

//     const res = await fetch('http://localhost:1002/json/home/banner.json');
//     const data = await res.json();

//     if (!data.result) {

//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };

//     }

//     return {
//         props: {
//             pageData: {
//                 title: 'Banner輪播設定',
//                 data: data.data,
//             },
//         },
//     };

// }
