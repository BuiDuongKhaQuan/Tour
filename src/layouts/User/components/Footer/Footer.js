import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Calendar,
    Copyright,
    EnvelopeSimple,
    FacebookLogo,
    LinkedinLogo,
    MapPin,
    Phone,
    TwitterLogo,
    WhatsappLogo,
} from '@phosphor-icons/react';
import Button from '~/components/Button';
import H2Decoration from '~/components/H2Decoration';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function Footer() {
    const company = JSON.parse(sessionStorage.getItem('company'));

    return (
        <div className={cx('footer_wrapper')} style={{ backgroundImage: `url(${images.footer_bg_1})` }}>
            <div className={cx('form_offer')}>
                <div className={cx('offer_container')}>
                    <div
                        className={cx('offer_background')}
                        style={{ backgroundImage: `url(${images.subscribe_bg_1})` }}
                    >
                        <h2>Get Special Offers And More From Travon</h2>
                        <p>Sign up now and get the best deals straight in your inbox!</p>
                        <form className={cx('newsletter_form')}>
                            <div className={cx('form_group')}>
                                <input
                                    className={cx('form_control')}
                                    type="email"
                                    placeholder="Email Address"
                                    required=""
                                />
                                <EnvelopeSimple className={cx('form_icon')} color="#687179" weight="fill" />
                            </div>
                            <Button className={cx('form_btn')} large primary>
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('slogan', 'p_15')}>
                    <Image width={'189px'} src={company?.logo} />
                    <p>{company?.logan}</p>
                    <div className={cx('fanpage')}>
                        <Button
                            className={cx('fanpage_button')}
                            circle
                            leftIcon={<FacebookLogo size={25} weight="fill" color="#ffffff" />}
                        />
                        <Button
                            className={cx('fanpage_button')}
                            circle
                            leftIcon={<TwitterLogo size={25} weight="fill" color="#ffffff" />}
                        />
                        <Button
                            className={cx('fanpage_button')}
                            circle
                            leftIcon={<LinkedinLogo size={25} weight="fill" color="#ffffff" />}
                        />
                        <Button
                            className={cx('fanpage_button')}
                            circle
                            leftIcon={<WhatsappLogo size={25} weight="fill" color="#ffffff" />}
                        />
                    </div>
                </div>
                <div className={cx('link', 'p_15')}>
                    <H2Decoration>Quick Links</H2Decoration>
                    <div className={cx('list')}>
                        <Link className={cx('_link')}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            About Us
                        </Link>
                        <Link className={cx('_link')} to={routes.tour}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            Tour
                        </Link>
                        <Link className={cx('_link')} to={routes.destination}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            Destinations
                        </Link>
                        <Link className={cx('_link')} to={routes.blog}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            Blog
                        </Link>
                        <Link className={cx('_link')} to={routes.contact}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className={cx('contact', 'p_15')}>
                    <H2Decoration>Contact Us</H2Decoration>
                    <div className={cx('list')}>
                        <div className={cx('contact_item')}>
                            <span className={cx('item_icon')}>
                                <MapPin size={13} weight="fill" />
                            </span>
                            <span className={cx('item_text')}>{company.address}</span>
                        </div>
                        <div className={cx('contact_item')}>
                            <span className={cx('item_icon')}>
                                <Phone size={13} weight="fill" />
                            </span>
                            <span className={cx('item_text')}>{company.phone}</span>
                        </div>
                        <div className={cx('contact_item')}>
                            <span className={cx('item_icon')}>
                                <EnvelopeSimple size={13} weight="fill" />
                            </span>
                            <span className={cx('item_text')}>{company.email}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('recent', 'p_15')}>
                    <H2Decoration>Recent Posts</H2Decoration>
                    <div className={cx('list')}>
                        <div className={cx('recent_item')}>
                            <Image className={cx('post_img')} animation src={images.about_2_2} />
                            <div>
                                <h2>5 Ways To Get Your Dream Photos On Picnic</h2>
                                <Link className={cx('post_time')}>
                                    <Calendar size={18} weight="bold" color="#3cb371" />
                                    21 June, 2023
                                </Link>
                            </div>
                        </div>
                        <div className={cx('recent_item')}>
                            <Image className={cx('post_img')} animation src={images.about_2_2} />
                            <div>
                                <h2>5 Ways To Get Your Dream Photos On Picnic</h2>
                                <Link className={cx('post_time')}>
                                    <Calendar size={18} weight="bold" color="#3cb371" />
                                    21 June, 2023
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('copyright')}>
                <p>
                    Copyright <Copyright size={25} /> 2023 <Link className={cx('post_time_travel')}>Travel</Link>. All
                    Rights Reserved.
                </p>
                <div className={cx('copyright_term')}>
                    <Link className={cx('post_time')}>Terms of Use</Link>
                    <span>|</span>
                    <Link className={cx('post_time')}>Privacy Environmental Policy</Link>
                </div>
            </div>
        </div>
    );
}
