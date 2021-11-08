import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image, Tag } from 'antd';
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

const { pathnameKey, renderWithoutValue, renderDateTime } = admin;
const { lightboxTitle } = adminConst;

const TablesLayout = styled(Tables)({
    '.col-tags > div': {
        marginBottom: '6px',
    },
});

const BannerBase = ({ pageData }) => {

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
        tagOpt,
        partnerDispatch,
    } = useContext(PartnerContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(pathname, true),
        });

        partnerDispatch({
            type: 'tag_option',
            payload: pageData.data.tags,
        });

        partnerDispatch({
            type: 'partner_list',
            payload: {
                lists: pageData.data.partners,
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
            width: 200,
            className: 'col-image',
            render: (imgUrl, { title }) => <Image src={imgUrl} alt={title} />,
        },
        {
            title: '夥伴名稱 (英)',
            dataIndex: 'name',
            render: (name, { nameEnglish }) => (

                <Fragment>
                    {name}
                    <div>{renderWithoutValue(nameEnglish)}</div>
                </Fragment>

            ),
        },
        {
            title: '夥伴介紹',
            dataIndex: 'description',
            width: 300,
            render: (description) => (

                description ? (

                    <div className="field">
                        <textarea readOnly defaultValue={description} />
                    </div>

                ) : '--'

            ),
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
            title: '標籤',
            dataIndex: 'tags',
            className: 'col-tags',
            render: (tags) => (

                tags.length ? (

                    tags.map((val) => (

                        <div key={val}>
                            <Tag>{mappingTagOpt(tagOpt)[val]}</Tag>
                        </div>

                    ))

                ) : '--'
            ),
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
            render: (data) => (

                <Buttons
                    text="編輯"
                    onClick={() => btnUpdate(data)}
                />
            ),
        },
    ];

    // Mapping
    const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

        acc[id] = name;
        return acc;

    }, {});

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

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
                data={action ? lists : pageData.data.partners}
            />

            {
                visible &&
                    <LightboxForm
                        width={600}
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
