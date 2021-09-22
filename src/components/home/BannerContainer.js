import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import styled from 'styled-components';
import { GlobalContext } from '../../context/global.state';

const TagWrapLayout = styled.div(() => ({
    marginBottom: '60px',
    'h3': {
        fontSize: '18px',
        marginBottom: '6px',
        '& + div': {
            padding: '0 20px',
        },
    },
    '.other': {
        textDecoration: 'underline',
    },
    '.tag-item': {
        fontSize: '15px',
        marginRight: '16px',
        padding: '4px 10px',
        cursor: 'pointer',
    },
}));

const TagContainer = ({ tag, category }) => {

    // Context
    const { lightboxDispatch, formStorageDispatch } = useContext(GlobalContext);

    //
    const targetUpdate = (data) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'updateTag' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: data,
        });

    };

    return (

        <div className="tag-container">
            {
                Object.keys(tag).map((key) => (

                    <TagWrapLayout key={key}>
                        <h3 {...(key === '') && { className: 'other' }}>
                            {(key === '') ? '未分類' : category[key]}
                        </h3>

                        <div>
                            {
                                tag[key].map(({ id, name, category }) => (

                                    <Tag
                                        key={id}
                                        className="tag-item"
                                        onClick={() => targetUpdate({ id, name, category })}
                                    >
                                        {name}
                                    </Tag>

                                ))
                            }
                        </div>
                    </TagWrapLayout>

                ))
            }
        </div>

    );

};

TagContainer.propTypes = {
    tag: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
};

export default TagContainer;
