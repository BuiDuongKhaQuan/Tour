import { AirplaneTakeoff, MapPin } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Store } from 'react-notifications-component';
import { useLocation, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Input from '~/components/Input';
import QuillEditor from '~/components/QuillEditor';
import Select from '~/components/Select';
import { DATA_STATUS_SELECT, formattedDate, notification } from '~/utils/constants';
import { updateDestination } from '~/utils/httpRequest';
import styles from './DestinationDetail.module.scss';

const cx = classNames.bind(styles);
export default function DestinationDetail() {
    const { id } = useParams();
    const location = useLocation();
    const fileInputRef = useRef(null);
    const [destination, setDestination] = useState(location.state);
    const [imagePreview, setImagePreview] = useState('');
    const findSelectedOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };
    const [selectedOption, setSelectedOption] = useState(findSelectedOption(destination.status));

    useEffect(() => {
        setImagePreview(destination.img);
        setSelectedOption(findSelectedOption(destination.status));
    }, [destination]);

    const handleDestinationChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setDestination((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateDestination(id, destination);
            setDestination(response.data);
            Store.addNotification({
                ...notification,
                message: 'Update destination successfully',
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDestination((prev) => ({
                ...prev,
                img: file,
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
                                action
                                onClickBtnRight={() => triggerFileInput()}
                                width={300}
                                src={imagePreview}
                                alt={'avatar'}
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
                                    placeholder={'Tour Name'}
                                    value={destination.name}
                                    onChange={(e) => setDestination({ ...destination, name: e.target.value })}
                                    type="text"
                                />
                                <Input
                                    label={'Trips'}
                                    classNameInput={cx('input')}
                                    leftIcon={<MapPin size={20} weight="bold" />}
                                    placeholder={'Trips'}
                                    value={destination.trips}
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
                                    placeholder={formattedDate(new Date(destination.create_at))}
                                    onChange={(e) => setDestination({ ...destination, create_at: e.target.value })}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('edit')}>
                            <QuillEditor
                                value={destination.information}
                                setValue={(content) => setDestination({ ...destination, information: content })}
                            />
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
