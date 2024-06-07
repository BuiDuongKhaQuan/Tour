import { useTheme } from '@emotion/react';
import { AppBar, Tab, Tabs } from '@mui/material';
import { Camera, EnvelopeSimple, MapPin, Phone, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import AvatarCustom from '~/components/AvartarCustom';
import Breadcumb from '~/components/Breadcumb';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import Select from '~/components/Select';
import { TourCardItem } from '~/components/SliderCard';
import routes from '~/config/routes';
import { DATA_GENDER_SELECT, notification } from '~/utils/constants';
import { findTourById, getCompletedTour, getWattingTour, logout, updateUser, uploadAvatar } from '~/utils/httpRequest';
import styles from './Profile.module.scss';
import TabPanel from '~/components/TabPanel';
const cx = classNames.bind(styles);

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Profile() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [phone, setPhone] = useState(user ? user.phone : '');
    const [address, setAddress] = useState(user ? user.address : '');
    const [avatar, setAvatar] = useState(user ? user.avatar : '');
    const [gender, setGender] = useState(user ? user.gender : '');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [wattingTours, setWattingTours] = useState([]);
    const [completedTours, setCompletedTours] = useState([]);
    const findSelectedOption = (gender) => {
        return DATA_GENDER_SELECT.items.find((item) => item.label.toLowerCase() === gender.toLowerCase());
    };
    const [selectedOption, setSelectedOption] = useState(findSelectedOption(gender));

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleUpload(file);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const newData = {
                name,
                phone,
                address,
                gender: selectedOption.label,
            };
            const newUser = await updateUser(user.id, newData);
            sessionStorage.setItem('user', JSON.stringify(newUser));
            setAvatar(user.avatar);
            Store.addNotification({
                ...notification,
                message: 'Update successful',
            });
        } catch (error) {
            console.log('Error', error);
            Store.addNotification({
                ...notification,
                title: 'Error',
                type: 'danger',
                message: 'Update successful',
            });
        }
    };

    const handleUpload = async (avatarFile) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            const response = await uploadAvatar(formData);
            const newUser = {
                ...user,
                avatar: response.avatar,
            };
            sessionStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            sessionStorage.removeItem('user');
            navigate(routes.home);
        } catch (error) {}
    };

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const watting = await getWattingTour();
                const completed = await getCompletedTour();
                const toursWattingPromises = watting.map(async (booking) => {
                    const response = await findTourById(booking.id_tour);
                    return response.data; // Trả về đối tượng tour
                });
                const toursWatting = await Promise.all(toursWattingPromises);

                const toursCompletedPromises = completed.map(async (booking) => {
                    const response = await findTourById(booking.id_tour);
                    return response.data; // Trả về đối tượng tour
                });
                const toursCompleted = await Promise.all(toursCompletedPromises);

                setWattingTours(toursWatting);
                setCompletedTours(toursCompleted);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDestinations();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <Breadcumb />
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar-wrap')}>
                            <AvatarCustom
                                alt={'Avatar'}
                                width={300}
                                height={300}
                                src={user.avatar}
                                stringAva={user.name}
                            />
                            <span className={cx('camera-icon')} onClick={handleIconClick}>
                                <Camera weight="bold" />
                            </span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <h2>{name}</h2>
                    </div>
                    <div className={cx('tabs')}>
                        <AppBar position="static" className={cx('app-bar')}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Information" {...a11yProps(0)} />
                                <Tab label="Watting tour" {...a11yProps(1)} />
                                <Tab label="Booked tour" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className={cx('information')}>
                                <Input
                                    placeholder={'Your Name'}
                                    value={user.name && name}
                                    onChange={(event) => setName(event.target.value)}
                                    rightIcon={<User weight="bold" />}
                                />
                                <Input
                                    placeholder={'Your Email'}
                                    value={user.email && email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    rightIcon={<EnvelopeSimple weight="bold" />}
                                    type={'email'}
                                    disabled
                                />
                                <Input
                                    placeholder={'Phone Number'}
                                    value={user.phone && phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    rightIcon={<Phone weight="bold" />}
                                    type={'number'}
                                />
                                <Input
                                    placeholder={'Address'}
                                    value={user.address && address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rightIcon={<MapPin weight="bold" />}
                                    type={'text'}
                                />
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    className={cx('infor-select')}
                                    data={DATA_GENDER_SELECT}
                                />
                                <Button primary large className={cx('btn-submit')} onClick={handleUpdate}>
                                    UPDATE
                                </Button>
                                <Button primary large className={cx('btn-submit')} onClick={handleLogout}>
                                    LOGOUT
                                </Button>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className={cx('list')}>
                                {wattingTours &&
                                    wattingTours.map((reslut, index) => (
                                        <TourCardItem profileTour data={reslut} key={index} />
                                    ))}
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <div className={cx('list')}>
                                {completedTours &&
                                    completedTours.map((reslut, index) => (
                                        <TourCardItem profileTour data={reslut} key={index} />
                                    ))}
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    );
}
