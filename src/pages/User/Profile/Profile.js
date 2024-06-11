import { useTheme } from '@emotion/react';
import { AppBar, Tab, Tabs } from '@mui/material';
import { Camera, EnvelopeSimple, MapPin, Phone, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarCustom from '~/components/AvatarCustom';
import Breadcumb from '~/components/Breadcumb';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import Select from '~/components/Select';
import { TourCardItem } from '~/components/SliderCard';
import TabPanel from '~/components/TabPanel';
import routes from '~/config/routes';
import { DATA_GENDER_SELECT, showNotifications } from '~/utils/constants';
import { findTourById, getCompletedTour, getWattingTour, logout, updateUser } from '~/utils/httpRequest';
import styles from './Profile.module.scss';
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
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        avatar: user?.avatar,
        gender: user?.gender,
    });
    const [loading, setLoading] = useState(false);
    const [wattingTours, setWattingTours] = useState([]);
    const [completedTours, setCompletedTours] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');

    const findSelectedOption = (gender) => {
        return DATA_GENDER_SELECT.items.find((item) => item.label.toLowerCase() === gender?.toLowerCase());
    };
    const [selectedOption, setSelectedOption] = useState(findSelectedOption(user?.gender));

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                avatar: file,
            }));
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const newData = {
                ...formData,
                gender: selectedOption.label,
            };
            const response = await updateUser(user.id, newData);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            showNotifications({
                message: response.message,
            });
        } catch (error) {
            console.log('Error', error);
            showNotifications({
                title: 'Error',
                type: 'danger',
                message: 'Update failed',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            sessionStorage.removeItem('user');
            navigate(routes.home);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const watting = await getWattingTour();
                const completed = await getCompletedTour();
                const toursWattingPromises = watting.map(async (booking) => {
                    const response = await findTourById(booking.id_tour);
                    return response.data;
                });
                const toursWatting = await Promise.all(toursWattingPromises);

                const toursCompletedPromises = completed.map(async (booking) => {
                    const response = await findTourById(booking.id_tour);
                    return response.data;
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

    const handleFormChange = (field) => (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: event.target.value,
        }));
    };

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
                                src={avatarPreview}
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
                        <h2>{formData.name}</h2>
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
                                <Tab label="Waiting tour" {...a11yProps(1)} />
                                <Tab label="Booked tour" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className={cx('information')}>
                                <Input
                                    placeholder={'Your Name'}
                                    value={formData.name}
                                    onChange={handleFormChange('name')}
                                    rightIcon={<User weight="bold" />}
                                />
                                <Input
                                    placeholder={'Your Email'}
                                    value={formData.email}
                                    onChange={handleFormChange('email')}
                                    rightIcon={<EnvelopeSimple weight="bold" />}
                                    type={'email'}
                                    disabled
                                />
                                <Input
                                    placeholder={'Phone Number'}
                                    value={formData.phone}
                                    onChange={handleFormChange('phone')}
                                    rightIcon={<Phone weight="bold" />}
                                    type={'number'}
                                />
                                <Input
                                    placeholder={'Address'}
                                    value={formData.address}
                                    onChange={handleFormChange('address')}
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
                                    wattingTours.map((result, index) => (
                                        <TourCardItem profileTour data={result} key={index} />
                                    ))}
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <div className={cx('list')}>
                                {completedTours &&
                                    completedTours.map((result, index) => (
                                        <TourCardItem profileTour data={result} key={index} />
                                    ))}
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    );
}
