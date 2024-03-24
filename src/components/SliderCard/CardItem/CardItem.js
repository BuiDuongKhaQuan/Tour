import React from 'react';
import classNames from 'classnames/bind';
import styles from './CardItem.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function CardItem({
    large,
    window,
    iconLeftName,
    className,
    tripSmall,
    textInImg = false,
    sellOff = false,
    animation,
    data,
}) {
    const classes = cx('ssss_item', {
        [className]: className,
        window,
        large,
    });

    return (
        <div className={classes}>
            <div className={cx('_wrap')}>
                <div className={cx('img_box')}>
                    {sellOff && <span className={cx('dell')}>{data.sell}</span>}
                    <Image
                        animation={animation}
                        src={data.img}
                        alt={data.name}
                        className={cx(window ? 'item_img' : 'item_img_square', textInImg && 'backgrond_linear')}
                    />
                </div>
                <div className={cx('bottom_img', large && 'transparent', textInImg && 'in_img')}>
                    <Link className={cx('bottom_left')} to={routes.destination_detail}>
                        {iconLeftName && <div className={cx('item_icon')}>{iconLeftName}</div>}
                        <h3 className={cx('item_name')}>{data.name}</h3>
                    </Link>
                    <h4 className={cx('item_trip', tripSmall && 'item_trip_small', sellOff && 'sell_off')}>
                        {data.trip} {sellOff || 'Trips'}
                    </h4>
                </div>
            </div>
        </div>
    );
}
