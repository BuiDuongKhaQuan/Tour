import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export default function Input({ button, leftIcon, rightIcon, placeholder, className, classNameInput, ...passProps }) {
    return (
        <div className={cx('input_container', className)}>
            {leftIcon && <div className={cx('icon', 'left')}>{leftIcon}</div>}
            <input {...passProps} className={cx('input', classNameInput)} placeholder={placeholder} />
            {rightIcon && <div className={cx('icon', 'right')}>{rightIcon}</div>}
            {button && button}
        </div>
    );
}
