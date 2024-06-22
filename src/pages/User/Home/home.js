import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Select from '~/components/Select';
import Button from '~/components/Button';
import CountUp from 'react-countup';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Calendar,
    MapPin,
    CalendarBlank,
    CurrencyDollarSimple,
    PersonSimpleBike,
    Star,
    Tag,
} from '@phosphor-icons/react';
import SupTitle from '~/components/SupTitle';
import SliderCard, { CardItem, TourCardItem } from '~/components/SliderCard';
import { Link, useNavigate } from 'react-router-dom';
import Image from '~/components/Image';
import { memo, useEffect, useRef, useState } from 'react';
import {
    findTourByDeal,
    getBlogLimit,
    getDestinationsLimit,
    getToursLimit,
    searchBlog,
    searchDestination,
    searchTours,
} from '~/utils/httpRequest';
import routes from '~/config/routes';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { formattedDate, showNotifications } from '~/utils/constants';
import Input from '~/components/Input';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { debounce } from 'lodash'; // Import debounce từ thư viện lodash
import Search from '~/components/Search/Search';

const cx = classNames.bind(styles);

const Home = memo(() => {
      const { t } = useTranslation();
    const DATA_SELECT = {
        id: 1,
        title: 'Select criteria',
        icon: <MdOutlineTravelExplore size={20} color="#3cb371" />,
        items: [
            {
                value: 'tour',
                label: 'Tour',
            },
            {
                value: 'destination',
                label: 'Destination',
            },
            {
                value: 'blog',
                label: 'Blog',
            },
        ],
    };


    const DATA_SERVICE = {
        content: t('common.completely'),
        data: [
            { id: 1, img: images.feature_1_1, title: t('common.discount') },
            { id: 2, img: images.feature_1_2, title: t('common.bestGuide') },
            { id: 3, img: images.feature_1_3, title: t('common.support') },
            { id: 4, img: images.feature_1_4, title: t('common.travelManagement') },
        ],
    };

    const DATA_PROCESS = [
        {
            title: t('common.find'),
            number: '01',
            content: t('common.globally'),
        },
        {
            title: t('common.travel'),
            number: '02',
            content: t('common.globally'),
        },
        {
            title: t('common.seeWhat'),
            number: '03',
            content: t('common.globally'),
        },
    ];

    const LIST_DOT = [
        { trip: '6+ Trips', position: { top: '0%', left: '25%' } },
        { trip: '16+ Trips', position: { top: '30%', left: '10%' } },
        { trip: '5+ Trips', position: { top: '40%', left: '28%' } },
        { trip: '2+ Trips', position: { bottom: '0%', left: '28%' } },
        { trip: '8+ Trips', position: { bottom: '30%', left: '27%' } },
        { trip: '7+ Trips', position: { top: '50%', right: '30%' } },
        { trip: '10+ Trips', position: { top: '22%', right: '22%' } },
        { trip: '12+ Trips', position: { right: '13%', bottom: '25%' } },
    ];

    const DATA_TEAM = [
        {
            name: 'Quan Bui',
            img: images.ceo,
            content: t('common.corPorate'),
        },
        {
            name: 'Thai Tran',
            img: images.ceo_1,
            content: t('common.theAdvance'),
        },
    ];
    const [searchCriteria, setSearchCriteria] = useState(DATA_SELECT.items[0].value);
    const [keyword, setKeyword] = useState('');
    const [tours, setTours] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [toursOfDeal, setToursOfDeal] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTours();
        fetchDestinations();
        getAllToursDeal();
        getAllBlog();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await getToursLimit(0, 8);
            setTours(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllToursDeal = async () => {
        try {
            const response = await findTourByDeal();
            setToursOfDeal(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };
    const fetchDestinations = async () => {
        try {
            const response = await getDestinationsLimit(0, 8);
            setDestinations(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllBlog = async () => {
        try {
            const response = await getBlogLimit(0, 6);
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchByCriteria = async (e) => {
        e.preventDefault();
        // Logic tìm kiếm theo tiêu chí và từ khóa
        console.log('Searching for:', keyword, 'in', searchCriteria.value);
        if (!searchCriteria.value) {
            showNotifications({
                title: 'Warning',
                type: 'warning',
                message: 'Please select criteria!!',
            });
            return;
        }
        // Giả sử có các hàm tìm kiếm cụ thể cho từng tiêu chí
        switch (searchCriteria.value) {
            case 'tour':
                // Gọi hàm tìm kiếm tour
                const response = await searchTours({ name: keyword });
                navigate(routes.tour, { state: response.data });
                break;
            case 'destination':
                const response1 = await searchDestination({ name: keyword });
                navigate(routes.destination, { state: response1.data });
                break;
            case 'blog':
                const response2 = await searchBlog({ name: keyword });
                navigate(routes.blog, { state: response2.data });
                break;
            default:
                break;
        }
    };

    const sliderRef1 = useRef(null);
    const nextSlide1 = () => {
        sliderRef1.current.slickNext(); // Gọi hàm slickNext() từ ref
    };

    const previousSlide1 = () => {
        sliderRef1.current.slickPrev(); // Gọi hàm slickPrev() từ ref
    };

    const sliderRef = useRef(null);
    const nextSlide = () => {
        sliderRef.current.slickNext(); // Gọi hàm slickNext() từ ref
    };

    const previousSlide = () => {
        sliderRef.current.slickPrev();
    };

    const ServiceItem = ({ data, content }) =>
        data.map((result, index) => (
            <div className={cx('container_service')} key={index}>
                <div className={cx('img_service')}>
                    <img src={result.img} alt="Service" />
                </div>
                <div className={cx('title_service')}>
                    <h3>{result.title}</h3>
                </div>
                <div className={cx('content_service')}>
                    <p>{content}</p>
                </div>
            </div>
        ));

    const ProcessItem = ({ data }) =>
        data.map((reslut, index) => (
            <div className={cx('process-list')} key={index}>
                <div className={cx('process-list__number')}>{reslut.number}</div>
                <div className={cx('media-body')}>
                    <h3 className={cx('process-list__title')}>{reslut.title}</h3>
                    <p className={cx('process-list__text')}>{reslut.content}</p>
                </div>
            </div>
        ));

    const Dot = ({ data }) =>
        data.map((reslut, index) => (
            <div className={cx('dot')} style={reslut.position} key={index}>
                <a href="tour.html" className={cx('trips')}>
                    {reslut.trip}
                </a>
            </div>
        ));

    const TourItem = ({ data }) => (
        <SliderCard slidesToShowOn1024={2} slidesToShow={4} slidesToShowOn1200={3} slidesToShowOn1450={4}>
            {data.map((reslut, index) => (
                <TourCardItem data={reslut} homeTour key={index} />
            ))}
        </SliderCard>
    );
    const Categories = ({ data }) => (
        <SliderCard animation slidesToShow={6} slidesToShowOn770={2}>
            {data.map((reslut, index) => (
                <CardItem categories data={reslut} window key={index} />
            ))}
        </SliderCard>
    );
    const TourOffer = ({ data }) => (
        <SliderCard
            animation
            ref={sliderRef1}
            slidesToShow={2}
            slidesToShowOn770={1}
            slidesToShowOn1024={1}
            slidesToShowOn1200={2}
            slidesToShowOn1450={2}
        >
            {data.map((reslut, index) => (
                <TourCardItem data={reslut} sellOff homeTour key={index} />
            ))}
        </SliderCard>
    );
    const rendererCountDown = ({ days, hours, minutes, seconds, completed }) => {
        return (
            <ul className={cx('offers_countdown')}>
                <li>
                    <div className={cx('count_number')}>{days}</div>
                    <span>Days</span>
                </li>
                <li>
                    <div className={cx('count_number')}>{hours}</div>
                    <span>Hours</span>
                </li>
                <li>
                    <div className={cx('count_number')}>{minutes}</div>
                    <span>Minutes</span>
                </li>
                <li>
                    <div className={cx('count_number')}>{seconds}</div>
                    <span>Senconds</span>
                </li>
            </ul>
        );
    };
    const TeamItem = ({ data }) => (
        <SliderCard
            sliderProps={{
                fade: true,
                waitForAnimate: false,
            }}
            ref={sliderRef}
        >
            {data.map((result, index) => (
                <div className={cx('team_box_account')} key={index}>
                    <Image
                        pointer
                        circle
                        width="80px"
                        height="80px"
                        src={result.img}
                        alt="Img CEO"
                        className={cx('avatar')}
                    />
                    <div className={cx('information')}>
                        <p>“{result.content}”</p>
                    </div>
                    <div className={cx('start')}>
                        <Star size={20} weight="fill" color="#3cb371" />
                        <Star size={20} weight="fill" color="#3cb371" />
                        <Star size={20} weight="fill" color="#3cb371" />
                        <Star size={20} weight="fill" color="#3cb371" />
                        <Star size={20} weight="fill" color="#3cb371" />
                    </div>
                    <h2>{result.name}</h2>
                    <p>{t('common.ceo')}</p>
                </div>
            ))}
        </SliderCard>
    );

    const NewItem = ({ data }) => (
        <SliderCard slidesToShow={3} slidesToShowOn1024={2} slidesToShowOn1200={2} slidesToShowOn1450={3}>
            {data.map((result, index) => (
                <div className={cx('new_item')} key={index}>
                    {!!(index % 2) && (
                        <Image
                            animation
                            height={250}
                            className={cx('new_img')}
                            src={result.image.url}
                            alt={result.topic}
                        />
                    )}
                    <div className={cx('new_information')}>
                        <div className={cx('new_item_time')}>
                            <span className={cx('time')}>
                                <Tag size={18} weight="duotone" color="#3cb371" />
                                Travel
                            </span>
                            <span className={cx('location')}>
                                <Calendar size={18} weight="duotone" color="#3cb371" />
                                {formattedDate(new Date(result.createdAt))}
                            </span>
                        </div>
                        <h3 className={cx('new_title')}>{result.topic}</h3>
                        <Link className={cx('new_read_more')} to={`/blog/${result.id}`}>
                            READ MORE
                            <ArrowUpRight size={18} className={cx('detail_icon')} color="#3cb371" weight="bold" />
                        </Link>
                    </div>
                    {!!(index % 2) || (
                        <Image
                            animation
                            height={250}
                            className={cx('new_img')}
                            src={result.image.url}
                            alt={result.topic}
                        />
                    )}
                </div>
            ))}
        </SliderCard>
    );

    return (
        <div className={cx('warpper')}>
            <div className={cx('banner')}>
                <div className={cx('img_hello')} style={{ backgroundImage: `url(${images.hero_bg_2_1})` }}></div>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <SupTitle primary right title={t('common.enjoy')} />
                        <h1 className={cx('hero_title')}>{t('common.plan')}</h1>
                        <h1 className={cx('hero_title')}>{t('common.travelHouse')}</h1>
                        <p className={cx('p_title')}>{t('common.weAlways')}</p>
                        <Button primary large>
                            {t('common.getStarted')}
                        </Button>
                    </div>
                </div>
                <div className={cx('tree_1')}>
                    <img src={images.tree_1} alt="tree" />
                </div>
                <div className={cx('tree_2')}>
                    <img src={images.tree_2} alt="tree" />
                </div>
                <div className={cx('cloud_1')}>
                    <img src={images.cloud_1} alt="cloud" />
                </div>
                <div className={cx('cloud_2')}>
                    <img src={images.cloud_2} alt="cloud" />
                </div>
                <div className={cx('cloud_3')}>
                    <img src={images.cloud_3} alt="cloud" />
                </div>
            </div>
            <Search
                DATA_SELECT={DATA_SELECT}
                handleSearchByCriteria={handleSearchByCriteria}
                setKeyword={setKeyword}
                keyword={keyword}
                setSearchCriteria={setSearchCriteria}
            />
            <div className={cx('service')}>
                <ServiceItem data={DATA_SERVICE.data} content={DATA_SERVICE.content} />
            </div>
            <div className={cx('category')}>
                <SupTitle left right primary small title={t('common.categories')} />
                <h2>{t('common.browse')}</h2>
                <div className={cx('_row')}>{destinations && <Categories data={destinations} />}</div>
            </div>
            <div className={cx('aboutus')}>
                <div className={cx('about_left')}>
                    <div className={cx('about_left_top')}>
                        <SupTitle className={cx('suptitle-max')} right small primary title={t('common.aboutUs')} />
                        <SupTitle
                            className={cx('suptitle-1000px')}
                            right
                            left
                            small
                            primary
                            title={t('common.aboutUs')}
                        />
                        <h2>{t('common.perfect')}</h2>
                        <p>{t('common.progressively')}</p>
                    </div>
                    <div className={cx('about_left_bottom')}>
                        <div className={cx('left_bottom_item')}>
                            <h2>
                                <CountUp end={25} duration={2} />+
                            </h2>
                            <p>{t('common.year')}</p>
                        </div>
                        <div className={cx('left_bottom_item')}>
                            <h2>
                                <CountUp end={15} duration={2} />+
                            </h2>
                            <p>{t('common.year')}</p>
                        </div>
                        <div className={cx('left_bottom_item')}>
                            <h2>
                                <CountUp end={35} duration={2} />+
                            </h2>
                            <p>{t('common.year')}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('about_right')}>
                    <div className={cx('right_img1')}>
                        <img className={cx('img1')} src={images.about_2_1} alt="Img" />
                        <div className={cx('right_img2')}>
                            <img className={cx('img2')} src={images.about_2_2} alt="Img" />
                        </div>
                        <div className={cx('right_img3')}>
                            <img src={images.about_shape_2} alt="Img" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('destination', 'category')}>
                <SupTitle left right primary small title={t('common.topDestinations')} />
                <h2>{t('common.popularDestinations')}</h2>
                <div className={cx('_row')}>
                    {destinations && (
                        <SliderCard
                            animation
                            large
                            tripSmall
                            slidesToShowOn1024={2}
                            slidesToShowOn1200={3}
                            slidesToShowOn1450={4}
                            iconLeftName={<MapPin size={30} weight="fill" color="#3cb371" />}
                            slidesToShow={4}
                            slides={destinations}
                        />
                    )}
                </div>
            </div>
            <div className={cx('offers')} style={{ backgroundImage: `url(${images.pattern_bg_2})` }}>
                <div className={cx('offers_left')} style={{ backgroundImage: `url(${images.pattern_bg_3})` }}>
                    <img src={images.offer_1} alt="Img" />
                    <Countdown date={Date.now() + 10 * 24 * 60 * 60 * 1000} renderer={rendererCountDown} />,
                </div>
                <div className={cx('offers_right')}>
                    <div className={cx('offers_header')}>
                        <div className={cx('header_title')}>
                            <SupTitle className={cx('suptitle-max')} right small title={t('common.deals&offers')} />
                            <SupTitle
                                className={cx('suptitle-1000px')}
                                right
                                left
                                small
                                title={t('common.deals&offers')}
                            />
                            <h2>{t('common.lastMinuteAmazing')}</h2>
                        </div>
                        <div className={cx('arrow_list')}>
                            <Button
                                onClick={previousSlide1}
                                className={cx('arrow_button')}
                                circle
                                leftIcon={<ArrowLeft size={22} weight="bold" />}
                            />
                            <Button
                                onClick={nextSlide1}
                                className={cx('arrow_button')}
                                circle
                                leftIcon={<ArrowRight size={22} weight="bold" />}
                            />
                        </div>
                    </div>
                    <div className={cx('offers_list')}>
                        <TourOffer data={toursOfDeal} />
                    </div>
                </div>
            </div>
            <div className={cx('map', 'destination', 'category')}>
                <SupTitle left right primary small title={t('common.topDestinations')} />
                <h2>{t('common.explore')}</h2>
                <div className={cx('map_row')}>
                    <div className={cx('process_list_wrap')}>
                        <ProcessItem data={DATA_PROCESS} />
                    </div>
                    <div className={cx('map_mask')}>
                        <div className={cx('map_mask_img')} style={{ maskImage: `url(${images.map_mask_1})` }}>
                            <img src={images.map_1} alt="Img" />
                        </div>
                        <Dot data={LIST_DOT} />
                    </div>
                </div>
            </div>
            <div className={cx('featured')} style={{ backgroundImage: `url(${images.tour_bg_1})` }}>
                <div className={cx('featured_container')}>
                    <div className={cx('featured_row')}>
                        <div className={cx('title')}>
                            <SupTitle primary right small title={t('common.featuredTours')} />
                            <h2>{t('common.popular')}</h2>
                        </div>
                        <Button primary large onClick={() => navigate(routes.tour)} type="button">
                            {t('common.viewAllTours')}
                        </Button>
                    </div>
                    <div className={cx('featured_tour')}>{tours && <TourItem data={tours} />}</div>
                </div>
            </div>
            <div
                className={cx('team', 'destination', 'category')}
                style={{ backgroundImage: `url(${images.bg_map_3})` }}
            >
                <SupTitle left right primary small title={t('common.testimonials')} />
                <h2>{t('common.whatOur')}</h2>
                <div className={cx('team_box')}>
                    <div className={cx('team_box_arrow')}>
                        <Button onClick={previousSlide} circle leftIcon={<ArrowLeft fontSize={20} />} />
                    </div>
                    <div className={cx('team_box_slider')}>
                        <TeamItem data={DATA_TEAM} />
                    </div>
                    <div className={cx('team_box_arrow')}>
                        <Button onClick={nextSlide} circle leftIcon={<ArrowRight fontSize={20} />} />
                    </div>
                </div>
                <Image
                    pointer
                    circle
                    width="80px"
                    height="80px"
                    src={images.ceo}
                    alt="Img CEO"
                    className={cx('avatar_')}
                    style={{ top: '32%', left: '25%' }}
                />
                <Image
                    pointer
                    circle
                    width="80px"
                    height="80px"
                    src={images.ceo_1}
                    alt="Img CEO"
                    className={cx('avatar_')}
                    style={{ top: '32%', right: '25%' }}
                />
            </div>
            <div className={cx('form')}>
                <div className={cx('form_container')}>
                    <div className={cx('form_wrap')}>
                        <Image className={cx('form_img')} src={images.subscribe_1} alt={'Img subcribe'} />
                        <div className={cx('form_content')}>
                            <h2>{t('common.travelSpecial')}</h2>
                            <p>{t('common.signUp')}</p>
                            <form className={cx('form_input')}>
                                <input placeholder={t('common.enterEmail')} className={cx('input_email')} />
                                <Button primary large>
                                    {t('common.subcribe')}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('new')}>
                <div className={cx('new_suptitle')}>
                    <div>
                        <SupTitle right primary small title={t('common.news&updates')} />
                        <h2>{t('common.ourLast')}</h2>
                    </div>
                    <Button large primary type="button" onClick={() => navigate(routes.blog)}>
                        {t('common.viewAllPost')}
                    </Button>
                </div>
                <div className={cx('new_slider')}>
                    <NewItem data={blogs} />
                </div>
            </div>
        </div>
    );
});

export default Home;
