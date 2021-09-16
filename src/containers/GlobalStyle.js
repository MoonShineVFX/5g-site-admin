import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 1em;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 20px;
    }
    h1 {
        font-size: 26px;
        font-weight: bold;
    }
    p {
        margin-bottom: 16px;
    }
    input {
        background-color: transparent;
        border: none;
        box-shadow: none;
        outline: 0;
    }
`;

export default GlobalStyle;
