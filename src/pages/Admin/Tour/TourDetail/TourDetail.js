import { AppBar, Tab, Tabs, useTheme } from '@mui/material';
import { AirplaneTakeoff, Calendar, CurrencyCircleDollar, MapPin, UsersThree } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import QuillEditor from '~/components/QuillEditor';
import Select from '~/components/Select';
import TabPanel from '~/components/TabPanel';
import routes from '~/config/routes';
import { DATA_STATUS_SELECT, formattedDate, showNotifications } from '~/utils/constants';
import {
    addImgTour,
    createTour,
    deleteImgTour,
    deleteTour,
    findDealsByExpiry,
    findTourById,
    getDeals,
    getDestinations,
    updateImgTour,
    updateTour,
} from '~/utils/httpRequest';
import styles from './TourDetail.module.scss';
import { MdOutlineLocalOffer } from 'react-icons/md';

const cx = classNames.bind(styles);

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TourDetail({ create }) {
    const theme = useTheme();
    const fileInputRefs = useRef([]);
    const fileInputAddRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [tour, setTour] = useState({
        name: '',
        date: '',
        rate: '',
        personQuantity: '',
        price: '',
        categoryId: 1,
        status: DATA_STATUS_SELECT.items[0].value,
        createdAt: new Date(),
        destination: '',
        information: '',
        images: [],
        dealId: null,
    });
    const [valuePanel, setValuePanel] = useState(0);
    const [destinationsSelect, setDestinationsSelect] = useState({
        id: 2,
        title: 'Destination',
        icon: <MapPin size={20} weight="bold" />,
        items: [],
    });
    const [dealsSelect, setDealsSelect] = useState({
        id: 2,
        title: 'Deals',
        icon: <MdOutlineLocalOffer size={20} />,
        items: [],
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDealsOption, setSelectedDealsOption] = useState(null);
    const findSelectedStatusOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };
    const [selectedStatusOption, setSelectedStatusOption] = useState(null);
    const findSelectedOption = (destinationID) => {
        return destinationsSelect.items.find((item) => item.value === destinationID);
    };
    const findSelecteDealsdOption = (dealsId) => {
        return dealsSelect.items.find((item) => item.value === dealsId);
    };
    useEffect(() => {
        if (!create) {
            getTourByID(id);
        }
        getAllDestination();
        getAllDeals();
    }, [id, create]);

    useEffect(() => {
        if (destinationsSelect.items.length > 0 && !create) {
            setSelectedOption(findSelectedOption(tour.destination.id));
        }
        if (dealsSelect.items.length > 0 && !create) {
            setSelectedDealsOption(findSelecteDealsdOption(tour.dealId));
        }
    }, [destinationsSelect, dealsSelect, create]);

    useEffect(() => {
        setSelectedStatusOption(findSelectedStatusOption(tour.status));
    }, [tour.status]);

    const getTourByID = async (id) => {
        try {
            const response = await findTourById(id);
            setTour(response.data);
        } catch (error) {
            console.error('Error fetching tour:', error);
        }
    };

    const getAllDestination = async () => {
        try {
            const response = await getDestinations();
            const items = response.data.map((destination) => ({
                value: destination.id,
                label: destination.name,
            }));
            setDestinationsSelect((prev) => {
                const existingItems = new Set(prev.items.map((item) => item.value));
                const newItems = items.filter((item) => !existingItems.has(item.value));
                return {
                    ...prev,
                    items: [...prev.items, ...newItems],
                };
            });
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    const getAllDeals = async () => {
        try {
            const response = await findDealsByExpiry();
            const items = response.data.map((deals) => ({
                value: deals.id,
                label: `${deals.offer}% (Quantity: ${deals.quantity})`,
            }));
            items.push({
                value: null,
                label: 'Không áp dụng deal',
            });
            setDealsSelect((prev) => {
                const existingItems = new Set(prev.items.map((item) => item.value));
                const newItems = items.filter((item) => !existingItems.has(item.value));
                return {
                    ...prev,
                    items: [...prev.items, ...newItems],
                };
            });
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    const handleDestinationChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setTour((prev) => ({
            ...prev,
            destinationId: selectedOption.value,
        }));
    };

    const handleStatusChange = (selectedOption) => {
        setSelectedStatusOption(selectedOption);
        setTour((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };
    const handleDealsChange = (selectedOption) => {
        setSelectedDealsOption(selectedOption);
        setTour((prev) => ({
            ...prev,
            dealId: selectedOption.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (create) {
                const data = new FormData();
                for (const key in tour) {
                    if (key !== 'images') {
                        data.append(key, tour[key]);
                    }
                }
                tour.images.forEach((img) => {
                    data.append('images', img.file);
                });

                const response = await createTour(data);
                navigate(routes.admin_tour);
                showNotifications({ message: response.message });
            } else {
                const response = await updateTour(id, tour);
                setTour(response.data);
                showNotifications({ message: response.message });
            }
        } catch (error) {
            showNotifications({
                title: 'Submit Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePanelChange = (event, newValue) => {
        setValuePanel(newValue);
    };

    const handleDeleteImg = async (imageId) => {
        setLoading(true);
        try {
            if (create) {
                const newImages = tour.images.filter((img) => img.id !== imageId);
                setTour({ ...tour, images: newImages });
            } else {
                const response = await deleteImgTour({ imageId, tourId: tour.id });
                setTour({ ...tour, images: response.data });
                showNotifications({ message: response.message });
            }
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    if (fileInputRefs.current.length !== tour.images.length) {
        fileInputRefs.current = Array(tour.images.length)
            .fill()
            .map((_, i) => fileInputRefs.current[i] || React.createRef());
    }
    const handleUpdateImg = async (imageId, file) => {
        setLoading(true);
        try {
            if (create) {
                const newImages = tour.images.map((img) =>
                    img.id === imageId ? { ...img, file, url: URL.createObjectURL(file) } : img,
                );
                setTour({ ...tour, images: newImages });
            } else {
                const response = await updateImgTour({ imageId, tourId: tour.id, image: file });
                setTour({ ...tour, images: response.data });
                showNotifications({ message: response.message });
            }
        } catch (error) {
            showNotifications({
                title: 'Update Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddImg = async (files) => {
        setLoading(true);
        try {
            if (create) {
                setTour((prevTour) => {
                    // Lấy id lớn nhất hiện tại
                    const maxId = prevTour.images.length > 0 ? Math.max(...prevTour.images.map((img) => img.id)) : 0;

                    // Tạo mảng newImages với id bắt đầu từ maxId + 1
                    const newImages = files.map((file, index) => ({
                        id: maxId + 1 + index,
                        file,
                        url: URL.createObjectURL(file),
                    }));

                    console.log(newImages);
                    // Cập nhật trạng thái tour với mảng images mới
                    return {
                        ...prevTour,
                        images: [...prevTour.images, ...newImages],
                    };
                });
            } else {
                const data = new FormData();
                files.forEach((file) => {
                    data.append('images', file);
                });
                const response = await addImgTour(tour.id, data);
                setTour({ ...tour, images: response.data });
                showNotifications({ message: response.message });
            }
        } catch (error) {
            showNotifications({
                title: 'Add Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteTour(id);
            navigate(routes.admin_tour);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.error(error);
        }
    };

    const handleFileUpdateChange = (event, imageId) => {
        const file = event.target.files[0];
        if (file) {
            console.log('idImage', imageId);
            handleUpdateImg(imageId, file);
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

    const triggerFileInput = (index) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].current.click();
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
                <a href={i} key={i}>
                    <Image
                        action={tour.images.length - 1 === i && tour.images.length < 10}
                        actionHover
                        onClickBtnLeft={() => triggerFileAddInput()}
                        iconBtnLeft={<FaRegSquarePlus size={25} />}
                        width={80}
                        height={80}
                        src={tour.images[i]?.url}
                        alt={'Tour Image'}
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
                            {tour.images.length > 1 ? (
                                <Slider {...settings}>
                                    {tour.images.map((img, index) => (
                                        <div key={index} className={cx('img-wraper')}>
                                            <div className={cx('img-content')}>
                                                <Image
                                                    action
                                                    onClickBtnLeft={() => handleDeleteImg(img.id)}
                                                    onClickBtnRight={() => triggerFileInput(index)}
                                                    width={'80%'}
                                                    height={'400px'}
                                                    src={img.url}
                                                    alt={'Tour Image'}
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={(event) => handleFileUpdateChange(event, img.id)}
                                                    ref={fileInputRefs.current[index]}
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
                                        onClickBtnRight={!create && (() => triggerFileInput(tour.images[0]?.url))}
                                        iconBtnLeft={<FaRegSquarePlus size={20} />}
                                        width={'80%'}
                                        height={'400px'}
                                        src={tour.images[0]?.url}
                                        alt={'Tour Image'}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(event) => handleFileUpdateChange(event, tour.images[0]?.id)}
                                        ref={fileInputRefs.current[0]}
                                    />
                                </div>
                            )}
                            {tour.images.length < 10 && (
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
                                    placeholder={'Person'}
                                    label={'Person'}
                                    value={tour.personQuantity}
                                    onChange={(e) => setTour({ ...tour, personQuantity: e.target.value })}
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
                                <Select
                                    data={dealsSelect}
                                    defaultValue={selectedDealsOption}
                                    onChange={handleDealsChange}
                                    placeholder={'Deals'}
                                    className={cx('select')}
                                    label={'Deals'}
                                    classNameSelect={cx('select-content')}
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    disabled={true}
                                    label={'Day create'}
                                    className={cx('input_wraper')}
                                    classNameInput={cx('input')}
                                    value={formattedDate(new Date(tour.createdAt))}
                                    placeholder={formattedDate(new Date(tour.createdAt))}
                                    type="text"
                                />
                                <Input
                                    disabled={true}
                                    label={'Day update'}
                                    className={cx('input_wraper')}
                                    classNameInput={cx('input')}
                                    value={formattedDate(new Date(tour.updatedAt))}
                                    placeholder={formattedDate(new Date(tour.updatedAt))}
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
                        {!create && (
                            <Button primary large className={cx('btn')} type="button" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
