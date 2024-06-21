import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { IoTicketOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import Select from '~/components/Select';
import { TourCardItem } from '~/components/SliderCard';
import { formattedDate, showNotifications } from '~/utils/constants';
import { findOrderById, findTourById, getTickets, updateBookings } from '~/utils/httpRequest';
import styles from './OrderDetail.module.scss';

const cx = classNames.bind(styles);

export default function OrderDetail({ create }) {
    const { id } = useParams();
    const [order, setOrder] = useState({
        userId: '',
        tourId: '',
        name: '',
        email: '',
        phone: '',
        ticketId: '',
        adultQuantity: '',
        childQuantity: '',
        date: '',
        message: '',
        status: '',
        totalPrice: '',
        checkoutStatus: '',
    });
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedTicketOption, setSelectedTicketOption] = useState(null);
    const [ticketSelect, setTicketSelect] = useState({
        id: 2,
        title: 'Ticket',
        icon: <IoTicketOutline size={20} />,
        items: [],
    });
    const findSelectedTicketOption = (statusValue) => {
        return ticketSelect.items.find((item) => item.value === statusValue);
    };

    useEffect(() => {
        if (!create) {
            getData(id);
        }
    }, [id, create]);
    useEffect(() => {
        if (ticketSelect.items.length > 0 && !create) {
            setSelectedTicketOption(findSelectedTicketOption(order.ticketId));
        }
    }, [ticketSelect, create]);

    const getData = async (id) => {
        try {
            const response = await findOrderById(id);
            const response1 = await findTourById(response.data.tourId);
            const response2 = await getTickets();

            console.log(response2);
            setTour(response1.data);
            setOrder(response.data);

            const items = response2.data.map((ticket) => ({
                value: ticket.id,
                label: `${ticket.type} (+${ticket.value}%)`,
            }));
            setTicketSelect((prev) => {
                const existingItems = new Set(prev.items.map((item) => item.value));
                const newItems = items.filter((item) => !existingItems.has(item.value));
                return {
                    ...prev,
                    items: [...prev.items, ...newItems],
                };
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleOrderTicketChange = (selectedOption) => {
        setSelectedTicketOption(selectedOption);
        setOrder((prev) => ({
            ...prev,
            ticketId: selectedOption.value,
        }));
    };

    const handleChangeStatus = async (status) => {
        setLoading(true);
        try {
            const response = await updateBookings(id, { status });
            setOrder(response.data);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
        } finally {
            setLoading(false);
        }
    };
    const handlePaid = async (status) => {
        setLoading(true);
        try {
            const response = await updateBookings(id, { checkoutStatus: status });
            setOrder(response.data);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
        } finally {
            setLoading(false);
        }
    };
    const getPaymentMethod = (paymentID) => {
        if (paymentID === 1) return 'Paypal';
        if (paymentID === 2) return 'VN Pay';
        if (paymentID === 3) return 'Masster cards';
        if (paymentID === 4) return 'Tiền mặt';
    };

    const getStatusOrrder = (status) => {
        if (status === 1) return 'Not received';
        if (status === 2) return 'Complete';
        if (status === 3) return 'Cancelled';
    };
    const getCheckoutStatusOrrder = (status) => {
        if (status === 1) return 'Chưa thanh toán';
        if (status === 2) return 'Đã thanh toán';
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <form className={cx('form')}>
                <h2>Order Information</h2>
                <div className={cx('container')}>
                    <div className={cx('fields')}>
                        <div className={cx('tour')}>{tour && <TourCardItem data={tour} />}</div>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Name'}
                                    classNameInput={cx('input')}
                                    placeholder={'Order Name'}
                                    value={order?.name}
                                    onChange={(e) => setOrder({ ...order, name: e.target.value })}
                                    type="text"
                                />
                                <Input
                                    label={'Email'}
                                    classNameInput={cx('input')}
                                    placeholder={'Email'}
                                    value={order?.email}
                                    onChange={(e) => setOrder({ ...order, email: e.target.value })}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Phone'}
                                    classNameInput={cx('input')}
                                    placeholder={'Phone'}
                                    value={order?.phone}
                                    onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                                    type="text"
                                />
                                <Input
                                    label={'Adult quantity'}
                                    classNameInput={cx('input')}
                                    placeholder={'Adult quantity'}
                                    value={order?.adultQuantity}
                                    onChange={(e) => setOrder({ ...order, adultQuantity: e.target.value })}
                                    type="number"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Total Price'}
                                    classNameInput={cx('input')}
                                    placeholder={'Total Price'}
                                    value={order?.totalPrice}
                                    onChange={(e) => setOrder({ ...order, totalPrice: e.target.value })}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Date'}
                                    classNameInput={cx('input')}
                                    placeholder={'Date'}
                                    value={order?.date}
                                    onChange={(e) => setOrder({ ...order, date: e.target.value })}
                                    type="text"
                                />
                                <Input
                                    label={'Child quantity'}
                                    classNameInput={cx('input')}
                                    placeholder={'Child quantity'}
                                    value={order?.childQuantity}
                                    onChange={(e) => setOrder({ ...order, childQuantity: e.target.value })}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Status'}
                                    disabled={true}
                                    value={getStatusOrrder(order?.status)}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={'Status'}
                                    type="text"
                                />
                                <Input
                                    label={'Day create'}
                                    disabled={true}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={formattedDate(new Date(order?.createdAt))}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                {selectedTicketOption && (
                                    <Select
                                        label={'Ticket'}
                                        data={ticketSelect}
                                        defaultValue={selectedTicketOption}
                                        onChange={handleOrderTicketChange}
                                        placeholder={'Ticket'}
                                        className={cx('select')}
                                        classNameSelect={cx('select-content')}
                                    />
                                )}
                                <Input
                                    label={'Day update'}
                                    disabled={true}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={formattedDate(new Date(order?.updatedAt))}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Checkout status'}
                                    disabled={true}
                                    value={getCheckoutStatusOrrder(order?.checkoutStatus)}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={'Checkout status'}
                                    type="text"
                                />
                                <Input
                                    label={'Payment Method'}
                                    disabled={true}
                                    value={getPaymentMethod(order?.paymentMethod)}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={'Payment Method'}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Message'}
                                    classNameInput={cx('input')}
                                    placeholder={'Message'}
                                    value={order?.message}
                                    onChange={(e) => setOrder({ ...order, message: e.target.value })}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('input_list')}>
                            <Button
                                primary
                                large
                                className={cx('btn')}
                                type="button"
                                disabled={order?.checkoutStatus === 2}
                                onClick={() => handlePaid(2)}
                            >
                                Paid
                            </Button>
                            <Button
                                primary
                                large
                                className={cx('btn')}
                                type="button"
                                onClick={() => handleChangeStatus(3)}
                                disabled={order?.status === 2 || order?.status === 3}
                            >
                                Cancel Order
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
