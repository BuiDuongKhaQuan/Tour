import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { TourCardItem } from '~/components/SliderCard';
import SideBar from '~/layouts/User/components/SideBar';
import { showNotifications } from '~/utils/constants';
import { book, findTourById } from '~/utils/httpRequest';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function Order() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [formData, setFormData] = useState(location.state);
    const [tour, setTour] = useState(null);
    const [priceAdult, setPriceAdult] = useState(0);
    const [priceChild, setPriceChild] = useState(0);

    useEffect(() => {
        const getTour = async () => {
            const response = await findTourById(formData.tourId);
            setTour(response.data);
        };
        getTour();
    }, [formData.tourId]);

    const calculateTotalPrice = () => {
        const priceAdult = formData.adultQuantity * (tour?.price || 0);
        const priceChild = formData.childQuantity * (tour?.price / 2 || 0);
        setPriceAdult(priceAdult);
        setPriceChild(priceChild);
        totalPriceByTicket();
    };
    const totalPriceByTicket = () => {
        let total = priceAdult + priceChild;
        const valueTicket = formData.ticket.value;
        if (valueTicket === 1) {
        } else if (valueTicket === 2) {
            total += total * 0.3;
        } else if (valueTicket === 3) {
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
            showNotifications({
                type: 'warning',
                title: 'Warning',
                message: 'Bạn cần đăng nhập để đặt Tour',
            });
        } else {
            const { name, email, phone, date, message } = formData;
            if (name === '' || email === '' || phone === '' || date === '' || message === '') {
                showNotifications({
                    type: 'warning',
                    title: 'Warning',
                    message: 'Vui lòng điền đầy đủ thông tin',
                });
            } else {
                try {
                    const response = await book({
                        ...formData,
                        userId: user.id,
                        totalPrice: totalPriceByTicket(),
                    });
                    navigate('/payment', { state: { id: response.data.id, price: response.data.totalPrice } });
                } catch (error) {
                    showNotifications({
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
                                <span className={cx('lable')}>Adult {`(${formData.adultQuantity} person)`}</span>
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
                                <span className={cx('lable')}>Child {`(${formData.childQuantity} person)`}</span>
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
                            <div className={cx('price-item')}>
                                <span className={cx('lable')} style={{ color: '#3cb371' }}>
                                    (** 1 Child = 50% Adult)
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
