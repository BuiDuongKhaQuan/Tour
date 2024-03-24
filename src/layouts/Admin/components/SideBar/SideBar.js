import React from 'react';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Input from '~/components/Input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import images from '~/assets/images';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

export default function SideBar() {
    const user = {
        name: 'Bui Duong Kha Quan',
        img: images.ceo,
    };
    return (
        <div className={cx('side-bar')}>
            <Input
                className={cx('input_')}
                placeholder={'Search...'}
                rightIcon={<MagnifyingGlass size={25} weight="bold" />}
            />
            <div className={cx('user')}>
                <h2>{user.name}</h2>
                <Image src={user.img} alt={user.name} circle width={'50px'} />
            </div>
        </div>
    );
}
