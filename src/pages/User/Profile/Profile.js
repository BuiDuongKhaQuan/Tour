import React from 'react';
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
    const user = {
        name: 'Kha Quan Bui',
        phone: '0328216787',
        email: 'buiduongkhaquan@gmail.com',
        address: '123 Main St',
        booked_tour: DATA_TOURS,
        watting_tour: DATA_TOURS,
    };
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('wrapper')}>
            <Breadcumb />
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar-wrap')}>
                            <Image circle src={images.ceo} alt={'Avatar'} />
                            <span className={cx('camera-icon')}>
                                <Camera weight="bold" />
                            </span>
                        </div>
                        <h2>{user.name}</h2>
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
                                <Input placeholder={'Your Name'} rightIcon={<User weight="bold" />} />
                                <Input
                                    placeholder={'Your Email'}
                                    rightIcon={<EnvelopeSimple weight="bold" />}
                                    type={'email'}
                                />
                                <Input
                                    placeholder={'Phone Number'}
                                    rightIcon={<Phone weight="bold" />}
                                    type={'number'}
                                />
                                <Input placeholder={'Address'} rightIcon={<MapPin weight="bold" />} type={'text'} />
                                <Select className={cx('infor-select')} placeholder={'Gender'} data={DATA_SELECT} />
                                <Button primary large className={cx('btn-submit')}>
                                    SUBMIT
                                </Button>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className={cx('list')}>
                                {user.watting_tour.map((reslut, index) => (
                                    <TourCardItem data={reslut} key={index} />
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <div className={cx('list')}>
                                {user.booked_tour.map((reslut, index) => (
                                    <TourCardItem data={reslut} key={index} />
                                ))}
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    );
}
