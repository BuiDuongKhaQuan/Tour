import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);

export default function Loading({ className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <CircularProgress color="success" />
            </div>
        </div>
    );
}
