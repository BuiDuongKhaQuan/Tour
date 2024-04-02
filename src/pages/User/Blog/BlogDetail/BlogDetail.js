import React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';
import Input from '~/components/Input';
import {
    AirplaneTakeoff,
    Calendar,
    Camera,
    CurrencyCircleDollar,
    MapPin,
    Subtitles,
    Users,
    UsersThree,
} from '@phosphor-icons/react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import TextArea from '~/components/TextArea';

const cx = classNames.bind(styles);

export default function BlogDetail() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <h2>Information</h2>
                <div className={cx('container')}>
                    <div className={cx('avatar')}>
                        <Image animation className={cx('avatar-img')} src={images.tour_1_1} alt={'avatar'} />
                        <Button className={cx('avater-btn')} circle leftIcon={<Camera size={32} weight="duotone" />} />
                    </div>
                    <div className={cx('infor')}>
                        <div className={cx('input_list')}>
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<Subtitles size={20} weight="bold" />}
                                placeholder={'Blog Title'}
                                type="text"
                            />
                        </div>
                        <div className={cx('input_list')}>
                            <Input
                                classNameInput={cx('input', 'input_date')}
                                // rightIcon={<Calendar size={20} weight="bold" />}
                                placeholder={'Day'}
                                type="date"
                            />
                            <Input
                                classNameInput={cx('input')}
                                rightIcon={<Users size={20} weight="bold" />}
                                placeholder={'User'}
                            />
                        </div>
                        <TextArea className={cx('text_area')} placeholder={'Content'} />
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
