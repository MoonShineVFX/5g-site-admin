import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import styled from 'styled-components';

import HeadTag from '../../containers/HeadTag';
import ContentHeader from '../../containers/ContentHeader';
import Tables from '../Tables';
import Buttons from '../Buttons';
import LightboxForm from '../LightboxForm';
import Prompt from '../Prompt';
import PolicyForm from '../policy/PolicyForm';

import { GlobalContext } from '../../context/global.state';
import { PolicyContext } from '../../context/policy/policy.state';
import admin from '../../utils/admin';
import adminConst from '../../utils/admin.const';

const { pathnameKey, renderWithoutValue, renderDateTime } = admin;
const { lightboxTitle, policyConfig } = adminConst;

const TablesLayout = styled(Tables)({
    '.col-tags > div': {
        marginBottom: '6px',
    },
});


// Mapping
const mappingTagOpt = (opts) => opts.reduce((acc, { id, name }) => {

    acc[id] = name;
    return acc;

}, {});

// antd 格式
const antdTableFilter = (data) => data.reduce((acc, key) => {

    const obj = { text: policyConfig[key], value: key };

    // 檢查是否重複
    if (!acc.some((obj) => obj.value === key)) acc.push(obj);
    return acc;

}, []);

const PlaceBase = ({ pageData }) => {

    // Router
    const router = useRouter();

    // Context
    const {
        visible,
        currEvent,
        policyTags,
        globalDispatch,
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const {
        action,
        lists,
        policyDispatch,
        policyDelete,
    } = useContext(PolicyContext);

    useEffect(() => {

        globalDispatch({
            type: 'page',
            payload: pathnameKey(router.pathname, true),
        });

        policyDispatch({
            type: 'policy_list',
            payload: { lists: pageData.data.list },
        });

    }, [globalDispatch, router]);

    // 表格欄位
    const columns = [
        {
            title: 'No.',
            dataIndex: 'serial',
            sorter: (a, b) => a.serial - b.serial,
        },
        {
            title: '編號(ID)',
            dataIndex: 'id',
        },
        {
            title: '標題',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '次標題',
            dataIndex: 'titleSecondary',
            render: (titleSecondary) => renderWithoutValue(titleSecondary),
        },
        {
            title: '分類',
            dataIndex: 'categoryKey',
            render: (categoryKey) => renderWithoutValue(policyConfig[categoryKey]),
            sorter: (a, b) => a.categoryKey.length - b.categoryKey.length,
            filters: antdTableFilter(Object.keys(policyConfig)),
            onFilter: (value, { categoryKey }) => {

                const regex = new RegExp(`^${value}$`);
                return regex.test(categoryKey);

            },
        },
        {
            title: '聯絡單位',
            dataIndex: 'contact',
            render: (contact) => renderWithoutValue(contact.unit),
        },
        {
            title: '標籤',
            dataIndex: 'tags',
            className: 'col-tags',
            render: (tags) => (

                (tags.length && policyTags.length) ? (

                    tags.map((val) => (

                        <div key={val}>
                            {
                                mappingTagOpt(policyTags)[val] ? <Tag>{mappingTagOpt(policyTags)[val]}</Tag> : '--'
                            }
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
            width: 200,
            render: (data) => (

                <Fragment>
                    <Buttons
                        text="編輯"
                        onClick={() => btnUpdate(data)}
                    />
                    <Buttons
                        danger
                        text="刪除"
                        onClick={() => btnDelete(data)}
                    />
                </Fragment>
            ),
        },
    ];

    // 隱藏 Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // 新增按鈕
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createPolicy' });

    // 編輯按鈕
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updatePolicy' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    // 刪除按鈕
    const btnDelete = ({ id }) => {

        Prompt('confirm', {
            title: <Fragment>刪除 <span className="small-text">(ID: {id})</span></Fragment>,
            mesg: '你確定要刪除嗎？',
            callback: () => policyDelete(id),
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
                data={action ? lists : pageData.data.list}
            />

            {
                visible &&
                    <LightboxForm
                        width={680}
                        title={lightboxTitle[currEvent]}
                        visible={visible}
                        handleCancel={hideModal}
                    >
                        <PolicyForm />
                    </LightboxForm>
            }
        </Fragment>

    );

};

export default PlaceBase;
