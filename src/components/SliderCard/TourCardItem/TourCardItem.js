import React from 'react';
import classNames from 'classnames/bind';
import styles from './TourCardItem.module.scss';
import Image from '~/components/Image';
import { ArrowUpRight, Clock, HeartStraight, MapPin, Star, Users } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

const cx = classNames.bind(styles);

export default function TourCardItem({ data, homeTour, profileTour }) {
    const width = homeTour ? '405px' : profileTour ? '' : undefined;
    const home_tour = homeTour ? 'home-tour' : profileTour ? 'home-tour' : undefined;
    return (
        <div>
            <div className={cx('tours_item')}>
                <div className={cx('tour_img')}>
                    <Image
                        width={width}
                        height={homeTour ? '205px' : '273px'}
                        animation
                        src={data.images ? data.images[0].url : ''}
                        alt={data.name}
                    />
                    <span className={cx('tour_like')}>
                        <HeartStraight size={20} weight="bold" color="#ffffff" />
                    </span>
                </div>
                <div className={cx('tour_information', home_tour)}>
                    <div className={cx('location_re')}>
                        <div className={cx('location')}>
                            <MapPin size={20} weight="bold" color="#3cb371" />
                            {data.destination.name}
                        </div>
                        <div className={cx('review')}>
                            <Star size={20} weight="fill" color="#FFB539" />
                            <Star size={20} weight="fill" color="#FFB539" />
                            <Star size={20} weight="fill" color="#FFB539" />
                            <Star size={20} weight="fill" color="#FFB539" />
                            <Star size={20} weight="fill" color="#FFB539" />
                        </div>
                    </div>
                    <h3>{data.name}</h3>
                    <div className={cx('day_persion')}>
                        <span className={cx('day_persion_item')}>
                            <Clock size={20} color="#3cb371" />
                            {data.date}
                        </span>
                        <span className={cx('day_persion_item')}>
                            <Users size={20} color="#3cb371" />
                            {data.personQuantity}
                        </span>
                    </div>
                    <div className={cx('tour_price')}>
                        <span className={cx('price_box')}>
                            From
                            <span className={cx('price')}>
                                {' '}
                                <CurrencyFormat
                                    value={data.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                    decimalScale={2}
                                />
                            </span>
                        </span>
                        <Link className={cx('detail')} to={`/tour/${data.id}`}>
                            SEE DETAILS
                            <ArrowUpRight size={18} className={cx('detail_icon')} color="#3cb371" weight="bold" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
