import { ArrowUpRight, Clock, Heart, MapPin, Star, Users } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import Countdown from 'react-countdown';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import styles from './TourCardItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function TourCardItem({ data, sellOff, homeTour, profileTour }) {
    const [isLiked, setIsLiked] = useState(false);
    const width = homeTour ? '405px' : profileTour ? '' : undefined;
    const home_tour = homeTour ? 'home-tour' : profileTour ? 'home-tour' : undefined;
    const price = sellOff ? data.price - (data.price * data.deal.offer) / 100 : data.price;

    useState(() => {
        const toursLoved = JSON.parse(localStorage.getItem('tours-loved')) || [];
        const isTourLiked = toursLoved.some((tour) => tour.id === data.id);
        setIsLiked(isTourLiked);
    }, []);

    const handleAddHeart = () => {
        const toursLoved = JSON.parse(localStorage.getItem('tours-loved')) || [];
        const updatedToursLoved = [...toursLoved];
        const index = updatedToursLoved.findIndex((tour) => tour.id === data.id);
        if (index === -1) {
            updatedToursLoved.push(data);
            setIsLiked(true);
        } else {
            updatedToursLoved.splice(index, 1);
            setIsLiked(false);
        }
        localStorage.setItem('tours-loved', JSON.stringify(updatedToursLoved));
    };

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
                    {sellOff && (
                        <>
                            <div className={cx('sell')}>
                                <span>-{data.deal.offer}% Off</span>
                            </div>
                            <div className={cx('count-downt')}>
                                <Countdown date={new Date(data.deal.expiryDate)} />
                            </div>
                        </>
                    )}
                    <span className={cx('tour_like')} onClick={handleAddHeart}>
                        <Heart size={20} weight={isLiked ? 'fill' : 'bold'} color={isLiked ? '#FF0000' : '#FFFFFF'} />
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
                    <h3 className={cx(sellOff && 'sellOff')}>{data.name}</h3>
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
                                    value={price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ/Người'}
                                    decimalScale={2}
                                />
                                {sellOff && <span className={cx('price-offer')}> (-{data.deal.offer}%)</span>}
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
