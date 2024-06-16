import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import Select from '~/components/Select';
import routes from '~/config/routes';
import { DATA_STATUS_SELECT, showNotifications } from '~/utils/constants';
import { createDeals, deleteDeals, findDealsById, updateDeals } from '~/utils/httpRequest';
import styles from './DealsDetail.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

export default function DealsDetail({ create }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deals, setDeals] = useState({
        offer: '',
        quantity: 0,
        expiryDate: '',
        status: DATA_STATUS_SELECT.items[0].value,
    });
    const [loading, setLoading] = useState(false);

    const findSelectedOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };

    const [selectedOption, setSelectedOption] = useState(findSelectedOption(deals?.status));

    useEffect(() => {
        if (!create) {
            getDealsByID(id);
        }
    }, [id, create]);

    useEffect(() => {
        setSelectedOption(findSelectedOption(deals?.status));
    }, [deals]);

    const getDealsByID = async (id) => {
        try {
            const response = await findDealsById(id);
            setDeals(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDealsChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setDeals((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (create) {
                await createDeals(deals);
                navigate(routes.admin_deals);
                showNotifications({ message: 'Deals created successfully!' });
            } else {
                const response = await updateDeals(id, deals);
                setDeals(response.data);
                showNotifications({ message: 'Deals updated successfully!' });
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

    const handleDelete = async () => {
        try {
            const response = await deleteDeals(id);
            navigate(routes.admin_deals);
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
    const getFormattedDateTime = () => {
        return moment().format('YYYY-MM-DDTHH:mm');
    };

    // Format the dateExpiration to YYYY-MM-DDTHH:MM if it exists
    const formattedDateExpiration = deals.expiryDate
        ? moment(deals.expiryDate).format('YYYY-MM-DDTHH:mm')
        : getFormattedDateTime();

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>{create ? 'Create Deals' : 'Edit Deals'}</h2>
                <div className={cx('container')}>
                    <div className={cx('fields')}>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Offer'}
                                    classNameInput={cx('input')}
                                    rightIcon={'%'}
                                    placeholder={'Deals offer'}
                                    value={deals?.offer}
                                    onChange={(e) => setDeals({ ...deals, offer: e.target.value })}
                                    type="number"
                                />
                                <Input
                                    label={'Quantity'}
                                    classNameInput={cx('input')}
                                    leftIcon={<MdDriveFileRenameOutline />}
                                    placeholder={'Quantity'}
                                    value={deals?.quantity}
                                    onChange={(e) => setDeals({ ...deals, quantity: e.target.value })}
                                    type="number"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                {selectedOption && (
                                    <Select
                                        label={'Status'}
                                        data={DATA_STATUS_SELECT}
                                        defaultValue={selectedOption}
                                        onChange={handleDealsChange}
                                        placeholder={'Status'}
                                        className={cx('select')}
                                        classNameSelect={cx('select-content')}
                                    />
                                )}
                                <Input
                                    label={'Day Expired'}
                                    classNameInput={cx('input')}
                                    className={cx('input_wraper')}
                                    value={formattedDateExpiration}
                                    onChange={(e) => setDeals({ ...deals, expiryDate: e.target.value })}
                                    type="datetime-local"
                                    min={getFormattedDateTime()}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('information')}>
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
