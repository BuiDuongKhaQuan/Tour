import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Destination.module.scss';
import Breadcumb from '~/components/Breadcumb';
import images from '~/assets/images';
import Select from '~/components/Select';
import { MapPin } from '@phosphor-icons/react';
import Pagination from '~/components/Pagination';
import { CardItem } from '~/components/SliderCard';

const cx = classNames.bind(styles);

export default function Destination() {
    const DATA_SELECT = {
        id: 1,
        title: 'Default Sorting',
        items: [
            {
                value: '1',
                label: 'Default Sorting',
            },
            {
                value: '2',
                label: 'Sort by popularity',
            },
            {
                value: '3',
                label: 'Sort by average rating',
            },
            {
                value: '4',
                label: 'Sort by latest',
            },
            {
                value: '5',
                label: 'Sort by price: low to high',
            },
            {
                value: '6',
                label: 'Sort by price: high to low',
            },
        ],
    };
    const DATA_DESTINATION = [
        {
            name: 'Switzerland',
            trip: '6+',
            img: images.dest_2_1,
        },
        {
            name: 'Barcelona',
            trip: '8+',
            img: images.dest_2_2,
        },
        {
            name: 'Amsterdam',
            trip: '6+',
            img: images.dest_2_3,
        },
        {
            name: 'Budapest City',
            trip: '5+',
            img: images.dest_2_4,
        },
        {
            name: 'Switzerland',
            trip: '6+',
            img: images.dest_2_1,
        },
        {
            name: 'Barcelona',
            trip: '8+',
            img: images.dest_2_2,
        },
        {
            name: 'Amsterdam',
            trip: '6+',
            img: images.dest_2_3,
        },
        {
            name: 'Budapest City',
            trip: '5+',
            img: images.dest_2_4,
        },
    ];

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 4;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = DATA_DESTINATION.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(DATA_DESTINATION.length / 4);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 4) % DATA_DESTINATION.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <div className={cx('destination_wrapper')}>
            <Breadcumb />
            <div className={cx('destination_container')}>
                <div className={cx('dest_sort_bar')}>
                    <p>Showing 8 out of 24 destination</p>
                    <Select data={DATA_SELECT} />
                </div>
                <div className={cx('content')}>
                    {currentItems.map((result, index) => (
                        <CardItem
                            key={index}
                            data={result}
                            animation
                            large
                            tripSmall
                            iconLeftName={<MapPin size={30} weight="fill" color="#3cb371" />}
                        />
                    ))}
                </div>
                <div className={cx('pagination_')}>
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            </div>
        </div>
    );
}
