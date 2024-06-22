import { MapPin } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Pagination from '~/components/Pagination';
import { CardItem } from '~/components/SliderCard';
import { getDestinationsLimit, getDestinationsSize } from '~/utils/httpRequest';
import styles from './Destination.module.scss';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export default function Destination() {
    const { t } = useTranslation();
    const [destinations, setDestinations] = useState([]);
    const [destinationsSize, setDestinationsSize] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await getDestinationsLimit(itemOffset, 8);
                const size = await getDestinationsSize();
                setDestinations(response.data);
                setDestinationsSize(size.data);
            } catch (error) {
                console.log(error);
            }
        };
        const data = location.state;
        if (data) {
            setDestinations(data);
        } else {
            fetchDestinations();
        }
    }, [itemOffset, location]);

    const pageCount = Math.ceil(destinationsSize / 8);
    const handlePageClick = (event) => {
        const newOffset = event.selected * 8;
        setItemOffset(newOffset);
    };
    return (
        <div className={cx('destination_wrapper')}>
            <div className={cx('destination_container')}>
                <div className={cx('dest_sort_bar')}>
                    <p>
                        {t('common.showing')} {destinationsSize} {t('common.destination')}
                    </p>
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
