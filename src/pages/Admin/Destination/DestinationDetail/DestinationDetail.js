import { AirplaneTakeoff, MapPin } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import QuillEditor from '~/components/QuillEditor';
import Select from '~/components/Select';
import { DATA_STATUS_SELECT, formattedDate, showNotifications } from '~/utils/constants';
import { findDestinationById, updateDestination, createDestination, deleteDestination } from '~/utils/httpRequest';
import styles from './DestinationDetail.module.scss';
import routes from '~/config/routes';
import { FaRegSquarePlus } from 'react-icons/fa6';

const cx = classNames.bind(styles);

export default function DestinationDetail({ create }) {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [destination, setDestination] = useState({
        name: '',
        trips: '',
        information: '',
        status: DATA_STATUS_SELECT.items[0].value,
        createdAt: new Date(),
        image: { url: '' },
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const findSelectedOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };
    const [selectedOption, setSelectedOption] = useState(findSelectedOption(destination?.status));

    useEffect(() => {
        if (!create) {
            getDestinationByID(id);
        }
    }, [id, create]);

    useEffect(() => {
        setImagePreview(destination?.image.url);
        setSelectedOption(findSelectedOption(destination?.status));
    }, [destination]);

    const getDestinationByID = async (id) => {
        try {
            const response = await findDestinationById(id);
            setDestination(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDestinationChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setDestination((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (create) {
                await createDestination(destination);
                navigate(routes.admin_destination);
                showNotifications({ message: 'Destination created successfully!' });
            } else {
                const response = await updateDestination(id, destination);
                setDestination(response.data);
                showNotifications({ message: 'Destination updated successfully!' });
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDestination((prev) => ({
                ...prev,
                image: file,
            }));
            setImagePreview(URL.createObjectURL(file));
            console.log(imagePreview);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteDestination(id);
            navigate(routes.admin_destination);
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

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>{create ? 'Create Destination' : 'Edit Destination'}</h2>
                <div className={cx('container')}>
                    <div className={cx('fields')}>
                        <div className={cx('avatar')}>
                            <Image
                                action
                                onClickBtnLeft={() => triggerFileInput()}
                                iconBtnLeft={<FaRegSquarePlus size={20} />}
                                width={300}
                                height={350}
                                src={imagePreview}
                                alt={'Destination Image'}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Name'}
                                    classNameInput={cx('input')}
                                    leftIcon={<AirplaneTakeoff size={20} weight="bold" />}
                                    placeholder={'Destination Name'}
                                    value={destination?.name}
                                    onChange={(e) => setDestination({ ...destination, name: e.target.value })}
                                    type="text"
                                />
                                <Input
                                    label={'Trips'}
                                    classNameInput={cx('input')}
                                    leftIcon={<MapPin size={20} weight="bold" />}
                                    placeholder={'Trips'}
                                    value={destination?.trips}
                                    onChange={(e) => setDestination({ ...destination, trips: e.target.value })}
                                    type="number"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                {selectedOption && (
                                    <Select
                                        label={'Status'}
                                        data={DATA_STATUS_SELECT}
                                        defaultValue={selectedOption}
                                        onChange={handleDestinationChange}
                                        placeholder={'Status'}
                                        className={cx('select')}
                                        classNameSelect={cx('select-content')}
                                    />
                                )}
                                <Input
                                    label={'Day create'}
                                    disabled={true}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    placeholder={formattedDate(new Date(destination?.createdAt))}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('edit')}>
                            <QuillEditor
                                value={destination?.information}
                                setValue={(content) => setDestination({ ...destination, information: content })}
                            />
                        </div>
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
                </div>
            </form>
        </div>
    );
}
