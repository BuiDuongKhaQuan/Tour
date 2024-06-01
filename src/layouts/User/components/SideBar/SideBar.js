import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import { notification, DATA_CATE, DATA_DEAL, DATA_SELECT } from '~/utils/constants';

const cx = classNames.bind(styles);

export default function SideBar({
    search,
    bookTour,
    showButtonTour = true,
    category,
    formDataOrder,
    onFormDataChange,
    className,
}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        formDataOrder
            ? formDataOrder
            : {
                  name: '',
                  email: '',
                  phone: '',
                  ticket: '',
                  adult_quantity: '',
                  child_quantity: '',
                  date: '',
                  message: '',
              },
    );
    useEffect(() => {
        if (onFormDataChange) {
            onFormDataChange(formData);
        }
    }, [formData, onFormDataChange]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, data) => {
        setFormData({ ...formData, [name]: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionStorage.getItem('user')) {
            Store.addNotification({
                ...notification,
                type: 'warning',
                title: 'Warning',
                message: 'Bạn cần đăng nhập để đặt Tour',
            });
        } else {
            const { name, email, phone, id_ticket, adult_quantity, child_quantity, date, message } = formData;
            if (
                name === '' ||
                email === '' ||
                phone === '' ||
                id_ticket === '' ||
                adult_quantity === '' ||
                child_quantity === '' ||
                date === '' ||
                message === ''
            ) {
                Store.addNotification({
                    ...notification,
                    type: 'warning',
                    title: 'Warning',
                    message: 'Vui lòng điền đầy đủ thông tin',
                });
            } else {
                navigate('/order', { state: { ...formData, id_tour: id } });
            }
        }
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
                            defaultValue={formData.ticket}
                            onChange={(option) => handleSelectChange('ticket', option)}
                        />
                        <div className={cx('search-form_item')}>
                            <Select
                                className={cx('form_item_select')}
                                data={DATA_SELECT[1]}
                                defaultValue={formData.adult_quantity}
                                onChange={(option) => handleSelectChange('adult_quantity', option)}
                            />
                            <Select
                                className={cx('form_item_select')}
                                data={DATA_SELECT[2]}
                                defaultValue={formData.child_quantity}
                                onChange={(option) => handleSelectChange('child_quantity', option)}
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
                        {showButtonTour && (
                            <Button primary large type="submit">
                                Book Now
                            </Button>
                        )}
                    </form>
                </div>
            )}
            {category && (
                <>
                    <div className={cx('tour_categories', 'background_item')}>
                        <H2Decoration>Tour Categories</H2Decoration>
                        {DATA_CATE.map((result, index) => (
                            <Button
                                className={cx('cate_btn')}
                                to={result.to}
                                rightIcon={<ArrowRight size={20} />}
                                key={index}
                            >
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
                </>
            )}
        </div>
    );
}
