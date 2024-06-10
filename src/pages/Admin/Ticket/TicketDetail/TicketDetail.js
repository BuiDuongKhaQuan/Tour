import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import Select from '~/components/Select';
import routes from '~/config/routes';
import { DATA_STATUS_SELECT, formattedDate, showNotifications } from '~/utils/constants';
import { createTicket, deleteTicket, findTicketById, updateTicket } from '~/utils/httpRequest';
import styles from './TicketDetail.module.scss';

const cx = classNames.bind(styles);

export default function TicketDetail({ create }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        type: '',
        value: '',
        status: DATA_STATUS_SELECT.items[0].value,
        createdAt: new Date(),
    });
    const [loading, setLoading] = useState(false);

    const findSelectedOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };

    const [selectedOption, setSelectedOption] = useState(findSelectedOption(ticket?.status));

    useEffect(() => {
        if (!create) {
            getTicketByID(id);
        }
    }, [id, create]);

    useEffect(() => {
        setSelectedOption(findSelectedOption(ticket?.status));
    }, [ticket]);

    const getTicketByID = async (id) => {
        try {
            const response = await findTicketById(id);
            setTicket(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTicketChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setTicket((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (create) {
                await createTicket(ticket);
                navigate(routes.admin_ticket);
                showNotifications({ message: 'Ticket created successfully!' });
            } else {
                const response = await updateTicket(id, ticket);
                setTicket(response.data);
                showNotifications({ message: 'Ticket updated successfully!' });
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
            const response = await deleteTicket(id);
            navigate(routes.admin_ticket);
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
                <h2>{create ? 'Create Ticket' : 'Edit Ticket'}</h2>
                <div className={cx('container')}>
                    <div className={cx('fields')}>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Type'}
                                    classNameInput={cx('input')}
                                    leftIcon={<MdDriveFileRenameOutline />}
                                    placeholder={'Ticket Type'}
                                    value={ticket?.type}
                                    onChange={(e) => setTicket({ ...ticket, type: e.target.value })}
                                    type="text"
                                />
                                <Input
                                    label={'Value'}
                                    classNameInput={cx('input')}
                                    rightIcon={'%'}
                                    placeholder={'Value'}
                                    value={ticket?.value}
                                    onChange={(e) => setTicket({ ...ticket, value: e.target.value })}
                                    type="number"
                                />
                            </div>
                            <div className={cx('input_list')}>
                                {selectedOption && (
                                    <Select
                                        label={'Status'}
                                        data={DATA_STATUS_SELECT}
                                        defaultValue={selectedOption}
                                        onChange={handleTicketChange}
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
                                    placeholder={formattedDate(new Date(ticket?.createdAt))}
                                    type="text"
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
