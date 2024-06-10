import { EnvelopeSimple, MapPin, Phone, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AvatarCustom from '~/components/AvartarCustom/AvatarCustom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import { DATA_GENDER_SELECT, DATA_ROLE_SELECT, DATA_STATUS_USER_SELECT } from '~/utils/constants';
import styles from './Profile.module.scss';
import { findUserById, updateUser } from '~/utils/httpRequest';
import { Store } from 'react-notifications-component';
import { notification } from '~/utils/constants';

const cx = classNames.bind(styles);

export default function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        status: '',
        role: '',
        create_at: '',
        avatar: '',
    });
    const [selectedOptionStatus, setSelectedOptionStatus] = useState(null);
    const [selectedOptionRole, setSelectedOptionRole] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const findSelectedOption = (gender) => {
        return DATA_GENDER_SELECT.items.find((item) => item.label.toLowerCase() === gender.toLowerCase());
    };
    const findSelectedOptionStatus = (statusValue) => {
        return DATA_STATUS_USER_SELECT.items.find((item) => item.value === statusValue);
    };
    const findSelectedOptionRole = (statusValue) => {
        return DATA_ROLE_SELECT.items.find((item) => item.value === statusValue);
    };
    useEffect(() => {
        getUserByID(id);
    }, [id]);
    useEffect(() => {
        setSelectedOptionStatus(findSelectedOptionStatus(user.status));
        setSelectedOptionRole(findSelectedOptionRole(user.role));
        setSelectedOption(user.gender !== null ? findSelectedOption(user.gender) : {});
    }, [user]);

    const getUserByID = async (id) => {
        try {
            const response = await findUserById(id);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusChange = (selectedOption) => {
        setSelectedOptionStatus(selectedOption);
        setUser((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };
    const handleRoleChange = (selectedOption) => {
        setSelectedOptionRole(selectedOption);
        setUser((prev) => ({
            ...prev,
            role: selectedOption.value,
        }));
    };
    const handleGenderChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setUser((prev) => ({
            ...prev,
            gender: selectedOption.label,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(user.id, user);
            setUser(response.data);
            Store.addNotification({
                ...notification,
                message: 'Update user successfully',
            });
        } catch (error) {
            Store.addNotification({
                ...notification,
                message: 'Network error, please try again later',
                type: 'danger',
            });
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <AvatarCustom width={250} height={250} src={user.avatar} stringAva={user.name} />
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>Information</h2>
                <div className={cx('input_list')}>
                    <Input
                        label={'Name'}
                        classNameInput={cx('input')}
                        leftIcon={<User size={20} weight="bold" />}
                        placeholder={'Your Name'}
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <Input
                        label={'Email'}
                        disabled={true}
                        classNameInput={cx('input')}
                        leftIcon={<EnvelopeSimple size={20} weight="bold" />}
                        placeholder={'Email Address'}
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Phone Number'}
                        classNameInput={cx('input')}
                        className={cx('input_wraper')}
                        leftIcon={<Phone size={20} weight="bold" />}
                        placeholder={'Phone Number'}
                        type="number"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                    {selectedOption && (
                        <Select
                            label={'Gender'}
                            defaultValue={selectedOption}
                            onChange={handleGenderChange}
                            data={DATA_GENDER_SELECT}
                            className={cx('select')}
                            classNameSelect={cx('select-content')}
                        />
                    )}
                </div>
                <div className={cx('input_list')}>
                    {selectedOptionStatus && (
                        <Select
                            label={'Status'}
                            defaultValue={selectedOptionStatus}
                            onChange={handleStatusChange}
                            data={DATA_STATUS_USER_SELECT}
                            className={cx('select')}
                            classNameSelect={cx('select-content')}
                        />
                    )}
                    {selectedOptionRole && (
                        <Select
                            label={'Role'}
                            defaultValue={selectedOptionRole}
                            onChange={handleRoleChange}
                            data={DATA_ROLE_SELECT}
                            className={cx('select')}
                            classNameSelect={cx('select-content')}
                        />
                    )}
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Address'}
                        classNameInput={cx('input')}
                        leftIcon={<MapPin size={20} weight="bold" />}
                        placeholder={'Address'}
                        type="text"
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                </div>
                <div className={cx('input_list')}>
                    <Button primary large className={cx('btn')} type="submit">
                        Submit
                    </Button>
                    <Button primary large className={cx('btn')}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </div>
    );
}
