import { EnvelopeSimple, Phone, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaChild } from 'react-icons/fa6';
import { IoIosPerson } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import H2Decoration from '~/components/H2Decoration';
import Image from '~/components/Image';
import Input from '~/components/Input';
import Select from '~/components/Select';
import TextArea from '~/components/TextArea';
import routes from '~/config/routes';
import { DATA_DEAL, getTodayDate, showNotifications } from '~/utils/constants';
import { findTourById, getTickets } from '~/utils/httpRequest';
import styles from './SideBar.module.scss';
import CurrencyFormat from 'react-currency-format';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export default function SideBar({
    search,
    bookTour,
    showButtonTour = true,
    category,
    filterBar,
    formDataOrder,
    onFormDataChange,
    className,
}) {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [tour, setTour] = useState();
    const [ticketSelect, setTicketSelect] = useState({
        id: 2,
        title: 'Ticket',
        items: [],
    });
    const [formData, setFormData] = useState(
        formDataOrder
            ? formDataOrder
            : {
                  userId: user?.id,
                  tourId: id,
                  name: user?.name,
                  email: user?.email,
                  phone: user?.phone,
                  adultQuantity: 1,
                  childQuantity: 1,
                  date: '',
                  totalPrice: '',
                  message: '',
                  ticketId: '',
                  ticket: {},
              },
    );
    useEffect(() => {
        if (onFormDataChange) {
            onFormDataChange(formData);
        }
    }, [formData, onFormDataChange]);

    useEffect(() => {
        if (!filterBar) {
            getTourData(formData.tourId);
            getAllTicket();
        }
    }, [formData]);

    const getTourData = async (id) => {
        try {
            const response = await findTourById(id);
            setTour(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllTicket = async () => {
        try {
            const response = await getTickets();
            const items = response.data.map((ticket) => ({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, data) => {
        setFormData({ ...formData, [name]: data, ticketId: data.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (!sessionStorage.getItem('user')) {
            showNotifications({
                type: 'warning',
                title: 'Warning',
                message: 'Bạn cần đăng nhập để đặt Tour',
            });
        } else {
            const { name, email, phone, ticket, adultQuantity, childQuantity, date, message } = formData;
            if (
                name === '' ||
                email === '' ||
                phone === '' ||
                ticket === '' ||
                adultQuantity === '' ||
                childQuantity === '' ||
                date === '' ||
                message === ''
            ) {
                console.log(formData);
                showNotifications({
                    type: 'warning',
                    title: 'Warning',
                    message: 'Vui lòng điền đầy đủ thông tin',
                });
            } else {
                navigate('/order', { state: formData });
            }
        }
    };
    return (
        <div className={cx('information_cate', className)}>
            {search}
            {bookTour && (
                <div className={cx('book_tour_search')}>
                    <div className={cx('tour_search-top')}>
                        <h2>Book This Tour</h2>
                        <p>
                            <CurrencyFormat
                                value={tour?.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ/Người'}
                                decimalScale={2}
                            />
                        </p>
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
                            data={ticketSelect}
                            defaultValue={formDataOrder?.ticket}
                            placeholder={'Ticket'}
                            onChange={(option) => handleSelectChange('ticket', option)}
                        />
                        <div className={cx('search-form_item')}>
                            <Input
                                placeholder="Adult quantity"
                                rightIcon={<IoIosPerson />}
                                type="number"
                                name="adultQuantity"
                                value={formData.adultQuantity}
                                onChange={handleChange}
                            />
                            <Input
                                placeholder="Child quantity"
                                rightIcon={<FaChild />}
                                type="number"
                                name="childQuantity"
                                value={formData.childQuantity}
                                onChange={handleChange}
                            />
                        </div>
                        <Input
                            placeholder="mm/dd/yyyy"
                            type="date"
                            classNameInput={cx('input-date')}
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={getTodayDate()}
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
                    {filterBar}

                    <div className={cx('minute_deals', 'background_item')}>
                        <H2Decoration>{t('common.lastMinute')}</H2Decoration>
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
                                            {t('common.from')} <span className={cx('deal_price')}>{result.price}$</span>
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
                            <span className={cx('banner-subtitle')}>{t('common.happyHoliday')}</span>
                            <h3 className={cx('banner-title')}>{t('common.adventureTure')}</h3>
                            <div className={cx('offer')}>
                                <h6 className={cx('offer-title')}>
                                    <span className={cx('text-theme')}>{t('common.travelHouse')}</span>{' '}
                                    {t('common.special')}
                                </h6>
                                <p className={cx('offer-text')}>
                                    <span className={cx('text-theme')}>30% off</span> {t('common.onAll')}
                                </p>
                            </div>
                            <Button to={routes.contact} className={cx('ot-btn')} large primary>
                                {t('common.getVote')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
