import Link from 'next/link';
import PropTypes from 'prop-types';

//
const Links = ({ url, children, ...rest }) => (

    <Link href={url}>
        <a href={url} {...rest}>{children}</a>
    </Link>

);

Links.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default Links;
