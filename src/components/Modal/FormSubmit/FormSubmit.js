import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormSubmit.module.scss';
import { login, register, verify } from '~/utils/httpRequest';
import { EnvelopeSimple, FacebookLogo, GoogleLogo, Lock, User, X } from '@phosphor-icons/react';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

export default function FormSubmit({ toggleModalLogin, setCloseModal }) {
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();
    const [error, setError] = useState(false);

    const handleShowLoginForm = () => {
        setShowLogin(true);
        setShowRegister(false);
        setShowForgot(false);
        setShowVerify(false);
    };
    const handleShowRegisterForm = () => {
        setShowLogin(false);
        setShowRegister(true);
        setShowForgot(false);
        setShowVerify(false);
    };
    const handleShowForgotForm = () => {
        setShowLogin(false);
        setShowRegister(false);
        setShowForgot(true);
        setShowVerify(false);
    };
    const handleShowVerify = () => {
        setShowLogin(false);
        setShowRegister(false);
        setShowForgot(false);
        setShowVerify(true);
    };
    const handleRigister = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await register(name, email, password);
            sessionStorage.setItem('email', email);
            handleShowVerify();
        } catch (error) {
            setError(true);
            setMessage(error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOtp = async (event) => {
        event.preventDefault();
        const email = sessionStorage.getItem('email');
        setIsLoading(true);
        try {
            await verify(email, otp);
            sessionStorage.removeItem('email');
            handleShowLoginForm();
            console.log('Đăng ký thành công!');
        } catch (error) {
            setError(true);
            setMessage(error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(email, password);
        try {
            const response = await login(email, password);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            setCloseModal();
        } catch (error) {
            setError(true);
            setMessage(error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading className={cx('loading')} />}
            {showLogin && (
                <div className={cx('login-form')}>
                    <h2>Login</h2>
                    <Button className={cx('btn-close')} onClick={toggleModalLogin} circle leftIcon={<X size={20} />} />
                    <form className={cx('form')}>
                        <label>Email</label>
                        <Input
                            type={'email'}
                            placeholder={'example@gmail.com'}
                            classNameInput={cx('form-input')}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            rightIcon={<EnvelopeSimple size={25} />}
                        />
                        <label>Password</label>
                        <Input
                            type={'password'}
                            placeholder={'password'}
                            classNameInput={cx('form-input')}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
                        {message && <span className={cx('success', error && 'error')}>{message}</span>}
                        <Button className={cx('submit-btn')} primary large onClick={handleLogin}>
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
            )}
            {showRegister && (
                <div className={cx('register-form')}>
                    <h2>Register</h2>
                    <Button className={cx('btn-close')} onClick={toggleModalLogin} circle leftIcon={<X size={20} />} />
                    <form className={cx('form')}>
                        <label>Name</label>
                        <Input
                            type={'text'}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={'Quan'}
                            classNameInput={cx('form-input')}
                            rightIcon={<User size={25} />}
                        />
                        <label>Email</label>
                        <Input
                            type={'email'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={'example@gmail.com'}
                            classNameInput={cx('form-input')}
                            rightIcon={<EnvelopeSimple size={25} />}
                        />
                        <label>Password</label>
                        <Input
                            type={'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
                        {message && <span className={cx('error', 'success')}>{message}</span>}
                        <Button className={cx('submit-btn')} primary large onClick={handleRigister}>
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
            )}
            {showForgot && (
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
                        {message && <span className={cx('error', 'success')}>{message}</span>}
                        <Button className={cx('submit-btn')} primary large type="button">
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
            )}
            {showVerify && (
                <div className={cx('forgot-form')}>
                    <h2>Enter OTP</h2>
                    <Button className={cx('btn-close')} onClick={toggleModalLogin} circle leftIcon={<X size={20} />} />
                    <form className={cx('form')}>
                        <label>Otp</label>
                        <Input
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            type={'number'}
                            placeholder={'xxxxxx'}
                            classNameInput={cx('form-input')}
                            rightIcon={<EnvelopeSimple size={25} />}
                        />
                        {message && <span className={cx('error', 'success')}>{message}</span>}
                        <Button className={cx('submit-btn')} primary large onClick={handleSendOtp}>
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
            )}
        </>
    );
}
