import React from 'react';
import classNames from 'classnames/bind';
import styles from './TextArea.module.scss';
import { PencilSimple } from '@phosphor-icons/react';

const cx = classNames.bind(styles);

export default function TextArea({ placeholder, className, ...passProps }) {
    return (
        <div className={cx('wrapper', className)}>
            <textarea placeholder={placeholder} {...passProps} />
            <div className={cx('icon')}>
                <PencilSimple size={20} weight="bold" />
            </div>
        </div>
    );
}
