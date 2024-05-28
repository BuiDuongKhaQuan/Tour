import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import Breadcumb from '~/components/Breadcumb';
import Input from '~/components/Input';
import { Camera, EnvelopeSimple, GenderIntersex, MapPin, Phone, User } from '@phosphor-icons/react';
import Select from '~/components/Select';
import Button from '~/components/Button';
import { TourCardItem } from '~/components/SliderCard';
import { findTourById, getCompletedTour, getWattingTour, logout, updateUser, uploadAvatar } from '~/utils/httpRequest';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import Loading from '~/components/Loading';
import AvatarCustom from '~/components/AvartarCustom';

const cx = classNames.bind(styles);
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Profile() {
    const DATA_TOURS = [
        {
            name: 'Bali One Life Adventure',
            img: images.tour_1_1,
            position: 'Lasvegus, USA',
            persion: '52+',
            day: '07',
            price: '350',
            review: 5,
        },
        {
            name: 'Places To Travel November',
            img: images.tour_1_2,
            position: ' Barcelona, Spain',
            persion: '100+',
            day: '13',
            price: '350',
            review: 5,
        },
        {
            name: 'Brooklyn Beach Resort Tour',
            img: images.tour_1_3,
            position: ' Madrid, Spain',
            persion: '50+',
            day: '10',
            price: '650',
            review: 5,
        },
        {
            name: 'Brooklyn Christmas Lights',
            img: images.tour_1_4,
            position: ' Lasvegus, USA',
            persion: '312+',
            day: '15',
            price: '450',
            review: 5,
        },
        {
            name: 'Brooklyn Christmas Lights',
            img: images.tour_1_4,
            position: ' Lasvegus, USA',
            persion: '312+',
            day: '15',
            price: '450',
            review: 5,
        },
        {
            name: 'Brooklyn Christmas Lights',
            img: images.tour_1_4,
            position: ' Lasvegus, USA',
            persion: '312+',
            day: '15',
            price: '450',
            review: 5,
        },
        {
            name: 'Brooklyn Christmas Lights',
            img: images.tour_1_4,
            position: ' Lasvegus, USA',
            persion: '312+',
            day: '15',
            price: '450',
            review: 5,
        },
        {
            name: 'Brooklyn Christmas Lights',
            img: images.tour_1_4,
            position: ' Lasvegus, USA',
            persion: '312+',
            day: '15',
            price: '450',
            review: 5,
        },
    ];
    const DATA_SELECT = {
        id: 1,
        title: 'Gender',
        icon: <GenderIntersex weight="bold" />,
        items: [
            {
                value: '1',
                label: 'Male',
            },
            {
                value: '2',
                label: 'Female',
            },
        ],
    };

    const theme = useTheme();
    const navigation = useNavigate();
    const [value, setValue] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [phone, setPhone] = useState(user ? user.phone : '');
    const [address, setAddress] = useState(user ? user.address : '');
    const [avatar, setAvatar] = useState(user ? user.avatar : '');
    const [gender, setGender] = useState(user ? user.gender : '');
    const [selectedOption, setSelectedOption] = useState(null);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [wattingTours, setWattingTours] = useState([]);
    const [completedTours, setCompletedTours] = useState([]);

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
            localStorage.setItem('user', JSON.stringify(newUser));
            setAvatar(user.avatar);
        } catch (error) {
            console.log('Error', error);
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
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('user');
            navigation(routes.home);
        } catch (error) {}
    };

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const watting = await getWattingTour();
                const completed = await getCompletedTour();
                const toursWattingPromises = watting.map(async (booking) => {
                    const response = await findTourById(booking.id_tour);
                    return response.tour; // Trả về đối tượng tour
                });
                const toursWatting = await Promise.all(toursWattingPromises);

                const toursCompletedPromises = completed.map(async (booking) => {
                    const response = await findTourById(booking.id_tour);
                    return response.tour; // Trả về đối tượng tour
                });
                const toursCompleted = await Promise.all(toursCompletedPromises);

                setWattingTours(toursWatting);
                console.log('Completed', toursCompleted);
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
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                    className={cx('infor-select')}
                                    placeholder={gender ? gender : 'Gender'}
                                    data={DATA_SELECT}
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
