import React from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Breadcumb from '~/components/Breadcumb';
import H2Decoration from '~/components/H2Decoration';
import { EnvelopeSimple, MapPin, NewspaperClipping, Phone, User } from '@phosphor-icons/react';
import images from '~/assets/images';
import Input from '~/components/Input';
import TextArea from '~/components/TextArea';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function Contact() {
    const DATA_COMPANY = {
        phone: '0328216789',
        email: 'travel@gmail.com',
        address: '123 Main St',
    };

    return (
        <>
            <Breadcumb />
            <div className={cx('contact_wrapper')}>
                <div className={cx('information')}>
                    <div className={cx('contact')}>
                        <div className={cx('shape-img')}>
                            <img src={images.contact_shape} alt="shape" />
                        </div>
                        <H2Decoration className={cx('h2_decor')}>Contact Info</H2Decoration>
                        <div className={cx('contact_item')}>
                            <h2>Contact Number:</h2>
                            <div className={cx('item_wrapper')}>
                                <sapn className={cx('icon')}>
                                    <Phone />
                                </sapn>
                                <span className={cx('text')}>{DATA_COMPANY.phone}</span>
                            </div>
                        </div>
                        <div className={cx('contact_item')}>
                            <h2>Mail Address:</h2>
                            <div className={cx('item_wrapper')}>
                                <span className={cx('icon')}>
                                    <EnvelopeSimple />
                                </span>
                                <span className={cx('text')}>{DATA_COMPANY.email}</span>
                            </div>
                        </div>
                        <div className={cx('contact_item')}>
                            <h2>Office Address:</h2>
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
                <form className={cx('form')}>
                    <h2>Make An Appointment</h2>
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
                    <TextArea className={cx('text_area')} placeholder={'Your Message'} />
                    <Button primary large className={cx('btn')}>
                        Send Message Now
                    </Button>
                </form>
            </div>
        </>
    );
}
