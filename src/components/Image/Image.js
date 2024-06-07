import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import Button from '../Button';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';

const cx = classNames.bind(styles);

const Image = forwardRef(
    (
        {
            className,
            classNameImg,
            action,
            actionHover,
            iconBtnLeft = <RiDeleteBin6Line size={20} />,
            iconBtnRight = <RxUpdate size={20} />,
            onClickBtnLeft,
            onClickBtnRight,
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

        useEffect(() => {
            setFallback('');
        }, [src]);

        const handleError = () => {
            setFallback(customFallBack);
        };

        const classes = cx('image_wrap', {
            [className]: className,
            circle,
            animation,
            pointer,
            actionHover,
        });
        return (
            <div className={classes} {...props}>
                {action && (
                    <div className={cx('action-btn')} style={{ width: width, height: '100%' }}>
                        {onClickBtnLeft && (
                            <Button primary className={cx('btn')} onClick={onClickBtnLeft} type="button">
                                {iconBtnLeft}
                            </Button>
                        )}
                        {onClickBtnRight && (
                            <Button primary className={cx('btn')} onClick={onClickBtnRight} type="button">
                                {iconBtnRight}
                            </Button>
                        )}
                    </div>
                )}
                <img
                    className={classNameImg}
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
