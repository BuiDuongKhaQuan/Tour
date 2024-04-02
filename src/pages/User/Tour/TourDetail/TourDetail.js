import React from 'react';
import classNames from 'classnames/bind';
import styles from './TourDetail.module.scss';
import Button from '~/components/Button';
import { Clock, CurrencyCircleDollar, EnvelopeSimple, MapPin, Star, User, UsersThree } from '@phosphor-icons/react';
import Input from '~/components/Input';
import TextArea from '~/components/TextArea';
import LayoutWithSideBar from '../../LayoutWithSideBar';

const cx = classNames.bind(styles);

export default function TourDetail() {
    const Review = () => (
        <div className={cx('tour_review')}>
            <h2>Leave A Reply</h2>
            <p className={cx('p-title')}>Your email address will not be published. Required fields are marked *</p>
            <div className={cx('start-wrapper')}>
                <span>Your Rating</span>
                <div>
                    <Star size={18} color="#FFB539" weight="bold" />
                    <Star size={18} color="#FFB539" weight="bold" />
                    <Star size={18} color="#FFB539" weight="bold" />
                    <Star size={18} color="#FFB539" weight="bold" />
                    <Star size={18} color="#FFB539" weight="bold" />
                </div>
            </div>
            <form className={cx('rating_form')}>
                <TextArea placeholder={'Write a Message'} />
                <div className={cx('rating_input')}>
                    <Input
                        className={cx('rating_input_item')}
                        placeholder={'Your Name'}
                        rightIcon={<User weight="bold" />}
                    />
                    <Input
                        className={cx('rating_input_item')}
                        placeholder={'Your Email'}
                        rightIcon={<EnvelopeSimple weight="bold" />}
                        type={'email'}
                    />
                </div>
            </form>
            <div className={cx('rating_check')}>
                <input type="checkbox" />
                <p>Save my name, email, and website in this browser for the next time I comment.</p>
            </div>
            <Button className={cx('rating_btn')} primary large>
                POST REVIEW
            </Button>
        </div>
    );

    const Information = () => (
        <div className={cx('tour_information')}>
            <h2>Brooklyn Christmas Lights Tour</h2>
            <div className={cx('information_list')}>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <CurrencyCircleDollar size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>From</span>
                        <p>$250.00</p>
                    </div>
                </div>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <Clock size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>Duration</span>
                        <p>10 Days, 11 Nights</p>
                    </div>
                </div>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <MapPin size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>Location</span>
                        <p>Madrid, Spain</p>
                    </div>
                </div>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <UsersThree size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>Group Size</span>
                        <p>50+ People</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <LayoutWithSideBar bookBar>
            <Information />
            <div className={cx('tour_content')}></div>
            <Review />
        </LayoutWithSideBar>
    );
}
