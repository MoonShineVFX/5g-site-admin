import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Links from '../Links';
import Tables from '../Tables';
import Buttons from '../Buttons';
import { GlobalContext } from '../../context/global.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';

const { pathnameKey, renderWithoutValue, renderDateTime } = admin;
const { placeConfig } = adminConst;

const CreateBtnLayout = styled(Buttons)({
    float: 'none',
});

const antdTableFilter = (data) => data.reduce((acc, key) => {

    const obj = { text: placeConfig[key], value: key };

    // 檢查是否重複
    if (!acc.some((obj) => obj.value === key)) acc.push(obj);
    return acc;

}, []);

const PlaceBase = ({ pageData }) => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(router.pathname, true),
        });

    }, [globalDispatch, router]);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: `圖片(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            className: 'col-thumb',
            width: 200,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: '標題',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '分類',
            dataIndex: 'type',
            render: (type) => renderWithoutValue(placeConfig[type]),
            sorter: (a, b) => a.type.length - b.type.length,
            filters: antdTableFilter(Object.keys(placeConfig)),
            onFilter: (value, { type }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(type);

            },
        },
        {
            title: '聯絡單位',
            dataIndex: 'contact',
            render: (contact) => renderWithoutValue(contact.unit),
        },
        {
            title: '新增 / 編輯時間',
            dataIndex: '',
            render: ({ createTime, updateTime }) => `${renderDateTime(createTime)} / ${renderDateTime(updateTime)}`,
        },
        {
            title: '新增 / 編輯者',
            dataIndex: '',
            render: ({ creator, updater }) => `${renderWithoutValue(creator)} / ${renderWithoutValue(updater)}`,
        },
        {
            title: '操作',
            dataIndex: '',
            width: 200,
            render: (data) => (

                <Buttons
                    text="編輯"
                    onClick={() => router.push(`/place/${data.id}`)}
                />
            ),
        },
    ];

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                showButton={false}
            >
                <CreateBtnLayout className="btn-create">
                    <Links url="/place/create">新增</Links>
                </CreateBtnLayout>
            </ContentHeader>

            <Tables
                rowKey="id"
                columns={columns}
                data={pageData.data.list}
            />
        </Fragment>

    );

};

export default PlaceBase;
