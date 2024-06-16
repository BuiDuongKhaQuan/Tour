import { Rating } from '@mui/material';
import { Clock, CurrencyCircleDollar, EnvelopeSimple, MapPin, User, UsersThree } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useParams } from 'react-router-dom';
import AvatarCustom from '~/components/AvatarCustom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import TextArea from '~/components/TextArea';
import { showNotifications } from '~/utils/constants';
import { createReview, findReviewByTourId, findTourById, findUserById } from '~/utils/httpRequest';
import LayoutWithSideBar from '../../LayoutWithSideBar';
import styles from './TourDetail.module.scss';

const cx = classNames.bind(styles);

export default function TourDetail() {
    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [tour, setTour] = useState({
        name: '',
        rate: 0,
        date: 0,
        personQuantity: 0,
        information: '',
        price: 0,
        destination: { name: '' },
        images: [{}],
        reviews: [],
    });

    useEffect(() => {
        getTour(id);
        getReviewByTour(id);
    }, [id]);

    const getTour = async (id) => {
        const response = await findTourById(id);
        setTour(response.data);
    };

    const getReviewByTour = async (id) => {
        try {
            const response = await findReviewByTourId(id);
            const reviews = response.data;

            const reviewsWithUserDetails = await Promise.all(
                reviews.map(async (review) => {
                    try {
                        const userResponse = await findUserById(review.userId);
                        return { ...review, user: userResponse.data };
                    } catch (userError) {
                        console.error(`Failed to fetch user data for userId ${review.userId}`, userError);
                        return { ...review, user: null }; // Or handle error as needed
                    }
                }),
            );
            console.log(reviewsWithUserDetails);
            setTour((prevTour) => ({
                ...prevTour,
                reviews: reviewsWithUserDetails,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const Review = () => {
        const [review, setReview] = useState({
            rate: 0,
            message: '',
            name: '',
            email: '',
            status: 1,
            tourId: id,
            userId: user?.id,
            images: [],
        });
        const [saveUserInfo, setSaveUserInfo] = useState(false); // State để lưu trạng thái của checkbox

        useEffect(() => {
            // Kiểm tra xem dữ liệu đã được lưu trong localStorage chưa
            const savedUserInfo = localStorage.getItem('savedUserInfo');
            if (savedUserInfo) {
                const { name, email } = JSON.parse(savedUserInfo);
                setReview((prevReview) => ({ ...prevReview, name, email }));
                setSaveUserInfo(true);
            }
        }, []);

        const handleSend = async (e) => {
            e.preventDefault();
            if (saveUserInfo) {
                localStorage.setItem('savedUserInfo', JSON.stringify({ name: review.name, email: review.email }));
            } else {
                localStorage.removeItem('savedUserInfo');
            }
            if (!sessionStorage.getItem('user')) {
                showNotifications({
                    type: 'warning',
                    title: 'Warning',
                    message: 'Bạn cần đăng nhập để đặt Tour',
                });
                return;
            }

            if (!review.message || !review.name || !review.email || !review.rate) {
                showNotifications({
                    title: 'Validation Error',
                    type: 'danger',
                    message: 'Please fill in all required fields (message, name, email).',
                });
                return;
            }

            try {
                const response = await createReview(review);
                setTour({ ...tour, reviews: [...tour.reviews, response.data] });
                showNotifications({ message: response.message });
            } catch (error) {
                showNotifications({
                    title: 'Send Error',
                    type: 'danger',
                    message: 'Network error, please try again later',
                });
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setReview((prevReview) => ({ ...prevReview, [name]: value }));
        };

        return (
            <>
                <div className={cx('tour_review')}>
                    <h2>Leave A Reply</h2>
                    <p className={cx('p-title')}>
                        Your email address will not be published. Required fields are marked *
                    </p>
                    <div className={cx('start-wrapper')}>
                        <span>Your Rating</span>
                        <div>
                            <Rating
                                name="read-only"
                                value={review.rate}
                                onChange={(event, newValue) => {
                                    setReview({ ...review, rate: newValue });
                                }}
                                size="large"
                            />
                        </div>
                    </div>
                    <form className={cx('rating_form')} onSubmit={handleSend}>
                        <TextArea
                            placeholder={'Write a Message'}
                            name="message"
                            value={review.message}
                            onChange={handleChange}
                        />
                        <div className={cx('rating_input')}>
                            <Input
                                className={cx('rating_input_item')}
                                placeholder={'Your Name'}
                                rightIcon={<User weight="bold" />}
                                name="name"
                                type="text"
                                value={review.name}
                                onChange={handleChange}
                            />
                            <Input
                                className={cx('rating_input_item')}
                                placeholder={'Your Email'}
                                rightIcon={<EnvelopeSimple weight="bold" />}
                                type="email"
                                name="email"
                                value={review.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('rating_check')}>
                            <input
                                type="checkbox"
                                checked={saveUserInfo}
                                onChange={(e) => setSaveUserInfo(e.target.checked)}
                            />
                            <p>Save my name, email, and website in this browser for the next time I comment.</p>
                        </div>
                        <Button className={cx('rating_btn')} primary large type="submit">
                            POST REVIEW
                        </Button>
                    </form>
                </div>
                {tour.reviews.length !== 0 && (
                    <div className={cx('tour_review', 'review-list')}>
                        {tour.reviews.reverse().map((review, index) => (
                            <div className={cx('review-item')} key={index}>
                                <div className={cx('avatar')}>
                                    <AvatarCustom
                                        src={review.user?.avatar?.url}
                                        stringAva={review.user ? review.user.name : 'Travel'}
                                    />
                                </div>
                                <div className={cx('review-infor')}>
                                    <p className={cx('name')}>{review.user?.name}</p>
                                    <Rating name="read-only" value={Number(review.rate)} size="large" />
                                    <p className={cx('time')}>{new Date(review.createdAt).toLocaleDateString()}</p>
                                    <p className={cx('content')}>{review.message}</p>
                                    {/* <div className={cx('image-list')}>
                                        {review.images.map((image, index) => (
                                                <Image key={index} width={50} height={50} src={image.url} />
                                            ))}
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        );
    };

    const Information = () => (
        <div className={cx('tour_information')}>
            <h2>{tour.name}</h2>
            <div className={cx('information_list')}>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <CurrencyCircleDollar size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>From</span>
                        <p>
                            <CurrencyFormat
                                value={tour.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                                decimalScale={2}
                            />
                        </p>
                    </div>
                </div>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <Clock size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>Duration</span>
                        <p>{tour.date}</p>
                    </div>
                </div>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <MapPin size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>Location</span>
                        <p>{tour.destination.name}</p>
                    </div>
                </div>
                <div className={cx('information_item')}>
                    <div className={cx('information-icon')}>
                        <UsersThree size={30} />
                    </div>
                    <div className={cx('information_')}>
                        <span>Group Size</span>
                        <p>{tour.personQuantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <LayoutWithSideBar bookBar categoryBar>
            <Information />
            <div className={cx('tour_content')}>
                <div className="ql-snow">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: tour.information }} />
                </div>
            </div>
            <Review />
        </LayoutWithSideBar>
    );
}
