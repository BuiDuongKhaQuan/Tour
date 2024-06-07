import React, { useEffect, useState } from 'react';
import Breadcumb from '~/components/Breadcumb';
import SideBar from '~/layouts/User/components/SideBar';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { book, findTourById } from '~/utils/httpRequest';
import { TourCardItem } from '~/components/SliderCard';
import Button from '~/components/Button';
import { Store } from 'react-notifications-component';
import { notification } from '~/utils/constants';
import CurrencyFormat from 'react-currency-format';

const cx = classNames.bind(styles);

export default function Order() {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(location.state);
    const [tour, setTour] = useState(null);
    const [priceAdult, setPriceAdult] = useState(0);
    const [priceChild, setPriceChild] = useState(0);
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const getTour = async () => {
            const response = await findTourById(formData.id_tour);
            setTour(response.data);
        };
        getTour();
    }, []);

    const calculateTotalPrice = () => {
        const priceAdult = formData.adult_quantity.value * (tour?.price || 0);
        const priceChild = formData.child_quantity.value * (tour?.price / 2 || 0);
        setPriceAdult(priceAdult);
        setPriceChild(priceChild);
        totalPriceByTicket();
    };
    const totalPriceByTicket = () => {
        let total = priceAdult + priceChild;
        const valueTicket = formData.ticket.value;
        if (valueTicket === '1') {
        } else if (valueTicket === '2') {
            total += total * 0.3;
        } else if (valueTicket === '3') {
            total += total * 0.6;
        }
        return total;
    };

    useEffect(() => {
        if (tour) {
            calculateTotalPrice();
        }
    }, [formData, tour]);

    const handleFormDataChange = (newFormData) => {
        setFormData(newFormData);
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
            const { name, email, phone, ticket, adult_quantity, child_quantity, date, message } = formData;
            if (name === '' || email === '' || phone === '' || date === '' || message === '') {
                Store.addNotification({
                    ...notification,
                    type: 'warning',
                    title: 'Warning',
                    message: 'Vui lòng điền đầy đủ thông tin',
                });
            } else {
                try {
                    const response = await book({
                        ...formData,
                        id_user: user.id,
                        ticket: ticket.label,
                        adult_quantity: adult_quantity.value,
                        child_quantity: child_quantity.value,
                        total_price: totalPriceByTicket(),
                    });
                    navigate('/payment', { state: { id: response.id, price: response.total_price } });
                } catch (error) {
                    Store.addNotification({
                        ...notification,
                        type: 'warning',
                        title: 'Warning',
                        message: 'Lỗi mạng, vui lòng đặt lại sau!',
                    });
                }
            }
        }
    };
    return (
        <>
            <Breadcumb />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('information')}>
                        <SideBar
                            formDataOrder={formData}
                            onFormDataChange={handleFormDataChange}
                            bookTour
                            showButtonTour={false}
                        />
                    </div>
                    <div className={cx('order')}>
                        <div className={cx('title')}>
                            <h2>Your Order</h2>
                        </div>
                        <div className={cx('tours')}>{tour && <TourCardItem data={tour} />}</div>
                        <div className={cx('list-price')}>
                            <div className={cx('price-item')}>
                                <span className={cx('lable')}>Ticket</span>
                                <span className={cx('price')}> {formData.ticket.label}</span>
                            </div>
                            <div className={cx('price-item')}>
                                <span className={cx('lable')}>Adult {`(${formData.adult_quantity.value} person)`}</span>
                                <span className={cx('price')}>
                                    {' '}
                                    <CurrencyFormat
                                        value={priceAdult}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                        decimalScale={2}
                                    />
                                </span>
                            </div>
                            <div className={cx('price-item')}>
                                <span className={cx('lable')}>Child {`(${formData.child_quantity.value} person)`}</span>
                                <span className={cx('price')}>
                                    {' '}
                                    <CurrencyFormat
                                        value={priceChild}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                        decimalScale={2}
                                    />
                                </span>
                            </div>
                            <div className={cx('price-item', 'total')}>
                                <span className={cx('lable')}>Total</span>
                                <span className={cx('price')}>
                                    {' '}
                                    <CurrencyFormat
                                        value={totalPriceByTicket()}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                        decimalScale={2}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className={cx('checkout-btn')}>
                            <Button primary large className={cx('btn')} onClick={handleSubmit}>
                                Check out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
