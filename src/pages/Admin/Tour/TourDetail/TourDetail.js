import { AppBar, Tab, Tabs, useTheme } from '@mui/material';
import { AirplaneTakeoff, Calendar, CurrencyCircleDollar, MapPin, UsersThree } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import QuillEditor from '~/components/QuillEditor';
import Select from '~/components/Select';
import TabPanel from '~/components/TabPanel';
import { DATA_STATUS_SELECT, formattedDate, showNotifications } from '~/utils/constants';
import {
    addImgTour,
    deleteImgTour,
    findTourById,
    getDestinations,
    updateImgTour,
    updateTour,
} from '~/utils/httpRequest';
import styles from './TourDetail.module.scss';

const cx = classNames.bind(styles);

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TourDetail() {
    const theme = useTheme();
    const fileInputRef = useRef(null);
    const fileInputAddRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [tour, setTour] = useState({
        name: '',
        date: '',
        rate: '',
        person_quantity: '',
        price: '',
        status: '',
        create_at: '',
        destination_id: '',
        information: '',
        imgs: [],
    });
    const [valuePanel, setValuePanel] = useState(0);
    const [destinationsSelect, setDestinationsSelect] = useState({
        id: 2,
        title: 'Adult',
        icon: <MapPin size={20} weight="bold" />,
        items: [],
    });
    const [selectedOption, setSelectedOption] = useState(null);

    const findSelectedStatusOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };
    const [selectedStatusOption, setSelectedStatusOption] = useState(null);
    const findSelectedOption = (destinationID) => {
        return destinationsSelect.items.find((item) => item.value === destinationID);
    };
    useEffect(() => {
        getTourByID(id);
        getAllDestination();
    }, [id]);

    useEffect(() => {
        if (destinationsSelect.items.length > 0) {
            setSelectedOption(findSelectedOption(tour.destination_id));
        }
    }, [destinationsSelect]);

    useEffect(() => {
        setSelectedStatusOption(findSelectedStatusOption(tour.status));
    }, [tour.status]);

    const getTourByID = async (id) => {
        try {
            const response = await findTourById(id);
            setTour(response.data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    const getAllDestination = async () => {
        try {
            const response = await getDestinations();
            const items = response.data.map((destination) => ({
                value: destination.id,
                label: destination.name,
            }));
            setDestinationsSelect((prev) => ({
                ...prev,
                items: [...(Array.isArray(prev.items) ? prev.items : []), ...items],
            }));
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };
    const handleDestinationChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setTour((prev) => ({
            ...prev,
            destination_id: selectedOption.value,
        }));
    };
    const handleStatusChange = (selectedOption) => {
        setSelectedStatusOption(selectedOption);
        setTour((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await updateTour(id, tour);
            setTour(response.data);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Submit Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handlePanelChange = (event, newValue) => {
        setValuePanel(newValue);
    };
    const handleDeleteImg = async (imgLink) => {
        setLoading(true);
        try {
            const response = await deleteImgTour({ imgLink, tour_id: tour.id });
            setTour({ ...tour, imgs: response.data });
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateImg = async (imgLink, file) => {
        setLoading(true);
        try {
            const response = await updateImgTour({ imgLink, tour_id: tour.id, image: file });
            setTour({ ...tour, imgs: response.data });
            showNotifications({ message: response.message });
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

    const handleAddImg = async (files) => {
        setLoading(true);
        try {
            const data = new FormData();
            files.forEach((file) => {
                data.append('image', file);
            });
            const response = await addImgTour(tour.id, data);
            console.log(response);
            setTour({ ...tour, imgs: response.data });
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Add Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleFileUpdateChange = (event, img) => {
        const file = event.target.files[0];
        if (file) {
            handleUpdateImg(img, file);
        }
    };
    const handleFileAddChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            if (files.length < 6) {
                handleAddImg(files);
            } else {
                showNotifications({
                    title: 'Error adding',
                    type: 'danger',
                    message: 'The number of files selected must be less than 6!',
                });
            }
        }
    };
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const triggerFileAddInput = () => {
        if (fileInputAddRef.current) {
            fileInputAddRef.current.click();
        }
    };
    const settings = {
        customPaging: function (i) {
            return (
                <a href={i}>
                    <Image
                        action={tour.imgs.length - 1 === i && tour.imgs.length < 10}
                        actionHover
                        onClickBtnLeft={() => triggerFileAddInput()}
                        iconBtnLeft={<FaRegSquarePlus size={25} />}
                        width={80}
                        height={80}
                        src={`${tour.imgs[i]}/abstract0${i + 1}.jpg`}
                        alt={'avatar'}
                    />
                </a>
            );
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('tabs')}>
                    <AppBar position="static" className={cx('app-bar')}>
                        <Tabs
                            value={valuePanel}
                            onChange={handlePanelChange}
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Image" {...a11yProps(0)} />
                            <Tab label="Information" {...a11yProps(1)} />
                            <Tab label="Detail" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={valuePanel} index={0} dir={theme.direction} style={{ marginBottom: '70px' }}>
                        <div className={cx('slider-container')}>
                            {tour.imgs.length > 1 ? (
                                <Slider {...settings}>
                                    {tour.imgs.map((img, index) => (
                                        <div key={index} className={cx('img-wraper')}>
                                            <div className={cx('img-content')}>
                                                <Image
                                                    action
                                                    onClickBtnLeft={() => handleDeleteImg(img)}
                                                    onClickBtnRight={() => triggerFileInput()}
                                                    width={'80%'}
                                                    height={'400px'}
                                                    src={img}
                                                    alt={'avatar'}
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={(event) => handleFileUpdateChange(event, img)}
                                                    ref={fileInputRef}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className={cx('img-content')}>
                                    <Image
                                        action
                                        onClickBtnLeft={() => triggerFileAddInput()}
                                        onClickBtnRight={() => triggerFileInput(tour.imgs[0])}
                                        iconBtnLeft={<FaRegSquarePlus size={20} />}
                                        width={'80%'}
                                        height={'400px'}
                                        src={tour.imgs[0]}
                                        alt={'avatar'}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(event) => handleFileUpdateChange(event)}
                                        ref={fileInputRef}
                                    />
                                </div>
                            )}
                            {tour.imgs.length < 10 && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={(event) => handleFileAddChange(event)}
                                    ref={fileInputAddRef}
                                />
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel value={valuePanel} index={1} dir={theme.direction}>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    classNameInput={cx('input')}
                                    leftIcon={<AirplaneTakeoff size={20} weight="bold" />}
                                    placeholder={'Tour Name'}
                                    label={'Name'}
                                    value={tour.name}
                                    onChange={(e) => setTour({ ...tour, name: e.target.value })}
                                    type="text"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={'Day'}
                                    leftIcon={<Calendar size={20} weight="bold" />}
                                    label={'Day'}
                                    value={tour.date}
                                    onChange={(e) => setTour({ ...tour, date: e.target.value })}
                                    type="number"
                                />
                                <Select
                                    data={destinationsSelect}
                                    defaultValue={selectedOption}
                                    onChange={handleDestinationChange}
                                    placeholder={'Destination'}
                                    className={cx('select')}
                                    label={'Destination'}
                                    classNameSelect={cx('select-content')}
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    classNameInput={cx('input')}
                                    leftIcon={<UsersThree size={20} weight="bold" />}
                                    placeholder={'Persion'}
                                    label={'Persion'}
                                    value={tour.person_quantity}
                                    onChange={(e) => setTour({ ...tour, person_quantity: e.target.value })}
                                />
                                <Input
                                    classNameInput={cx('input')}
                                    leftIcon={<CurrencyCircleDollar size={20} weight="bold" />}
                                    placeholder={'Price'}
                                    label={'Price'}
                                    value={tour.price}
                                    onChange={(e) => setTour({ ...tour, price: e.target.value })}
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Select
                                    data={DATA_STATUS_SELECT}
                                    defaultValue={selectedStatusOption}
                                    onChange={handleStatusChange}
                                    placeholder={'Status'}
                                    className={cx('select')}
                                    label={'Status'}
                                    classNameSelect={cx('select-content')}
                                />
                                <Input
                                    disabled={true}
                                    label={'Day create'}
                                    className={cx('input_wraper')}
                                    classNameInput={cx('input')}
                                    placeholder={formattedDate(new Date(tour.create_at))}
                                    type="text"
                                />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={valuePanel} index={2} dir={theme.direction}>
                        <div className={cx('edit')}>
                            <QuillEditor
                                value={tour.information}
                                setValue={(content) => setTour({ ...tour, information: content })}
                            />
                        </div>
                    </TabPanel>
                    <div className={cx('input_list')}>
                        <Button primary large className={cx('btn')} type="submit">
                            Submit
                        </Button>

                        <Button primary large className={cx('btn')}>
                            Delete
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
