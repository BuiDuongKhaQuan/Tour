import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { findCompanyById } from '~/utils/httpRequest';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import { Home } from '~/pages/User';
import Breadcumb from '~/components/Breadcumb';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        try {
            const response = await findCompanyById();
            localStorage.setItem('company', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children.type !== Home && <Breadcumb />}
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
