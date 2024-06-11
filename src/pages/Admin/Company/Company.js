import { EnvelopeSimple, MapPin, Phone, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Store } from 'react-notifications-component';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { notification, showNotifications } from '~/utils/constants';
import { findCompanyById, updateCompany } from '~/utils/httpRequest';
import styles from './Company.module.scss';
import AvatarCustom from '~/components/AvatarCustom';
import Image from '~/components/Image';
import { FaRegSquarePlus } from 'react-icons/fa6';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

export default function Company() {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState({
        logo: '',
        logan: '',
        phone: '',
        email: '',
        address: '',
    });
    const [logoReview, setLogoReview] = useState('');

    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        try {
            const response = await findCompanyById();
            setCompany(response.data);
            setLogoReview(response.data.logo);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompany((prev) => ({
                ...prev,
                logo: file,
            }));
            setLogoReview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await updateCompany(company);
            setCompany(response.data);
            Store.addNotification({
                ...notification,
                message: 'Company information updated successfully',
            });
        } catch (error) {
            showNotifications({
                title: 'Update Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <Image
                action
                width={250}
                height={250}
                onClickBtnLeft={() => triggerFileInput()}
                iconBtnLeft={<FaRegSquarePlus size={20} />}
                src={logoReview}
                alt={'Travel Logo'}
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleLogoChange}
                ref={fileInputRef}
            />

            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>Information</h2>
                <div className={cx('input_list')}>
                    <Input
                        label={'Phone Number'}
                        classNameInput={cx('input')}
                        leftIcon={<Phone size={20} weight="bold" />}
                        placeholder={'Phone Number'}
                        type="text"
                        value={company.phone}
                        onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                    />
                    <Input
                        label={'Email'}
                        classNameInput={cx('input')}
                        leftIcon={<EnvelopeSimple size={20} weight="bold" />}
                        placeholder={'Email Address'}
                        type="email"
                        value={company.email}
                        onChange={(e) => setCompany({ ...company, email: e.target.value })}
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Address'}
                        classNameInput={cx('input')}
                        leftIcon={<MapPin size={20} weight="bold" />}
                        placeholder={'Address'}
                        type="text"
                        value={company.address}
                        onChange={(e) => setCompany({ ...company, address: e.target.value })}
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Logan'}
                        classNameInput={cx('input')}
                        leftIcon={<User size={20} weight="bold" />}
                        placeholder={'Logan'}
                        value={company.logan}
                        onChange={(e) => setCompany({ ...company, logan: e.target.value })}
                    />
                </div>
                <div className={cx('input_list')}>
                    <Button primary large className={cx('btn')} type="submit">
                        update
                    </Button>
                </div>
            </form>
        </div>
    );
}
