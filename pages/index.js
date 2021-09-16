import { Fragment, useContext, useEffect } from 'react';
import { Image } from 'antd';
import { createGlobalStyle } from 'styled-components';

import Tables from '../src/components/Tables';
import Links from '../src/components/Links';
import Buttons from '../src/components/Buttons';
import LightboxForm from '../src/components/LightboxForm';
import BannerForm from '../src/components/home/BannerForm';
import { GlobalContext } from '../src/context/global.state';
import adminConst from '../src/utils/admin.const';

const { lightboxTitle } = adminConst;

const BannerStyle = createGlobalStyle`
    .col-image {
        max-width: 80px;
        img {
            width: 100%;
        }
    }
    .btn-create {
        padding-left: 40px;
        padding-right: 40px;
    }
`;

const Home = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    const {
        visible,
        currEvent,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: '標題',
            dataIndex: 'title',
        },
        {
            title: '圖片(1200x520)',
            dataIndex: 'imgUrl',
            className: 'col-image',
            render: (imgUrl, { title }) => <Image src={imgUrl} alt={title} />,
        },
        {
            title: '外部連結',
            dataIndex: 'link',
            render: (link) => <Links url={link} target="_blank">{link}</Links>,
        },
        {
            title: '優先度',
            dataIndex: 'priority',
            sorter: (a, b) => a.priority - b.priority,
        },
        {
            title: '操作',
            dataIndex: '',
            width: 200,
            render: (data) => (

                <Buttons
                    text="編輯"
                    // onClick={(e) => btnUpdate(data,  currType, e)}
                />
            ),
        },
    ];

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createBanner' });

    // 編輯按鈕
    const btnUpdate = () => {};

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    return (

        <Fragment>
            <BannerStyle />

            <h1>{pageData.title}</h1>

            <p>
                <Buttons
                    text="新增"
                    className="btn-create"
                    onClick={btnCreate}
                />
            </p>

            <Tables
                columns={columns}
                data={pageData.data.banner}
                rowKey="id"
            />

            {
                visible &&
                    <LightboxForm
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <BannerForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export async function getStaticProps () {

    // const res = await util.serviceServer('api/user/userList');
    // const { data } = res;

    const res = await fetch('http://localhost:1002/json/home/banner.json');
    const data = await res.json();

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
                title: 'Banner輪播設定',
                data: data.data,
            },
        },
    };

};

export default Home;
