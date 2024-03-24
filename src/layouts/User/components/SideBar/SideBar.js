import React from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { ArrowRight, EnvelopeSimple, MagnifyingGlass, Phone, User } from '@phosphor-icons/react';
import H2Decoration from '~/components/H2Decoration';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import images from '~/assets/images';
import Image from '~/components/Image';
import Select from '~/components/Select';
import TextArea from '~/components/TextArea';

const cx = classNames.bind(styles);

export default function SideBar({ search, bookTour, className }) {
    const DATA_CATE = [
        {
            title: 'Hill Tracking(8)',
            to: '/index',
        },
        {
            title: 'Adventure(5)',
            to: '/index',
        },
        {
            title: 'Village Beauty(6)',
            to: '/index',
        },
        {
            title: 'Night View(8)',
            to: '/index',
        },
        {
            title: 'Religious Place(7)',
            to: '/index',
        },
        {
            title: 'Lake View(3)',
            to: '/index',
        },
        {
            title: 'Sea Area(5)',
            to: '/index',
        },
        {
            title: 'Resourt(4)',
            to: '/index',
        },
    ];
    const DATA_DEAL = [
        { title: 'Brooklyn Christmas Lights', img: images.cat_1_1, price: 250 },
        { title: 'Brooklyn Christmas Lights', img: images.cat_1_1, price: 250 },
        { title: 'Brooklyn Christmas Lights', img: images.cat_1_1, price: 250 },
    ];
    const DATA_SELECT = [
        {
            id: 1,
            title: 'Ticket Types',
            items: [
                {
                    value: 'bassic',
                    label: 'Basic Ticket',
                },
                {
                    value: 'standard',
                    label: 'Standard Ticket',
                },
                {
                    value: 'vip',
                    label: 'Vip Ticket',
                },
            ],
        },
        {
            id: 2,
            title: 'Adult',
            items: [
                {
                    value: '1',
                    label: '1 person',
                },
                {
                    value: '2',
                    label: '2 person',
                },
                {
                    value: '3',
                    label: '3 person',
                },
            ],
        },
        {
            id: 3,
            title: 'Child',
            items: [
                {
                    value: '1',
                    label: '1 person',
                },
                {
                    value: '2',
                    label: '2 person',
                },
                {
                    value: '3',
                    label: '3 person',
                },
            ],
        },
    ];
    return (
        <div className={cx('information_cate', className)}>
            {search && (
                <div className={cx('tour_search', 'background_item')}>
                    <form className={cx('search-form')}>
                        <Input
                            placeholder={'Enter Keyword'}
                            button={
                                <Button
                                    primary
                                    className={cx('icon')}
                                    leftIcon={<MagnifyingGlass size={20} color="#ffffff" />}
                                />
                            }
                        />
                    </form>
                </div>
            )}
            {bookTour && (
                <div className={cx('book_tour_search')}>
                    <div className={cx('tour_search-top')}>
                        <h2>Book This Tour</h2>
                        <p>$250.00 per person</p>
                    </div>
                    <form className={cx('search-form')}>
                        <Input placeholder={'Your Name'} rightIcon={<User weight="bold" />} />
                        <Input placeholder={'Your Email'} rightIcon={<EnvelopeSimple weight="bold" />} type={'email'} />
                        <Input placeholder={'Phone Number'} rightIcon={<Phone weight="bold" />} type={'number'} />
                        <Select data={DATA_SELECT[0]} />
                        <div className={cx('search-form_item')}>
                            {DATA_SELECT.slice(1, 3).map((result, index) => (
                                <Select className={cx('form_item_select')} data={result} key={index} />
                            ))}
                        </div>
                        <Input placeholder={'mm/dd/yyyy'} type={'date'} classNameInput={cx('input-date')} />
                        <TextArea placeholder={'Your Message'} />
                        <Button primary large>
                            Book Now
                        </Button>
                    </form>
                </div>
            )}
            <div className={cx('tour_categories', 'background_item')}>
                <H2Decoration>Tour Categories</H2Decoration>
                {DATA_CATE.map((result, index) => (
                    <Button className={cx('cate_btn')} to={result.to} rightIcon={<ArrowRight size={20} />} key={index}>
                        {result.title}
                    </Button>
                ))}
            </div>
            <div className={cx('minute_deals', 'background_item')}>
                <H2Decoration>Last Minute Deals</H2Decoration>
                <div className={cx('deal_list')}>
                    {DATA_DEAL.map((result, index) => (
                        <div className={cx('deal_item')} key={index}>
                            <Image
                                pointer
                                className={cx('deal_img')}
                                animation
                                width={'85px'}
                                height={'85px'}
                                src={result.img}
                            />
                            <div className={cx('deal_title')}>
                                <Link to={routes.tour_detail}>
                                    <h2>{result.title}</h2>
                                </Link>
                                <span>
                                    From <span className={cx('deal_price')}>{result.price}$</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('adventure', 'background_item')}>
                <div className={cx('offer-banner')}>
                    <div className={cx('banner-logo')}>
                        <img src={images.logo} alt="Travon" />
                    </div>
                    <span className={cx('banner-subtitle')}>Happy Holiday</span>
                    <h3 className={cx('banner-title')}>Adventure Ture</h3>
                    <div className={cx('offer')}>
                        <h6 className={cx('offer-title')}>
                            <span className={cx('text-theme')}>Travon</span> Special
                        </h6>
                        <p className={cx('offer-text')}>
                            <span className={cx('text-theme')}>30% off</span> On All Booking
                        </p>
                    </div>
                    <Button to={routes.contact} className={cx('ot-btn')} large primary>
                        Get A Quote
                    </Button>
                </div>
            </div>
        </div>
    );
}
