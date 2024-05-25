import React from 'react';
import classNames from 'classnames/bind';
import styles from './DestinationDetail.module.scss';
import Input from '~/components/Input';
import { Camera, MapPin, RoadHorizon } from '@phosphor-icons/react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);
export default function DestinationDetail() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <h2>Information</h2>
                <div className={cx('container')}>
                    <div className={cx('avatar')}>
                        <Image animation className={cx('avatar-img')} src={images.dest_2_3} alt={'avatar'} />
                        <Button className={cx('avater-btn')} circle leftIcon={<Camera size={32} weight="duotone" />} />
                    </div>
                    <div className={cx('infor')}>
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<MapPin size={20} weight="bold" />}
                            placeholder={'Destination Name'}
                            type="text"
                        />
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<RoadHorizon size={20} weight="bold" />}
                            placeholder={'Trip+'}
                            type="number"
                        />

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
