import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import Tables from '../../src/components/Tables';
import Links from '../../src/components/Links';
import Buttons from '../../src/components/Buttons';
import LightboxForm from '../../src/components/LightboxForm';
import BannerForm from '../../src/components/home/BannerForm';
import { GlobalContext } from '../../src/context/global.state';
import admin from '../../src/utils/admin';
import adminConst from '../../src/utils/admin.const';
import Service from '../../src/utils/admin.service';

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

const SelectOptLayout = styled.span(({ theme }) => ({
    float: 'right',
    marginTop: '2px',
    'select': {
        border: `1px solid ${theme.palette.border}`,
        marginLeft: '8px',
        padding: '4px 10px',
        outline: 0,
        cursor: 'pointer',
        '&:focus': {
            border: `1px solid ${theme.palette.border}`,
        },
    },
}));

const Banner = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    const {
        visible,
        currEvent,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const { pathname } = useRouter();

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: admin.pathnameKey(pathname),
        });

    }, [globalDispatch, pathname]);

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

    // 決定前台首頁一共要呈現幾則 Banner
    const handleChangeLength = ({ target }) => {

        console.log('target:', target.value);
        // Service.bannerLengthControl({ length: target.value });

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

                <SelectOptLayout>
                    前台顯示則數:
                    <select
                        name="length"
                        defaultValue={pageData.data.length}
                        onChange={handleChangeLength}
                    >
                        {
                            [...Array(10).keys()].map((val) => (
                                <option
                                    key={val + 1}
                                    value={val + 1}
                                >
                                    {val + 1}
                                </option>
                            ))
                        }
                    </select>
                </SelectOptLayout>
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

export default Banner;

export async function getStaticProps () {

    // const res = await util.ServiceServer('api/user/userList');
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

}
