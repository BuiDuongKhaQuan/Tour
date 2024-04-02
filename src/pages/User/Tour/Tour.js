import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tour.module.scss';
import images from '~/assets/images';
import TourCardItem from '~/components/SliderCard/TourCardItem';
import Pagination from '~/components/Pagination';
import LayoutWithSideBar from '../LayoutWithSideBar';

const cx = classNames.bind(styles);

export default function Tour() {
    const DATA_TOURS = [
        {
            name: 'Bali One Life Adventure',
            img: images.tour_1_1,
            position: 'Lasvegus, USA',
            persion: '52+',
            day: '07',
            price: '350',
            review: 5,
        },
        {
            name: 'Places To Travel November',
            img: images.tour_1_2,
            position: ' Barcelona, Spain',
            persion: '100+',
            day: '13',
            price: '350',
            review: 5,
        },
        {
            name: 'Brooklyn Beach Resort Tour',
            img: images.tour_1_3,
            position: ' Madrid, Spain',
            persion: '50+',
            day: '10',
            price: '650',
            review: 5,
        },
        {
            name: 'Brooklyn Christmas Lights',
            img: images.tour_1_4,
            position: ' Lasvegus, USA',
            persion: '312+',
            day: '15',
            price: '450',
            review: 5,
        },
    ];

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 4;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = DATA_TOURS.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(DATA_TOURS.length / 4);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 4) % DATA_TOURS.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const TourContent = () => (
        <>
            <div className={cx('tour_row')}>
                {currentItems.map((result, index) => (
                    <TourCardItem data={result} key={index} />
                ))}
            </div>
            <div className={cx('pagination_')}>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </div>
        </>
    );

    return (
        <LayoutWithSideBar searchBar classNameSideBar={cx('side-bar')}>
            <TourContent />
        </LayoutWithSideBar>
    );
}
