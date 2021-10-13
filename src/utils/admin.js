import axios from 'axios';
import { Modal } from 'antd';
import dayjs from 'dayjs';

// console.log('HOST:', process.env.HOST)

const util = {
    /**
     * @author Betty
     * @param  {object{} || string} service - 如果是字串，則為 service.url
     *   @param {string} service.url
     *   @param {string} [service.method = 'post']
     *   @param {string} [service.dataType = 'json']
     * @param  {object{}} reqData
     * @param  {object{}} option
     * @returns {promise}
     */
    serviceProxy: (service, reqData = {}, option) => {

        // method, url 與環境設定
        const CONFIG = () => {

                let url = '';
                let method = 'post';

                if (typeof service === 'string') url = service;
                else {

                    url = service.url;
                    method = service.method;

                }

                return {
                    // url: `/json${url}.json`,
                    url: (process.env.NODE_ENV === 'development') ? `//${process.env.HOST}/api${url}` : `/api${url}`,
                    method,
                };

            },
            showErrorMesg = (message, callback) => {

                Modal.error({
                    title: '發生錯誤',
                    content: message || '出了些狀況，請找後台管理員',
                    ...callback && {
                        onOk: () => {

                            if (callback) callback();

                        },
                    },
                });

            };

        // 回傳 promise
        return new Promise((resolve, reject) => {

            const authHeader = (process.env.NODE_ENV === 'production') ? {} : {
                headers: {
                    // 驗證(新增、編輯需要)
                    'Authorization': 'Basic c3RhZmZAbW9vbnNoaW5lLnR3OkFETSFOQE0wMG5zaGluZQ==',
                },
            };

            axios[CONFIG().method](CONFIG().url, reqData, {
                ...option,
                ...authHeader,
            })
            .then(
                // result: 1
                ({ data }) => {

                    resolve(data.data);

                },
                // result: 0
                ({ response }) => {

                    const {
                        // status,
                        data: { message },
                    } = response;

                    reject(showErrorMesg(message));

                    // reject(showErrorMesg(message, () => {

                    //     window.location = `/error`;

                    // }));

                },
            )

        });

    },

    serviceServer: ({ method = 'post', url }, reqData = {}) => {

        // console.log('url:', url)

        return axios[method]((process.env.NODE_ENV === 'development') ? `http://${process.env.HOST}/api${url}` : `/api${url}`, reqData);
        // return axios.post(`http://localhost:8080/${url}`, reqData);

    },

    /**
     * @author Betty
     * @param {string} path
     * @param {boolean} noSub 是否有子選單，預設 false
     * @return {string} - 回傳文字 key
     */
    pathnameKey: (path, noSub = false) => {

        return noSub ? path.split('/')[2] : (path.split('/')[3] || 'banner');

    },

    /**
     * @author Betty
     * @param {object[]} array
     * @return {object[]} - 回傳陣列結構
     */
    antdTableFilter: (array) => array.reduce((acc, { id, name }) => {

        const obj = { text: name, value: id };
        acc.push(obj);
        return acc;

    }, []),

    /**
     * @author Betty
     * @param {string} value - 字串或元件
     * @return {string}
     */
    renderWithoutValue: (value) => value ? value : '--',

    /**
     * @author Betty
     * @param {string} date - 日期
     * @return {string}
     */
    renderDateTime: (date) => date ? dayjs(date).format('YYYY-MM-DD') : '--',

};

export default util;
