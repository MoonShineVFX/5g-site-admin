import Link from 'next/link';
import PropTypes from 'prop-types';

const Links = ({ url, children }) => (

    <Link href={url} as={url} passHref>
        <a href={url}>{children}</a>
    </Link>

);

Links.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default Links;
