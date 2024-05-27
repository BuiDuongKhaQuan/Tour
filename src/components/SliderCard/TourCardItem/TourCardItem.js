import React from 'react';
import classNames from 'classnames/bind';
import styles from './TourCardItem.module.scss';
import Image from '~/components/Image';
import { ArrowUpRight, Clock, HeartStraight, MapPin, Star, Users } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function TourCardItem({ data, homeTour }) {
    return (
        <div>
            <div className={cx('tours_item')}>
                <div className={cx('tour_img')}>
                    <Image
                        width={homeTour && '405px'}
                        height={homeTour ? '205px' : '273px'}
                        animation
                        src={data.imgs ? data.imgs[0] : ''}
                        alt={data.name}
                    />
                    <span className={cx('tour_like')}>
                        <HeartStraight size={20} weight="bold" color="#ffffff" />
                    </span>
                </div>
                <div className={cx('tour_information', homeTour && 'home-tour')}>
                    <div className={cx('location_re')}>
                        <div className={cx('location')}>
                            <MapPin size={20} weight="bold" color="#3cb371" />
                            {data.destination}
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
                            {data.person_quantity}
                        </span>
                    </div>
                    <div className={cx('tour_price')}>
                        <span className={cx('price_box')}>
                            From
                            <span className={cx('price')}> ${data.price}</span>
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
