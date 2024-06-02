import { AirplaneTakeoff, Calendar, Camera, CurrencyCircleDollar, MapPin, UsersThree } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Input from '~/components/Input';
import QuillEditor from '~/components/QuillEditor';
import styles from './TourDetail.module.scss';
import { getDestinations, updateTour } from '~/utils/httpRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from '~/components/Select';
const cx = classNames.bind(styles);

export default function TourDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [tour, setTour] = useState(location.state);
    const [value, setValue] = useState(tour.information);
    const [destinationsSelect, setDestinationsSelect] = useState({
        id: 2,
        title: 'Adult',
        icon: <MapPin size={20} weight="bold" />,
        items: [],
    });
    const [selectedOption, setSelectedOption] = useState({});
    const [formData, setFormData] = useState({
        name: tour.name,
        date: tour.date,
        rate: tour.rate,
        person_quantity: tour.person_quantity,
        price: tour.price,
        status: tour.status,
        create_at: tour.create_at,
        destination_id: tour.destination_id,
        information: tour.information,
    });

    const findSelectedOption = (destinationID) => {
        return destinationsSelect.items.find((item) => item.value === destinationID);
    };
    useEffect(() => {
        const getData = async () => {
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
        getData();
    }, []);

    useEffect(() => {
        if (destinationsSelect.items.length > 0) {
            setSelectedOption(findSelectedOption(tour.destination_id));
        }
    }, [destinationsSelect]);

    const handleQuillEditorChange = (content) => {
        setValue(content);
        setFormData((prev) => ({
            ...prev,
            information: content,
        }));
    };
    const handleDestinationChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setFormData((prev) => ({
            ...prev,
            destination_id: selectedOption.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateTour(tour.id, formData);
            console.log('Tour', response.data);
            navigate(location.pathname, { state: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>Information</h2>
                <div className={cx('container')}>
                    <div className={cx('fields')}>
                        <div className={cx('avatar')}>
                            <Image
                                animation
                                width={300}
                                className={cx('avatar-img')}
                                src={tour.imgs[0]}
                                alt={'avatar'}
                            />
                            <Button
                                className={cx('avater-btn')}
                                circle
                                leftIcon={<Camera size={32} weight="duotone" />}
                            />
                        </div>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    rightIcon={<AirplaneTakeoff size={20} weight="bold" />}
                                    placeholder={'Tour Name'}
                                    value={tour.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    type="text"
                                />

                                {Object.keys(selectedOption).length !== 0 && (
                                    <Select
                                        data={destinationsSelect}
                                        defaultValue={selectedOption}
                                        onChange={handleDestinationChange}
                                        placeholder={'Destination'}
                                        className={cx('select')}
                                        classNameSelect={cx('select-content')}
                                    />
                                )}
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    classNameInput={cx('input')}
                                    rightIcon={<Calendar size={20} weight="bold" />}
                                    placeholder={'Day'}
                                    value={tour.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    type="number"
                                />
                                <Input
                                    classNameInput={cx('input')}
                                    rightIcon={<UsersThree size={20} weight="bold" />}
                                    placeholder={'Persion'}
                                    value={tour.person_quantity}
                                    onChange={(e) => setFormData({ ...formData, person_quantity: e.target.value })}
                                />
                                <Input
                                    classNameInput={cx('input')}
                                    rightIcon={<CurrencyCircleDollar size={20} weight="bold" />}
                                    placeholder={'Price'}
                                    value={tour.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className={cx('input_list')}>
                                <Input
                                    classNameInput={cx('input')}
                                    placeholder={'Date created'}
                                    value={tour.create_at}
                                    onChange={(e) => setFormData({ ...formData, create_at: e.target.value })}
                                    type="datetime-local"
                                />
                                <Input
                                    classNameInput={cx('input')}
                                    rightIcon={<UsersThree size={20} weight="bold" />}
                                    placeholder={'Persion'}
                                    value={tour.person_quantity}
                                    onChange={(e) => setFormData({ ...formData, person_quantity: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('edit')}>
                            <QuillEditor value={value} setValue={handleQuillEditorChange} />
                        </div>
                        <div className={cx('input_list')}>
                            <Button primary large className={cx('btn')} type="submit">
                                Submit
                            </Button>

                            <Button primary large className={cx('btn')}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
