import { CaretDown, Heart, List, MagnifyingGlass, User, X } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import AvatarCustom from '~/components/AvatarCustom';
import Button from '~/components/Button';
import LanguageSelector from '~/components/LanguageSelector';
import { FormSubmit } from '~/components/Modal';
import config from '~/config';
import roles from '~/config/roles';
import routes from '~/config/routes';
import { findCompanyById } from '~/utils/httpRequest';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU = [
    {
        title: 'home',
        to: config.routes.home,
    },
    {
        title: 'destination',
        to: config.routes.destination,
    },
    {
        title: 'tour',
        to: config.routes.tour,
    },

    {
        title: 'blog',
        to: config.routes.blog,
    },
    {
        title: 'contactUs',
        to: config.routes.contact,
    },
];

Modal.setAppElement('#root');
function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
    const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);
    const [modalMenuIsOpen, setModalMenuIsOpen] = useState(false);
    const [modalLanguageIsOpen, setModalLanguageIsOpen] = useState(false);
    const [company, setCompany] = useState({});
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [selectedLanguage, setSelectedLanguageName] = useState(null); // Default language name

    useEffect(() => {
        getCompany();
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
    const body = document.body;

    const toggleModalLogin = () => {
        setModalLoginIsOpen(!modalLoginIsOpen);
        body.style.overflowY = modalLoginIsOpen ? 'auto' : 'hidden';
    };
    const toggleModalSearch = () => {
        setModalSearchIsOpen(!modalSearchIsOpen);
        body.style.overflowY = modalSearchIsOpen ? 'auto' : 'hidden';
    };

    const toggleModalMenu = () => {
        setModalMenuIsOpen(!modalMenuIsOpen);
    };

    const showModalLanguage = () => {
        setModalLanguageIsOpen(!modalLanguageIsOpen);
    };
    const handleLanguageChange = (languageCode) => {
        // Logic to set the selected language name based on languageCode
        const languages = {
            th: { name: 'ประเทศไทย', flag: images.thailan },
            vn: { name: 'Tiếng Việt', flag: images.vi },
            en: { name: 'English', flag: images.global },
            cn: { name: '中国', flag: images.china },
        };
        setSelectedLanguageName(languages[languageCode]);
        setModalLanguageIsOpen(false); // Đóng hộp thoại ngôn ngữ
    };

    useEffect(() => {
        handleLanguageChange(i18n.language);
    }, [i18n.language]);

    const Search = () => (
        <div className={cx('popup-search-box')}>
            <Button onClick={toggleModalSearch} circle className={cx('searchClose')} leftIcon={<X size={25} />} />
            <form action="#">
                <input type="text" placeholder="What are you looking for?" />
                <button type="submit">
                    <MagnifyingGlass size={32} />
                </button>
            </form>
        </div>
    );

    const MobileMenu = () => (
        <div className={cx('ot-menu-area')}>
            <Button
                onClick={toggleModalMenu}
                circle
                className={cx('ot-menu-toggle')}
                leftIcon={<X size={20} weight="bold" />}
            />
            <Link to={config.routes.home} className={cx('mobile-logo')}>
                <img src={company?.logo} alt="logo" className={cx('logo_image')} />
            </Link>
            <div className={cx('ot-mobile-menu')}>
                {MENU.map((result, index) => (
                    <Link
                        to={result.to}
                        className={(nav) => cx('ot-mobile-menu_item', { active: nav.isActive })}
                        key={index}
                    >
                        <h6>{t(`common.${result.title}`)}</h6>
                    </Link>
                ))}
                {user ? (
                    <Link to={routes.profile}>
                        <AvatarCustom alt={user.name} src={user.avatar.url} stringAva={user.name} />
                    </Link>
                ) : (
                    <Button onClick={toggleModalLogin} circle leftIcon={<User size={20} className={cx('icon')} />} />
                )}
            </div>
        </div>
    );

    return (
        <div className={cx('warpper')}>
            <div className={cx('row')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={company?.logo} alt="logo" className={cx('logo_image')} />
                </Link>

                <div className={cx('center')}>
                    {MENU.map((result, index) => (
                        <NavLink
                            to={result.to}
                            className={(nav) => cx('menu_item', { active: nav.isActive })}
                            key={index}
                        >
                            <h6>{t(`common.${result.title}`)}</h6>
                        </NavLink>
                    ))}
                    <Button
                        onClick={toggleModalMenu}
                        className={cx('menu-btn')}
                        square
                        primary
                        leftIcon={<List size={22} weight="bold" />}
                    />
                </div>

                <div className={cx('right')}>
                    <Button
                        onClick={() => navigate(routes.tour_loved)}
                        circle
                        leftIcon={<Heart size={20} className={cx('icon')} />}
                    />
                    {user ? (
                        <Link to={user?.roles.includes(roles.admin) ? routes.admin : routes.profile}>
                            <AvatarCustom alt={user.name} src={user?.avatar?.url} stringAva={user.name} />
                        </Link>
                    ) : (
                        <Button
                            onClick={toggleModalLogin}
                            circle
                            leftIcon={<User size={20} className={cx('icon')} />}
                        />
                    )}

                    <Button
                        outline
                        className={cx('btn-language')}
                        onClick={showModalLanguage}
                        leftIcon={
                            <AvatarCustom
                                width={25}
                                height={25}
                                src={selectedLanguage?.flag}
                                stringAva={selectedLanguage?.name || 'Ngôn ngữ'}
                            />
                        }
                        rightIcon={<CaretDown size={20} />}
                    >
                        {selectedLanguage?.name}
                    </Button>
                    <Modal
                        isOpen={modalLanguageIsOpen}
                        onRequestClose={showModalLanguage}
                        className={cx('modal')}
                        contentLabel="Example Modal"
                    >
                        <LanguageSelector onLanguageChange={handleLanguageChange} />
                    </Modal>
                </div>

                <Modal
                    isOpen={modalLoginIsOpen}
                    onRequestClose={toggleModalLogin}
                    className={cx('modal')}
                    contentLabel="Example Modal"
                >
                    <FormSubmit toggleModalLogin={toggleModalLogin} setCloseModal={toggleModalLogin} />
                </Modal>
                <Modal
                    isOpen={modalMenuIsOpen}
                    onRequestClose={toggleModalMenu}
                    className={cx('menu')}
                    contentLabel="Example Modal"
                >
                    <MobileMenu />
                </Modal>
                <Modal
                    isOpen={modalSearchIsOpen}
                    onRequestClose={toggleModalSearch}
                    className={cx('search-modal')}
                    contentLabel="Example Modal"
                >
                    <Search />
                </Modal>
            </div>
        </div>
    );
}

export default Header;
