import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import 'tippy.js/dist/tippy.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';
import { List, MagnifyingGlass, User, X } from '@phosphor-icons/react';
import { useState } from 'react';
import Modal from 'react-modal';
import { FormSubmit } from '~/components/Modal';
import routes from '~/config/routes';
import AvartarCustom from '~/components/AvartarCustom';

const cx = classNames.bind(styles);

const MENU = [
    {
        title: 'HOME',
        to: config.routes.home,
    },
    {
        title: 'DESTINATION',
        to: config.routes.destination,
    },
    {
        title: 'TOUR',
        to: config.routes.tour,
    },

    {
        title: 'BLOG',
        to: config.routes.blog,
    },
    {
        title: 'CONTACT US',
        to: config.routes.contact,
    },
];

Modal.setAppElement('#root');
function Header() {
    const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
    const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);
    const [modalMenuIsOpen, setModalMenuIsOpen] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
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
                <img src={images.logo} alt="logo" className={cx('logo_image')} />
            </Link>
            <div className={cx('ot-mobile-menu')}>
                {MENU.map((result, index) => (
                    <Link
                        to={result.to}
                        className={(nav) => cx('ot-mobile-menu_item', { active: nav.isActive })}
                        key={index}
                    >
                        <h6>{result.title}</h6>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <div className={cx('warpper')}>
            <div className={cx('row')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="logo" className={cx('logo_image')} />
                </Link>

                <div className={cx('center')}>
                    {MENU.map((result, index) => (
                        <NavLink
                            to={result.to}
                            className={(nav) => cx('menu_item', { active: nav.isActive })}
                            key={index}
                        >
                            <h6>{result.title}</h6>
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
                        onClick={toggleModalSearch}
                        circle
                        leftIcon={<MagnifyingGlass size={20} className={cx('icon')} />}
                    />
                    {user ? (
                        <Link to={routes.profile}>
                            <AvartarCustom alt={user.name} src={user.avatar} stringAva={user.name} />
                        </Link>
                    ) : (
                        <Button
                            onClick={toggleModalLogin}
                            circle
                            leftIcon={<User size={20} className={cx('icon')} />}
                        />
                    )}
                    <Button primary large className={cx('button')}>
                        BOOK YOUR STAY
                    </Button>
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
