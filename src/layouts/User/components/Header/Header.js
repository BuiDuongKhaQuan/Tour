import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';
import { EnvelopeSimple, FacebookLogo, GoogleLogo, List, Lock, MagnifyingGlass, User, X } from '@phosphor-icons/react';
import { useState } from 'react';
import Modal from 'react-modal';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

const MENU = [
    {
        title: 'HOME',
        to: '/',
    },
    {
        title: 'DESTINATION',
        to: '/destination',
    },
    {
        title: 'TOUR',
        to: '/tour',
    },

    {
        title: 'BLOG',
        to: '/blog',
    },
    {
        title: 'CONTACT US',
        to: '/contact',
    },
];

Modal.setAppElement('#root');
function Header() {
    const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
    const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);
    const [modalMenuIsOpen, setModalMenuIsOpen] = useState(false);

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

    const handleShowLoginForm = () => {
        document.querySelector(`.${cx('login-form')}`).style.display = 'flex';
        document.querySelector(`.${cx('register-form')}`).style.display = 'none';
        document.querySelector(`.${cx('forgot-form')}`).style.display = 'none';
    };
    const handleShowRegisterForm = () => {
        document.querySelector(`.${cx('login-form')}`).style.display = 'none';
        document.querySelector(`.${cx('register-form')}`).style.display = 'flex';
        document.querySelector(`.${cx('forgot-form')}`).style.display = 'none';
    };
    const handleShowForgotForm = () => {
        document.querySelector(`.${cx('login-form')}`).style.display = 'none';
        document.querySelector(`.${cx('register-form')}`).style.display = 'none';
        document.querySelector(`.${cx('forgot-form')}`).style.display = 'flex';
    };

    const Form = () => (
        <>
            <div className={cx('login-form')}>
                <h2>Login</h2>
                <Button className={cx('btn-close')} onClick={toggleModalLogin} circle leftIcon={<X size={20} />} />
                <form className={cx('form')}>
                    <label>Email</label>
                    <Input
                        type={'email'}
                        placeholder={'example@gmail.com'}
                        classNameInput={cx('form-input')}
                        rightIcon={<EnvelopeSimple size={25} />}
                    />
                    <label>Password</label>
                    <Input
                        type={'password'}
                        placeholder={'password'}
                        classNameInput={cx('form-input')}
                        rightIcon={<Lock size={25} />}
                    />
                    <div className={cx('form-action')}>
                        <span className={cx('remember')}>
                            <input type="checkbox" />
                            Remember me
                        </span>
                        <span onClick={handleShowForgotForm} className={cx('action-btn')}>
                            Forgot password
                        </span>
                    </div>
                    <Button className={cx('submit-btn')} primary large>
                        Login
                    </Button>
                </form>
                <div className={cx('login-other')}>
                    <GoogleLogo />
                    <FacebookLogo />
                </div>
                <span className={cx('text-link')}>
                    Do you have account?{' '}
                    <span onClick={handleShowRegisterForm} className={cx('action-btn')}>
                        Register
                    </span>
                </span>
            </div>
            <div className={cx('register-form')}>
                <h2>Register</h2>
                <Button className={cx('btn-close')} onClick={toggleModalLogin} circle leftIcon={<X size={20} />} />
                <form className={cx('form')}>
                    <label>Name</label>
                    <Input
                        type={'text'}
                        placeholder={'Tranw'}
                        classNameInput={cx('form-input')}
                        rightIcon={<User size={25} />}
                    />
                    <label>Email</label>
                    <Input
                        type={'email'}
                        placeholder={'example@gmail.com'}
                        classNameInput={cx('form-input')}
                        rightIcon={<EnvelopeSimple size={25} />}
                    />
                    <label>Password</label>
                    <Input
                        type={'password'}
                        placeholder={'password'}
                        classNameInput={cx('form-input')}
                        rightIcon={<Lock size={25} />}
                    />
                    <div className={cx('form-action')}>
                        <span className={cx('remember')}>
                            <input type="checkbox" />
                            Remember me
                        </span>
                        <span onClick={handleShowForgotForm} className={cx('action-btn')}>
                            Forgot password
                        </span>
                    </div>
                    <Button className={cx('submit-btn')} primary large>
                        Register
                    </Button>
                </form>
                <div className={cx('login-other')}>
                    <GoogleLogo />
                    <FacebookLogo />
                </div>
                <span className={cx('text-link')}>
                    Already have an account?{' '}
                    <span onClick={handleShowLoginForm} className={cx('action-btn')}>
                        Login
                    </span>
                </span>
            </div>
            <div className={cx('forgot-form')}>
                <h2>Forgot password</h2>
                <Button className={cx('btn-close')} onClick={toggleModalLogin} circle leftIcon={<X size={20} />} />
                <form className={cx('form')}>
                    <label>Email</label>
                    <Input
                        type={'email'}
                        placeholder={'example@gmail.com'}
                        classNameInput={cx('form-input')}
                        rightIcon={<EnvelopeSimple size={25} />}
                    />
                    <Button className={cx('submit-btn')} primary large>
                        Send
                    </Button>
                </form>
                <div className={cx('login-other')}>
                    <GoogleLogo />
                    <FacebookLogo />
                </div>
                <span className={cx('text-link')}>
                    Do you have account?{' '}
                    <span onClick={handleShowLoginForm} className={cx('action-btn')}>
                        Login
                    </span>
                </span>
            </div>
        </>
    );

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
                    <Link to={result.to} className={cx('ot-mobile-menu_item')} key={index}>
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
                        <Link to={result.to} className={cx('menu_item')} key={index}>
                            <h6>{result.title}</h6>
                        </Link>
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
                    <Button onClick={toggleModalLogin} circle leftIcon={<User size={20} className={cx('icon')} />} />
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
                    <Form />
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
