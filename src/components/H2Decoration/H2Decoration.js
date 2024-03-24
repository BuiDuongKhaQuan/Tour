import React from 'react';
import classNames from 'classnames/bind';
import styles from './H2Decoration.module.scss';

const cx = classNames.bind(styles);

export default function H2Decoration({ children, className }) {
    return <h2 className={cx('title', { [className]: className })}>{children}</h2>;
}
