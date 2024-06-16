import React from 'react';
import classNames from 'classnames/bind';
import styles from './TextArea.module.scss';

const cx = classNames.bind(styles);

export default function TextArea({ placeholder, label, icon, value, onChange, className, ...passProps }) {
    return (
        <div className={cx('wrapper', className)}>
            <label className={cx('label')}>{label}</label>
            <textarea value={value} onChange={onChange} placeholder={placeholder} {...passProps} />
            {icon && <div className={cx('icon')}>{icon}</div>}
        </div>
    );
}
