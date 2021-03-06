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
import Prompt from '../../../src/components/Prompt';
import BannerForm from '../../../src/components/home/BannerForm';

import { GlobalContext } from '../../../src/context/global.state';
import { BannerContext } from '../../context/home/banner.state';
import admin from '../../../src/utils/admin';
import adminConst from '../../../src/utils/admin.const';

const { pathnameKey, renderWithoutValue, renderDateTime } = admin;
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
        bannerDelete,
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

    // ????????????
    const columns = [
        {
            title: '??????(ID)',
            dataIndex: 'id',
        },
        {
            title: `??????(${pageData.imageSize})`,
            dataIndex: 'imgUrl',
            className: 'col-thumb',
            width: 200,
            render: (imgUrl, { title }) => imgUrl ? <Image src={imgUrl} alt={title} /> : '--',
        },
        {
            title: '??????',
            dataIndex: 'title',
            render: (title) => renderWithoutValue(title),
        },
        {
            title: '????????????',
            dataIndex: 'link',
            render: (link) => <Links url={link} target="_blank">{link}</Links>,
        },
        {
            title: '?????????',
            dataIndex: 'priority',
            sorter: (a, b) => a.priority - b.priority,
        },
        {
            title: '?????? / ????????????',
            dataIndex: '',
            render: ({ createTime, updateTime }) => `${renderDateTime(createTime)} / ${renderDateTime(updateTime)}`,
        },
        {
            title: '?????? / ?????????',
            dataIndex: '',
            render: ({ creator, updater }) => `${renderWithoutValue(creator)} / ${renderWithoutValue(updater)}`,
        },
        {
            title: '??????',
            dataIndex: '',
            width: 200,
            render: (data) => (

                <Fragment>
                    <Buttons
                        text="??????"
                        onClick={() => btnUpdate(data)}
                    />
                    <Buttons
                        danger
                        text="??????"
                        onClick={() => btnDelete(data)}
                    />
                </Fragment>
            ),
        },
    ];

    // ?????? Modal
    const hideModal = () => {

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });

    };

    // ????????????
    const btnCreate = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createBanner' });

    // ????????????
    const btnUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateBanner' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    // ????????????
    const btnDelete = ({ id }) => {

        Prompt('confirm', {
            title: <Fragment>?????? <span className="small-text">(ID: {id})</span></Fragment>,
            mesg: '????????????????????????',
            callback: () => bannerDelete(id),
        });

    };

    // ??????????????????????????????????????? Banner
    const handleChangeLength = ({ target }) => bannerLengthControl({ length: +target.value });

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ContentHeader
                title={pageData.title}
                onClick={btnCreate}
            >
                <SelectOptLayout>
                    ??????????????????:
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
