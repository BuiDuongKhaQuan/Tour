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
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import H2Decoration from '~/components/H2Decoration';
import Image from '~/components/Image';
import routes from '~/config/routes';
import { formattedDay } from '~/utils/constants';
import { findCompanyById, getBlogLimit } from '~/utils/httpRequest';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
    const { t } = useTranslation();
    const [company, setCompany] = useState({});
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getCompany();
        getAllBlog();
    }, []);

    const getCompany = async () => {
        try {
            const response = await findCompanyById();
            localStorage.setItem('company', JSON.stringify(response.data));
            setCompany(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllBlog = async () => {
        try {
            const response = await getBlogLimit(0, 2);
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('footer_wrapper')} style={{ backgroundImage: `url(${images.footer_bg_1})` }}>
            <div className={cx('form_offer')}>
                <div className={cx('offer_container')}>
                    <div
                        className={cx('offer_background')}
                        style={{ backgroundImage: `url(${images.subscribe_bg_1})` }}
                    >
                        <h2>{t('common.travelSpecial')}</h2>
                        <p>{t('common.signUp')}</p>
                        <form className={cx('newsletter_form')}>
                            <div className={cx('form_group')}>
                                <input
                                    className={cx('form_control')}
                                    type="email"
                                    placeholder={t('common.email')}
                                    required=""
                                />
                                <EnvelopeSimple className={cx('form_icon')} color="#687179" weight="fill" />
                            </div>
                            <Button className={cx('form_btn')} large primary>
                                {t('common.subcribe')}
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
                    <H2Decoration>{t('common.quickLinks')}</H2Decoration>
                    <div className={cx('list')}>
                        <Link className={cx('_link')}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            {t('common.aboutUs')}
                        </Link>
                        <Link className={cx('_link')} to={routes.tour}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            {t('common.tour')}
                        </Link>
                        <Link className={cx('_link')} to={routes.destination}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            {t('common.destination')}
                        </Link>
                        <Link className={cx('_link')} to={routes.blog}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            {t('common.blog')}
                        </Link>
                        <Link className={cx('_link')} to={routes.contact}>
                            <ArrowRight className={cx('arrow_icon')} size={20} weight="bold" />
                            {t('common.contactUs')}
                        </Link>
                    </div>
                </div>
                <div className={cx('contact', 'p_15')}>
                    <H2Decoration>{t('common.contactUs')}</H2Decoration>
                    <div className={cx('list')}>
                        <div className={cx('contact_item')}>
                            <span className={cx('item_icon')}>
                                <MapPin size={13} weight="fill" />
                            </span>
                            <span className={cx('item_text')}>{company?.address}</span>
                        </div>
                        <div className={cx('contact_item')}>
                            <span className={cx('item_icon')}>
                                <Phone size={13} weight="fill" />
                            </span>
                            <span className={cx('item_text')}>{company?.phone}</span>
                        </div>
                        <div className={cx('contact_item')}>
                            <span className={cx('item_icon')}>
                                <EnvelopeSimple size={13} weight="fill" />
                            </span>
                            <span className={cx('item_text')}>{company?.email}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('recent', 'p_15')}>
                    <H2Decoration>{t('common.recentPosts')}</H2Decoration>
                    <div className={cx('list')}>
                        {blogs?.map((blog, index) => (
                            <div className={cx('recent_item')} key={index}>
                                <div className={cx('post_img')}>
                                    <Image
                                        // width={200}
                                        className={cx('img')}
                                        height={100}
                                        animation
                                        src={blog.image.url}
                                    />
                                </div>
                                <div className={cx('post-info')}>
                                    <Link to={`/blog/${blog.id}`} className={cx('post-topic')}>
                                        <h2>{blog.topic}</h2>
                                    </Link>
                                    <p className={cx('post_time')}>
                                        <span>
                                            <Calendar size={18} weight="bold" color="#3cb371" />
                                        </span>
                                        {formattedDay(new Date(blog.createdAt))}
                                    </p>
                                </div>
                            </div>
                        ))}
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
