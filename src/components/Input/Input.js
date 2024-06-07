import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export default function Input({
    button,
    label,
    leftIcon,
    rightIcon,
    placeholder,
    className,
    classNameInput,
    classNameIconRight,
    value,
    onChange,
    ...passProps
}) {
    return (
        <div className={cx('wraper', className)}>
            {label && <label className={cx('label')}>{label}</label>}
            <div className={cx('input_container')}>
                {leftIcon && <div className={cx('icon', 'left')}>{leftIcon}</div>}
                <input
                    value={value}
                    onChange={onChange}
                    {...passProps}
                    className={cx('input', leftIcon && 'pading-left', classNameInput)}
                    placeholder={placeholder}
                />
                {rightIcon && <div className={cx('icon', 'right', classNameIconRight)}>{rightIcon}</div>}
                {button && button}
            </div>
        </div>
    );
}
