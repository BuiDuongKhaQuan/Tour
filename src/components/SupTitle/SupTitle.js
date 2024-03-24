import React from 'react';
import classNames from 'classnames/bind';
import styles from './SupTitle.module.scss';

const cx = classNames.bind(styles);

export default function SupTitle({ title, left, right, small, primary, className }) {
    return (
        <span className={cx('title', primary && 'primary_color', className)}>
            {left && (
                <span
                    className={cx(
                        'shape',
                        primary && 'primary_backgrond',
                        small && 'height_small',
                        small && 'shape_small',
                    )}
                >
                    <span className={cx('dots_left', primary && 'primary_backgrond', small && 'height_small')}></span>
                </span>
            )}
            {title}
            {right && (
                <span
                    className={cx(
                        'shape',
                        primary && 'primary_backgrond',
                        small && 'height_small',
                        small && 'shape_small',
                    )}
                >
                    <span className={cx('dots_right', primary && 'primary_backgrond', small && 'height_small')}></span>
                </span>
            )}
        </span>
    );
}
