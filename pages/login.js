import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import theme from '../src/utils/theme';
import LightboxFormStyle from '../src/components/LightboxFormStyle';
import { createGlobalStyle } from 'styled-components';
import Buttons from '../src/components/Buttons';
import { FormRow } from '../src/components/LightboxForm';
import HeadTag from '../src/containers/HeadTag';
import Service from '../src/utils/admin.service';

const errConfig = {
    pattern: '格式錯誤',
    minLength: '少於8碼',
    maxLength: '超過20碼',
};

const LoginStyle = createGlobalStyle`
    .appContainer {
        justify-content: center;
        padding: 50px 40px 0;
    }
    .appContent {
        max-width: 480px;
        background-color: ${theme.palette.container} !important;
        margin-left: 0 !important;
        justify-content: center;
    }
    .ant-layout-header {
        display: none;
    }
    aside {
        display: none;
    }
    .ant-layout-content {
        width: 100%;
    }
    .section {
        max-height: 360px;
        height: 100%;
        background-color: #FFF;
        padding: 40px;
    }
    button.ant-btn.admin-btn {
        width: 100%;
        margin: 20px 0 0;
    }
`;

const Login = () => {

    // Router
    const router = useRouter();

    //
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    useEffect(() => {

        console.log('11111')
    })

    // 送資料
    const handleReqData = (reqData) => {

        let auth = btoa(`${reqData.account}:${reqData.password}`);

        Service.login({ headers: { Authorization: `Basic ${auth}`} })
            .then(({ token }) => {

                // 設定 cookie
                Cookies.set('token', token, {
                    secure: true,
                    // expires: ,
                    // sameSite: 'strict',
                });

                console.log('22222')
                router.push('/home/banner');

            });

    };

    return (

        <Fragment>
            <LoginStyle />
            <LightboxFormStyle />
            <HeadTag title="登入" />

            <form onSubmit={handleSubmit(handleReqData)}>
                <FormRow
                    labelTitle="帳號 (Email)"
                    error={errors.account && true}
                    {...(errors.account?.type === 'pattern') && { errorMesg: '格式錯誤' }}
                >
                    <input
                        type="text"
                        name="account"
                        {...register('account', {
                            required: true,
                            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g,
                        })}
                    />
                </FormRow>

                <FormRow
                    labelTitle="密碼 (至少 8 碼)"
                    error={errors.password && true}
                    errorMesg={errConfig[errors.password?.type]}
                >
                    <input
                        type="password"
                        name="password"
                        {...register('password', {
                            required: true,
                            minLength: 8,
                            maxLength: 20,
                            // pattern: /^(?=.*\d)(?=.*[a-z])[0-9a-z]{8,}$/g,
                        })}
                    />
                </FormRow>

                <div className="row row-btns">
                    <Buttons
                        text="送出"
                        htmlType="submit"
                    />
                </div>
            </form>
        </Fragment>

    );

};

export default Login;
