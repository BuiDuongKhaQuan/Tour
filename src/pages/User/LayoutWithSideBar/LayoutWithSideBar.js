import classNames from 'classnames/bind';
import SideBar from '~/layouts/User/components/SideBar';
import styles from './LayoutWithSideBar.module.scss';

const cx = classNames.bind(styles);

export default function LayoutWithSideBar({
    children,
    searchBar,
    bookBar,
    filterBar,
    categoryBar,
    classNameContainer,
    classNameList,
    classNameSideBar,
}) {
    return (
        <div className={cx('tour_wrapper')}>
            <div className={cx('tour_container', classNameContainer)}>
                <div className={cx('tour_list', classNameList)}>{children}</div>
                <SideBar
                    filterBar={filterBar}
                    search={searchBar}
                    bookTour={bookBar}
                    category={categoryBar}
                    className={classNameSideBar}
                />
            </div>
        </div>
    );
}
