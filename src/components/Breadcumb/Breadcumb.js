import classNames from 'classnames/bind';
import styles from './Breadcumb.module.scss';
import React from 'react';
import { CaretDoubleRight } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import images from '~/assets/images';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function Breadcumb({ backgroundImage = images.breadcumb_bg, breadcumb_wrapper = 'Home' }) {
    const location = useLocation();
    const titlePage = location.pathname.substring(1);
    return (
        <div className={cx('breadcumb')} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>{titlePage}</h2>

                <div className={cx('breadcumb_menu')}>
                    <Link className={cx('bread_item')} to={routes.home}>
                        <span>{breadcumb_wrapper}</span>
                    </Link>
                    <span className={cx('bread_item')}>
                        <CaretDoubleRight size={18} weight="bold" />
                    </span>
                    <span className={cx('bread_item')}>{titlePage}</span>
                </div>
            </div>
        </div>
    );
}
