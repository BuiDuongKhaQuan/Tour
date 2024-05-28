import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Destination.module.scss';
import Breadcumb from '~/components/Breadcumb';
import Select from '~/components/Select';
import { MapPin } from '@phosphor-icons/react';
import Pagination from '~/components/Pagination';
import { CardItem } from '~/components/SliderCard';
import { getDestinationsLimit, getDestinationsSize } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

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

export default function Destination() {
    const [destinations, setDestinations] = useState([]);
    const [destinationsSize, setDestinationsSize] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await getDestinationsLimit(itemOffset, 8);
                const size = await getDestinationsSize();
                setDestinations(response.destinations);
                setDestinationsSize(size);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDestinations();
    }, [itemOffset]);
    const pageCount = Math.ceil(destinationsSize / 8);
    const handlePageClick = (event) => {
        const newOffset = event.selected * 8;
        setItemOffset(newOffset);
    };
    return (
        <div className={cx('destination_wrapper')}>
            <Breadcumb />
            <div className={cx('destination_container')}>
                <div className={cx('dest_sort_bar')}>
                    <p>Showing 8 out of {destinationsSize} destination</p>
                    <Select data={DATA_SELECT} />
                </div>
                <div className={cx('content')}>
                    {destinations.map((result, index) => (
                        <CardItem
                            key={index}
                            data={result}
                            animation
                            destination
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
