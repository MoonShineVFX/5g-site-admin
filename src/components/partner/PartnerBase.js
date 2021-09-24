import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Links from '../Links';
import Buttons from '../Buttons';
import LightboxForm from '../LightboxForm';
import PartnerForm from '../partner/PartnerForm';

import { GlobalContext } from '../../context/global.state';
import { PartnerContext } from '../../context/partner/partner.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';

const { pathnameKey } = admin;
const { lightboxTitle } = adminConst;

const TablesLayout = styled(Tables)({
    '.col-image': {
        maxWidth: '120px',
    },
});

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
        lists,
        imageSize,
        partnerDispatch,
    } = useContext(PartnerContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname, true),
        });

        partnerDispatch({
            type: 'partner_list',
            payload: {
                lists: pageData.data.partner,
                imageSize: pageData.imageSize,
            },
        });

    }, [globalDispatch, pathname, partnerDispatch]);

    // 表格欄位
    const columns = [
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: `Logo(${imageSize})`,
            dataIndex: 'imgUrl',
            className: 'col-image',
            render: (imgUrl, { title }) => <Image src={imgUrl} alt={title} />,
        },
        {
            title: '夥伴名稱',
            dataIndex: 'name',
        },
        {
            title: '夥伴介紹',
            dataIndex: 'description',
            width: 300,
        },
        {
            title: '外部網址(URL)',
            dataIndex: 'link',
            render: (link) => <Links url={link} target="_blank">{link}</Links>,
        },
        {
            title: '聯絡電話',
            dataIndex: 'phone',
            render: (phone) => <a href={`tel:${phone}`}>{phone}</a>,
        },
        {
            title: '聯絡信箱',
            dataIndex: 'email',
            render: (email) => <a href={`mailto:${email}`}>{email}</a>,
        },
        {
            // title: '所屬標籤',
            // dataIndex: 'tag',
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

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createPartner' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updatePartner' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            />

            <TablesLayout
                rowKey="id"
                columns={columns}
                data={action ? lists : pageData.data.partner}
            />

            {
                visible &&
                    <LightboxForm
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <PartnerForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default BannerBase;
