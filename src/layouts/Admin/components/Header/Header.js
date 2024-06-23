import { Airplane, BellRinging, BookBookmark, House, MapPin, UsersThree } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { NavLink, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './Header.module.scss';
import routes from '~/config/routes';
import { IoTicketOutline } from 'react-icons/io5';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FaRegBuilding } from 'react-icons/fa';
import { FaAmazonPay } from 'react-icons/fa6';
import Button from '~/components/Button';
import { logout } from '~/utils/httpRequest';
import { useAuth } from '~/hooks/useAuth';

const cx = classNames.bind(styles);

export default function Header() {
    const { removeData } = useAuth();
    const navigate = useNavigate();
    const MENU = [
        {
            title: 'Dashboard',
            icon: <House weight="bold" />,
            to: routes.admin,
        },
        {
            title: 'Order',
            icon: <FaAmazonPay />,
            to: routes.admin_order,
        },
        {
            title: 'Company',
            icon: <FaRegBuilding />,
            to: routes.admin_company,
        },
        {
            title: 'Account',
            icon: <UsersThree weight="bold" />,
            to: routes.admin_account,
        },
        {
            title: 'Destination',
            icon: <MapPin weight="bold" />,
            to: routes.admin_destination,
        },
        {
            title: 'Tour',
            icon: <Airplane weight="bold" />,
            to: routes.admin_tour,
        },
        {
            title: 'Deals',
            icon: <MdOutlineLocalOffer />,
            to: routes.admin_deals,
        },
        {
            title: 'Blog',
            icon: <BookBookmark weight="bold" />,
            to: routes.admin_blog,
        },
        {
            title: 'Contact',
            icon: <BellRinging weight="bold" />,
            to: routes.admin_contact,
        },
        {
            title: 'Ticket',
            icon: <IoTicketOutline />,
            to: routes.admin_ticket,
        },
    ];
    const handleLogout = async () => {
        try {
            await logout();
            await removeData();
            navigate(routes.home);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Image src={images.logo} width={'200px'} />
            <div className={cx('menu-list')}>
                {MENU.map((result, index) => (
                    <NavLink to={result.to} className={(nav) => cx('menu_item', { active: nav.isActive })} key={index}>
                        <span>{result.icon}</span>
                        <h6>{result.title}</h6>
                    </NavLink>
                ))}
                <Button primary large onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
