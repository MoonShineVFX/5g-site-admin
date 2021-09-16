import React, { Fragment, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// export async function getStaticProps () {

//     const res = await util.serviceServer('api/user/userList');
//     const { data } = res;

//     if (!data.result) {

//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };

//     }

//     return {
//         props: { data: data.data }, // will be passed to the page component as props
//     };

// };

const NewsIndustry = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    // const { globalDispatch } = useContext(GlobalContext);
    // const { pathname } = useRouter();

    // useEffect(() => {

    //     globalDispatch({
    //         type: 'PAGE',
    //         payload: util.pathnameKey(pathname),
    //     });

    // }, [globalDispatch, pathname]);

    return (

        <Fragment>
            <div>This is newsIndustry~</div>
        </Fragment>

    );

};

export default NewsIndustry;
