import React from 'react';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import Select, { components } from 'react-select';

const cx = classNames.bind(styles);

export default function Selected({
    data,
    label,
    className,
    classNameChildren,
    classNameSelect,
    defaultValue,
    onChange,
    placeholder,
    ...props
}) {
    const Control = ({ children, ...props }) => (
        <components.Control {...props} className={cx('select', classNameChildren)}>
            {data.icon && data.icon}
            {children}
        </components.Control>
    );
    return (
        <div className={cx('wraper', className)}>
            {label && <label className={cx('label')}>{label}</label>}
            <Select
                {...props}
                defaultValue={defaultValue && Object.keys(defaultValue).length > 0 ? defaultValue : null}
                onChange={onChange}
                options={data.items}
                placeholder={placeholder ? placeholder : data.title}
                components={{ Control }}
                className={classNameSelect}
            />
        </div>
    );
}
