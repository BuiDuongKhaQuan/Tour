import React from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutWithSideBar.module.scss';
import Breadcumb from '~/components/Breadcumb';
import SideBar from '~/layouts/User/components/SideBar';

const cx = classNames.bind(styles);

export default function LayoutWithSideBar({
    children,
    searchBar,
    bookBar,
    classNameContainer,
    classNameList,
    classNameSideBar,
}) {
    return (
        <div className={cx('tour_wrapper')}>
            <Breadcumb />
            <div className={cx('tour_container', classNameContainer)}>
                <div className={cx('tour_list', classNameList)}>{children}</div>
                <SideBar search={searchBar} bookTour={bookBar} className={classNameSideBar} />
            </div>
        </div>
    );
}
