import React from 'react';
import classNames from 'classnames/bind';
import styles from './TourDetail.module.scss';
import Input from '~/components/Input';
import { AirplaneTakeoff, Calendar, Camera, CurrencyCircleDollar, MapPin, UsersThree } from '@phosphor-icons/react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

export default function TourDetail() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <h2>Information</h2>
                <div className={cx('container')}>
                    <div className={cx('avatar')}>
                        <Image animation className={cx('avatar-img')} src={images.tour_1_2} alt={'avatar'} />
                        <Button className={cx('avater-btn')} circle leftIcon={<Camera size={32} weight="duotone" />} />
                    </div>
                    <div className={cx('infor')}>
                        <div className={cx('input_list')}>
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<AirplaneTakeoff size={20} weight="bold" />}
                                placeholder={'Tour Name'}
                                type="text"
                            />
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<MapPin size={20} weight="bold" />}
                                placeholder={'Position'}
                                type="text"
                            />
                        </div>
                        <div className={cx('input_list')}>
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<Calendar size={20} weight="bold" />}
                                placeholder={'Day'}
                                type="number"
                            />
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<UsersThree size={20} weight="bold" />}
                                placeholder={'Persion'}
                            />
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<CurrencyCircleDollar size={20} weight="bold" />}
                                placeholder={'Price'}
                            />
                        </div>
                        <div className={cx('input_list')}>
                            <Button primary large className={cx('btn')}>
                                Submit
                            </Button>

                            <Button primary large className={cx('btn')}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
