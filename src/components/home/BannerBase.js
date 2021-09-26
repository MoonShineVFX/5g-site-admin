import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../../src/containers/HeadTag';
import ContentHeader from '../../../src/containers/ContentHeader';
import Tables from '../../../src/components/Tables';
import Links from '../../../src/components/Links';
import Buttons from '../../../src/components/Buttons';
import LightboxForm from '../../../src/components/LightboxForm';
import BannerForm from '../../../src/components/home/BannerForm';

import { GlobalContext } from '../../../src/context/global.state';
import { BannerContext } from '../../context/home/banner.state';
import admin from '../../../src/utils/admin';
import adminConst from '../../../src/utils/admin.const';

const { pathnameKey, renderWithoutValue } = admin;
const { lightboxTitle } = adminConst;

const SelectOptLayout = styled.span(({ theme }) => ({
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

const BannerBase = ({ pageData }) => {

    // console.log('pageData:', pageData);
    const { pathname } = useRouter();

    // Context
    const {
        visible,
        currEvent,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const {
        action,
        length,
        lists,
        bannerLengthControl,
        bannerDispatch,
    } = useContext(BannerContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname),
        });

        bannerDispatch({
            type: 'banner_list',
            payload: {
                lists: pageData.data.banner,
                imageSize: pageData.imageSize,
            },
        });

    }, [globalDispatch, pathname, bannerDispatch]);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: `圖片(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            width: 200,
            render: (imgUrl, { title }) => <Image src={imgUrl} alt={title} />,
        },
        {
            title: '標題',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '外部網址',
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
                    onClick={() => btnUpdate(data)}
                />
            ),
        },
    ];

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createBanner' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateBanner' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    // 決定前台首頁一共要呈現幾則 Banner
    const handleChangeLength = ({ target }) => bannerLengthControl({ length: +target.value });

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            >
                <SelectOptLayout>
                    前台顯示則數:
                    <select
                        name="length"
                        defaultValue={action ? length : pageData.data.length}
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
            </ContentHeader>

            <Tables
                rowKey="id"
                columns={columns}
                data={action ? lists : pageData.data.banner}
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

export default BannerBase;
