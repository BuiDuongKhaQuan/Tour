import { EnvelopeSimple, MapPin, Phone, User, X } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Store } from 'react-notifications-component';
import { useParams } from 'react-router-dom';
import AvatarCustom from '~/components/AvatarCustom/AvatarCustom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import { DATA_GENDER_SELECT, DATA_STATUS_USER_SELECT, notification, showNotifications } from '~/utils/constants';
import { findUserById, updateRoles, updateUser } from '~/utils/httpRequest';
import styles from './Profile.module.scss';

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
        roles: [],
        createdAt: '',
        avatar: '',
    });
    const [selectedOptionStatus, setSelectedOptionStatus] = useState(null);
    const [modalRolesIsOpen, setModalRolesIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const findSelectedOption = (gender) => {
        return DATA_GENDER_SELECT.items.find((item) => item.label.toLowerCase() === gender.toLowerCase());
    };
    const findSelectedOptionStatus = (statusValue) => {
        return DATA_STATUS_USER_SELECT.items.find((item) => item.value === statusValue);
    };

    useEffect(() => {
        getUserByID(id);
    }, [id]);

    useEffect(() => {
        setSelectedOptionStatus(findSelectedOptionStatus(user.status));
        setSelectedOption(user.gender !== null ? findSelectedOption(user.gender) : {});
        setSelectedRoles(user.roles);
    }, [user]);

    const getUserByID = async (id) => {
        try {
            const response = await findUserById(id);
            setUser(response.data);
            console.log('User', response.data);
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
            showNotifications({
                title: 'Update Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.log(error);
        }
    };
    const toggleModalRoles = () => {
        setModalRolesIsOpen(!modalRolesIsOpen);
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setSelectedRoles((prevSelectedRoles) => {
            if (checked) {
                return [...prevSelectedRoles, id];
            } else {
                return prevSelectedRoles.filter((roleId) => roleId !== id);
            }
        });
        console.log(selectedRoles);
    };

    const handleSaveRoles = async () => {
        try {
            const response = await updateRoles(id, selectedRoles);
            toggleModalRoles();
            showNotifications({ message: response.message });
        } catch (error) {
            console.error(error);
            showNotifications({
                title: 'Update Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <AvatarCustom width={250} height={250} src={user.avatar.url} stringAva={user.name} />
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
                    <Input
                        label={'Phone Number'}
                        classNameInput={cx('input')}
                        leftIcon={<Phone size={20} weight="bold" />}
                        placeholder={'Phone Number'}
                        type="number"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                <Modal
                    isOpen={modalRolesIsOpen}
                    onRequestClose={toggleModalRoles}
                    className={cx('modal')}
                    contentLabel="Example Modal"
                >
                    <div className={cx('modal-content')}>
                        <Button onClick={toggleModalRoles} circle className={cx('btnClose')}>
                            <X size={18} />
                        </Button>
                        <div className={cx('checkbox-wraper')}>
                            <input
                                type="checkbox"
                                id="user"
                                checked={selectedRoles.includes('user')}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="user">User</label>
                        </div>
                        <div className={cx('checkbox-wraper')}>
                            <input
                                type="checkbox"
                                id="moderator"
                                checked={selectedRoles.includes('moderator')}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="moderator">Moderator</label>
                        </div>
                        <div className={cx('checkbox-wraper')}>
                            <input
                                type="checkbox"
                                id="admin"
                                checked={selectedRoles.includes('admin')}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="admin">Admin</label>
                        </div>
                    </div>
                    <div className={cx('btnSave')}>
                        <Button onClick={handleSaveRoles} primary small type="button">
                            Update
                        </Button>
                    </div>
                </Modal>
                <div className={cx('input_list')}>
                    <Button primary large className={cx('btn')} type="submit">
                        Submit
                    </Button>
                    <Button primary large className={cx('btn')}>
                        Reset Password
                    </Button>
                    <Button primary large className={cx('btn')} type="button" onClick={toggleModalRoles}>
                        Show roles
                    </Button>
                </div>
            </form>
        </div>
    );
}
