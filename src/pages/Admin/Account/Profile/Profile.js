import React from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Input from '~/components/Input';
import { EnvelopeSimple, NewspaperClipping, Phone, User } from '@phosphor-icons/react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

export default function Profile() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <h2>Information</h2>
                <div className={cx('input_list')}>
                    <Input
                        classNameInput={cx('input')}
                        rightIcon={<User size={20} weight="bold" />}
                        placeholder={'Your Name'}
                    />
                    <Input
                        classNameInput={cx('input')}
                        rightIcon={<EnvelopeSimple size={20} weight="bold" />}
                        placeholder={'Email Address'}
                        type="email"
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        classNameInput={cx('input')}
                        rightIcon={<Phone size={20} weight="bold" />}
                        placeholder={'Phone Number'}
                        type="number"
                    />
                    <Input
                        classNameInput={cx('input')}
                        rightIcon={<NewspaperClipping size={20} weight="bold" />}
                        placeholder={'Queary Topic'}
                    />
                </div>

                <div className={cx('input_list')}>
                    <Button primary large className={cx('btn')}>
                        Submit
                    </Button>
                    <Button primary large className={cx('btn')}>
                        Reset Password
                    </Button>
                    <Button primary large className={cx('btn')}>
                        Lock
                    </Button>
                </div>
            </form>
            <div className={cx('avatar')}>
                <Image className={cx('avatar-img')} circle src={images.ceo} alt={'avatar'} />
            </div>
        </div>
    );
}
