import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { findCompanyById } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        try {
            const response = await findCompanyById();
            sessionStorage.setItem('company', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
