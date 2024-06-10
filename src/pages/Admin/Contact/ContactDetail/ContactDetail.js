import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ContactDetail.module.scss';
import Input from '~/components/Input';
import { PencilSimple, Subtitles } from '@phosphor-icons/react';
import Button from '~/components/Button';
import TextArea from '~/components/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { answerContact, findContactById } from '~/utils/httpRequest';
import { showNotifications } from '~/utils/constants';
import routes from '~/config/routes';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

export default function ContactDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        topic: '',
        message: '',
    });

    useEffect(() => {
        getContactByID(id);
    }, [id]);

    const getContactByID = async (id) => {
        const response = await findContactById(id);
        setContact(response.data);
    };

    const handleAnswer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await answerContact(id, { ...form, email: contact.email });
            navigate(routes.admin_contact);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <div className={cx('infor')}>
                <h2>Information</h2>
                <div className={cx('input_list')}>
                    <Input
                        label={'Name'}
                        classNameInput={cx('input')}
                        disabled={true}
                        value={contact.name}
                        placeholder={'Name'}
                        type="text"
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Email'}
                        classNameInput={cx('input')}
                        disabled={true}
                        value={contact.email}
                        placeholder={'Email'}
                        type="text"
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Phone number'}
                        classNameInput={cx('input')}
                        disabled={true}
                        value={contact.phone}
                        placeholder={'Phone number'}
                        type="text"
                    />
                </div>
                <div className={cx('input_list')}>
                    <Input
                        label={'Topic'}
                        classNameInput={cx('input')}
                        disabled={true}
                        value={contact.topic}
                        placeholder={'Topic'}
                        type="text"
                    />
                </div>
                <div className={cx('input_list')}>
                    <TextArea
                        className={cx('text_area-mess')}
                        placeholder={'Message'}
                        label={'Message'}
                        disabled={true}
                        value={contact.message}
                    />
                </div>
            </div>
            <form className={cx('form')} onSubmit={handleAnswer}>
                <h2>Answer</h2>
                <div className={cx('answer')}>
                    <div className={cx('input_list')}>
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<Subtitles size={20} weight="bold" />}
                            placeholder={'Topic'}
                            value={form.topic}
                            onChange={(e) => setForm({ ...form, topic: e.target.value })}
                            type="text"
                        />
                        <TextArea
                            className={cx('text_area')}
                            placeholder={'Content'}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            icon={<PencilSimple size={20} weight="bold" />}
                        />
                    </div>
                    <div className={cx('action-btn')}>
                        <Button primary large className={cx('btn')} type="submit">
                            Send Message
                        </Button>
                        <Button primary large className={cx('btn')} type="button">
                            Delete
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
