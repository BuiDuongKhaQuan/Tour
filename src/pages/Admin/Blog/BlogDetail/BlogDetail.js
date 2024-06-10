import { AirplaneTakeoff } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import QuillEditor from '~/components/QuillEditor';
import Select from '~/components/Select';
import routes from '~/config/routes';
import { DATA_STATUS_SELECT, formattedDate, showNotifications } from '~/utils/constants';
import { createBlog, deleteBlog, findBlogById, updateBlog } from '~/utils/httpRequest';
import styles from './BlogDetail.module.scss';

const cx = classNames.bind(styles);

export default function BlogDetail({ create }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [blog, setBlog] = useState({
        topic: '',
        status: DATA_STATUS_SELECT.items[0].value,
        createdAt: new Date(),
        image: { url: '' },
        information: '',
    });

    const findSelectedOption = (statusValue) => {
        return DATA_STATUS_SELECT.items.find((item) => item.value === statusValue);
    };

    const [selectedOption, setSelectedOption] = useState(findSelectedOption(blog.status));

    useEffect(() => {
        if (!create) {
            getBlogById(id);
        }
    }, [id, create]);

    useEffect(() => {
        setSelectedOption(findSelectedOption(blog.status));
    }, [blog]);

    const getBlogById = async (id) => {
        try {
            const response = await findBlogById(id);
            setBlog(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDestinationChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setBlog((prev) => ({
            ...prev,
            status: selectedOption.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response;
            if (create) {
                response = await createBlog(blog);
                navigate(routes.admin_blog);
            } else {
                response = await updateBlog(id, blog);
            }
            setBlog(response.data);
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

    const handleUpdateImg = async (file) => {
        setLoading(true);
        try {
            const response = await updateBlog(id, { image: file });
            setBlog(response.data);
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

    const handleFileUpdateChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            if (create) {
                setBlog({ ...blog, image: file });
            } else {
                handleUpdateImg(file);
            }
        }
    };
    const handleDelete = async () => {
        try {
            const response = await deleteBlog(id);
            navigate(routes.admin_blog);
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
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>Information</h2>
                <div className={cx('container')}>
                    <div className={cx('fields')}>
                        <div className={cx('avatar')}>
                            <Image
                                action
                                onClickBtnRight={() => triggerFileInput()}
                                iconBtnRight={create && <FaRegSquarePlus size={20} />}
                                width={300}
                                src={imagePreview || blog.image.url}
                                alt={'Blog Image'}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileUpdateChange}
                                ref={fileInputRef}
                            />
                        </div>
                        <div className={cx('infor')}>
                            <div className={cx('input_list')}>
                                <Input
                                    label={'Topic'}
                                    classNameInput={cx('input')}
                                    leftIcon={<AirplaneTakeoff size={20} weight="bold" />}
                                    placeholder={'Topic'}
                                    value={blog.topic}
                                    onChange={(e) => setBlog({ ...blog, topic: e.target.value })}
                                    type="text"
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
                                    placeholder={formattedDate(new Date(blog.createdAt))}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('edit')}>
                            <QuillEditor
                                value={blog.information}
                                setValue={(content) => setBlog({ ...blog, information: content })}
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
