import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tour.module.scss';
import TourCardItem from '~/components/SliderCard/TourCardItem';
import Pagination from '~/components/Pagination';
import LayoutWithSideBar from '../LayoutWithSideBar';
import { getToursLimit, getToursSize } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

export default function Tour() {
    const [tours, setTours] = useState([]);
    const [toursSize, setToursSize] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    // Lấy kích thước danh sách tour một lần khi component được mount
    useEffect(() => {
        const fetchToursSize = async () => {
            try {
                const size = await getToursSize();
                setToursSize(size);
            } catch (error) {
                console.log(error);
            }
        };
        fetchToursSize();
    }, []);

    // Lấy danh sách tour mỗi khi itemOffset thay đổi
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await getToursLimit(itemOffset, 8);
                setTours(response.tours);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTours();
    }, [itemOffset]);

    const pageCount = Math.ceil(toursSize / 8);

    const handlePageClick = (event) => {
        const newOffset = event.selected * 8;
        setItemOffset(newOffset);
    };

    const TourContent = () => (
        <div className={cx('tour_row')}>
            {tours.map((result, index) => (
                <TourCardItem data={result} key={index} />
            ))}
        </div>
    );

    return (
        <LayoutWithSideBar searchBar categoryBar classNameSideBar={cx('side-bar')}>
            <TourContent />
            <div className={cx('pagination_')}>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </div>
        </LayoutWithSideBar>
    );
}
