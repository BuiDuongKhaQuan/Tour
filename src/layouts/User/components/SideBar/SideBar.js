import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { ArrowRight, EnvelopeSimple, MagnifyingGlass, Phone, User } from '@phosphor-icons/react';
import H2Decoration from '~/components/H2Decoration';
import { Link, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import images from '~/assets/images';
import Image from '~/components/Image';
import Select from '~/components/Select';
import TextArea from '~/components/TextArea';
import { book } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

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
                value: '1',
                label: 'Basic Ticket',
            },
            {
                value: '2',
                label: 'Standard Ticket',
            },
            {
                value: '3',
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
export default function SideBar({ search, bookTour, className }) {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        id_ticket: '',
        person_quantity: '',
        child_quantity: '',
        date: '',
        message: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, data) => {
        console.log(data.value);
        setFormData({ ...formData, [name]: data.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        const tourBooked = await book({ ...formData, id_user: user.id, id_tour: id });
        console.log(tourBooked);
    };
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
                    <form className={cx('search-form')} onSubmit={handleSubmit}>
                        <Input
                            placeholder="Your Name"
                            rightIcon={<User weight="bold" />}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Your Email"
                            rightIcon={<EnvelopeSimple weight="bold" />}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Phone Number"
                            rightIcon={<Phone weight="bold" />}
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Select
                            data={DATA_SELECT[0]}
                            selectedOption={formData.select1}
                            setSelectedOption={(option) => handleSelectChange('id_ticket', option)}
                        />
                        <div className={cx('search-form_item')}>
                            <Select
                                className={cx('form_item_select')}
                                data={DATA_SELECT[1]}
                                selectedOption={formData.person_quantity}
                                setSelectedOption={(option) => handleSelectChange('person_quantity', option)}
                            />
                            <Select
                                className={cx('form_item_select')}
                                data={DATA_SELECT[2]}
                                selectedOption={formData.child_quantity}
                                setSelectedOption={(option) => handleSelectChange('child_quantity', option)}
                            />
                        </div>
                        <Input
                            placeholder="mm/dd/yyyy"
                            type="date"
                            classNameInput={cx('input-date')}
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <TextArea
                            placeholder="Your Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <Button primary large type="submit">
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
