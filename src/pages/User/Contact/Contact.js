import { EnvelopeSimple, MapPin, NewspaperClipping, Phone, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import images from '~/assets/images';
import Button from '~/components/Button';
import H2Decoration from '~/components/H2Decoration';
import Input from '~/components/Input';
import TextArea from '~/components/TextArea';
import { showNotifications } from '~/utils/constants';
import { createContact } from '~/utils/httpRequest';
import styles from './Contact.module.scss';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export default function Contact() {
    const { t } = useTranslation();
    const DATA_COMPANY = {
        phone: '0328216789',
        email: 'travel@gmail.com',
        address: '123 Main St',
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        topic: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await createContact(formData);
            showNotifications({
                message: response.message,
            });
            setFormData({ name: '', email: '', phone: '', topic: '', message: '' }); // Reset form
        } catch (error) {
            showNotifications({
                title: 'Error',
                type: 'danger',
                message: 'Failed to send message. Please try again.',
            });
        }
    };

    return (
        <>
            <div className={cx('contact_wrapper')}>
                <div className={cx('information')}>
                    <div className={cx('contact')}>
                        <div className={cx('shape-img')}>
                            <img src={images.contact_shape} alt="shape" />
                        </div>
                        <H2Decoration className={cx('h2_decor')}>{t('common.contactInfo')}</H2Decoration>
                        <div className={cx('contact_item')}>
                            <h2>{t('common.contactNumber')}</h2>
                            <div className={cx('item_wrapper')}>
                                <span className={cx('icon')}>
                                    <Phone />
                                </span>
                                <span className={cx('text')}>{DATA_COMPANY.phone}</span>
                            </div>
                        </div>
                        <div className={cx('contact_item')}>
                            <h2>{t('common.email')}</h2>
                            <div className={cx('item_wrapper')}>
                                <span className={cx('icon')}>
                                    <EnvelopeSimple />
                                </span>
                                <span className={cx('text')}>{DATA_COMPANY.email}</span>
                            </div>
                        </div>
                        <div className={cx('contact_item')}>
                            <h2>{t('common.officeAddress')}</h2>
                            <div className={cx('item_wrapper')}>
                                <span className={cx('icon')}>
                                    <MapPin />
                                </span>
                                <span className={cx('text')}>{DATA_COMPANY.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('map')}>
                        <div className={cx('map_container')}>
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3918.0708409363697!2d106.77992637451861!3d10.882216557234578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1710321427593!5m2!1svi!2s"
                                width="100%"
                                height="100%"
                                style={{ border: '0' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <form className={cx('form')} onSubmit={handleSendMessage}>
                    <h2>{t('common.make')}</h2>
                    <div className={cx('input_list')}>
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<User size={20} weight="bold" />}
                            placeholder={t('common.yourName')}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<EnvelopeSimple size={20} weight="bold" />}
                            placeholder={t('common.email')}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('input_list')}>
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<Phone size={20} weight="bold" />}
                            placeholder={t('common.phoneNumber')}
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<NewspaperClipping size={20} weight="bold" />}
                            placeholder={t('common.querryTopic')}
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                        />
                    </div>
                    <TextArea
                        className={cx('text_area')}
                        placeholder={t('common.yourMessage')}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <Button primary large className={cx('btn')} type="submit">
                        {t('common.sendNow')}
                    </Button>
                </form>
            </div>
        </>
    );
}
