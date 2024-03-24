import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(
    (
        {
            className,
            circle,
            width,
            height,
            animation,
            pointer,
            fallBack: customFallBack = images.noImage,
            src,
            alt,
            ...props
        },
        ref,
    ) => {
        const [fallBack, setFallback] = useState('');

        const handleError = () => {
            setFallback(customFallBack);
        };
        const classes = cx('image_wrap', {
            [className]: className,
            circle,
            animation,
            pointer,
        });
        return (
            <div className={classes} {...props}>
                <img
                    style={{ width: width, height: height }}
                    src={fallBack || src}
                    alt={alt}
                    ref={ref}
                    onError={handleError}
                />
            </div>
        );
    },
);

Image.propTypes = {
    className: PropTypes.string,
    fallBack: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Image;
