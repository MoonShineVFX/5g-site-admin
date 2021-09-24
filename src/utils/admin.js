import axios from 'axios';
import { Modal } from 'antd';

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
                    url: `/api${url}`,
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

            axios[CONFIG().method](CONFIG().url, reqData, { withCredentials: true, ...option })
                .then(
                    // result: 1
                    ({ data }) => {

                        // localhost 才有此情境
                        // if (!data.result && (process.env.NODE_ENV !== 'production')) {

                        //     reject(showErrorMesg('請先登入'));

                        // }

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

    serviceServer: (url, reqData = {}) => {

        return axios.post(`http://localhost:8080/${url}`, reqData);

    },

    pathnameKey: (path) => path.split('/')[2] || 'banner',

    /**
     * @author Betty
     * @param {object[]} array
     * @return {object[] - 回傳陣列結構
     */
    antdTableFilter: (array) => array.reduce((acc, { key, name }) => {

        const obj = { text: name, value: key };
        acc.push(obj);
        return acc;

    }, []),

};

export default util;
