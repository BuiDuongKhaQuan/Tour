import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Select from '~/components/Select';
import Button from '~/components/Button';
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
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useEffect, useRef, useState } from 'react';
import { getDestinationsLimit, getToursLimit } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Home() {
    const DATA_SELECT = [
        {
            id: 1,
            title: 'Destination',
            icon: <MapPin size={20} weight="fill" color="#3cb371" />,
            items: [
                {
                    value: 'switzerland',
                    label: 'Switzerland',
                },
                {
                    value: 'barcelona',
                    label: 'Barcelona',
                },
                {
                    value: 'amsterdam',
                    label: 'Amsterdam',
                },
                {
                    value: 'budapestCity',
                    label: 'Budapest City',
                },
            ],
        },
        {
            id: 2,
            title: 'Activities',
            icon: <PersonSimpleBike size={20} weight="fill" color="#3cb371" />,
            items: [
                {
                    value: 'travel',
                    label: 'Travel',
                },
                {
                    value: 'hiking',
                    label: 'Hiking',
                },
                {
                    value: 'airBallon',
                    label: 'Air Ballon',
                },
                {
                    value: 'peakClimbing',
                    label: 'Peak Climbing',
                },
            ],
        },
        {
            id: 3,
            title: 'Duration',
            icon: <CalendarBlank size={20} weight="fill" color="#3cb371" />,
            items: [
                {
                    value: '3',
                    label: '0 - 3 Days',
                },
                {
                    value: '7',
                    label: '0 - 7 Days',
                },
                {
                    value: '8',
                    label: '3 - 8 Days',
                },
                {
                    value: '12',
                    label: '7 - 12 Days',
                },
            ],
        },
        {
            id: 4,
            title: 'Budget',
            icon: <CurrencyDollarSimple size={20} weight="fill" color="#3cb371" />,
            items: [
                {
                    value: '1',
                    label: '100$ - 300$',
                },
                {
                    value: '3',
                    label: '300$ - 700$',
                },
                {
                    value: '7',
                    label: '700 - 1000$',
                },
                {
                    value: '10',
                    label: '1000$ - 1500$',
                },
            ],
        },
    ];

    const DATA_SERVICE = {
        content:
            'Completely maintain parallel e-business without magnetic relationships. Mesh seamless web-readiness rather.',
        data: [
            { id: 1, img: images.feature_1_1, title: 'A Lot of Discount' },
            { id: 2, img: images.feature_1_2, title: 'Best Guide' },
            { id: 3, img: images.feature_1_3, title: '24/7 Support' },
            { id: 4, img: images.feature_1_4, title: 'Travel Management' },
        ],
    };

    const DATA_OFFERS = [
        {
            name: 'Switzerland',
            trip: '6+',
            img: images.tour_3_1,
            sell: '25% Off',
        },
        {
            name: 'Barcelona',
            trip: '8+',
            img: images.tour_3_2,
            sell: '25% Off',
        },
        {
            name: 'Amsterdam',
            trip: '6+',
            img: images.tour_3_3,
            sell: '25% Off',
        },
    ];

    const DATA_PROCESS = [
        {
            title: 'Find Ans Enjoy A Trip That Fits Your Lifestyle With Your Friends',
            number: '01',
            content:
                'Globally productize flexible potentialities via high-payoff markets. Proactively revolutionize parallel growth strategies.',
        },
        {
            title: 'Travel With More Confidence',
            number: '02',
            content:
                'Globally productize flexible potentialities via high-payoff markets. Proactively revolutionize parallel growth strategies.',
        },
        {
            title: 'See What You Really Get Form Us',
            number: '03',
            content:
                'Globally productize flexible potentialities via high-payoff markets. Proactively revolutionize parallel growth strategies.',
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
            content:
                'Corporate empowered eeamlessly e-enable highly efficient procedure after cross-media strategic theme areas. Enthusiastically formulate meta-services e-services. Quickly optimize future-proof markets through testing',
        },
        {
            name: 'Thai Tran',
            img: images.ceo_1,
            content:
                'The advance of technology is based on making it fit in so that you don"t really even notice it, so it"s part of everyday life.',
        },
    ];

    const DATA_NEWS = [
        {
            title: 'Bali One Life Adventure',
            img: images.tour_1_1,
            position: 'Lasvegus, USA',
            time: '15 July, 2023',
        },
        {
            title: 'Bali One Life Adventure',
            img: images.tour_1_1,
            position: 'Lasvegus, USA',
            time: '15 July, 2023',
        },
        {
            title: 'Bali One Life Adventure',
            img: images.tour_1_1,
            position: 'Lasvegus, USA',
            time: '15 July, 2023',
        },
    ];
    const [tours, setTours] = useState([]);
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await getToursLimit(0, 8);
                setTours(response.tours);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTours();
    }, []);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await getDestinationsLimit(0, 8);
                setDestinations(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDestinations();
    }, []);
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
        sliderRef.current.slickPrev(); // Gọi hàm slickPrev() từ ref
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
                    <p>CEO of Travel</p>
                </div>
            ))}
        </SliderCard>
    );

    const NewItem = ({ data }) => (
        <SliderCard slidesToShow={3} slidesToShowOn1024={2} slidesToShowOn1200={2} slidesToShowOn1450={3}>
            {data.map((result, index) => (
                <div className={cx('new_item')} key={index}>
                    {!!(index % 2) && <Image animation className={cx('new_img')} src={result.img} alt={result.title} />}
                    <div className={cx('new_information')}>
                        <div className={cx('new_item_time')}>
                            <span className={cx('time')}>
                                <Tag size={18} weight="duotone" color="#3cb371" />
                                {result.position}
                            </span>
                            <span className={cx('location')}>
                                <Calendar size={18} weight="duotone" color="#3cb371" />
                                {result.time}
                            </span>
                        </div>
                        <h3 className={cx('new_title')}>
                            <Link>{result.title}</Link>
                        </h3>
                        <Link className={cx('new_read_more')}>
                            READ MORE
                            <ArrowUpRight size={18} className={cx('detail_icon')} color="#3cb371" weight="bold" />
                        </Link>
                    </div>
                    {!!(index % 2) || <Image animation className={cx('new_img')} src={result.img} alt={result.title} />}
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
                        <SupTitle primary right title={'Enjoy Every Good Moment'} />
                        <h1 className={cx('hero_title')}>Plan Your Trip With</h1>
                        <h1 className={cx('hero_title')}>Travel House.</h1>
                        <p className={cx('p_title')}>
                            We always make our customer happy by providing as many choices possible for customers in
                            traveling.
                        </p>
                        <Button primary large>
                            GET STARTED
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
            <div className={cx('search')}>
                <div className={cx('search_container')}>
                    <div className={cx('search_box')}>
                        <form action="mail.php" method="POST" className={cx('tour_search')}>
                            {DATA_SELECT.map((result) => (
                                <Select className={cx('search_box-select')} data={result} key={result.id} />
                            ))}
                            <Button large primary>
                                SEARCH
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={cx('service')}>
                <ServiceItem data={DATA_SERVICE.data} content={DATA_SERVICE.content} />
            </div>
            <div className={cx('category')}>
                <SupTitle left right primary small title={'Categories'} />
                <h2>Browse By Destination Category</h2>
                <div className={cx('_row')}>
                    <Categories data={destinations} />
                </div>
            </div>
            <div className={cx('aboutus')}>
                <div className={cx('about_left')}>
                    <div className={cx('about_left_top')}>
                        <SupTitle className={cx('suptitle-max')} right small primary title={'About Us'} />
                        <SupTitle className={cx('suptitle-1000px')} right left small primary title={'About Us'} />
                        <h2>The Perfect Travel Place For You & Your Family</h2>
                        <p>
                            Progressively impact multidisciplinary leadership skills via e-business leadership skills.
                            Holisticly repurpose multifunctional data before turnkey information. Globally restore
                            client-focused potentialities before scalable core competencies.
                        </p>
                    </div>
                    <div className={cx('about_left_bottom')}>
                        <div className={cx('left_bottom_item')}>
                            <h2>25+</h2>
                            <p>Years Of Experiences</p>
                        </div>
                        <div className={cx('left_bottom_item')}>
                            <h2>15+</h2>
                            <p>Years Of Experiences</p>
                        </div>
                        <div className={cx('left_bottom_item')}>
                            <h2>35+</h2>
                            <p>Years Of Experiences</p>
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
                <SupTitle left right primary small title={'Top Destinations'} />
                <h2>Popular Destinations</h2>
                <div className={cx('_row')}>
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
                </div>
            </div>
            <div className={cx('offers')} style={{ backgroundImage: `url(${images.pattern_bg_2})` }}>
                <div className={cx('offers_left')} style={{ backgroundImage: `url(${images.pattern_bg_3})` }}>
                    <img src={images.offer_1} alt="Img" />
                    <ul className={cx('offers_countdown')}>
                        <li>
                            <div className={cx('count_number')}>00</div>
                            <span>Days</span>
                        </li>
                        <li>
                            <div className={cx('count_number')}>00</div>
                            <span>Housr</span>
                        </li>
                        <li>
                            <div className={cx('count_number')}>00</div>
                            <span>Minutes</span>
                        </li>
                        <li>
                            <div className={cx('count_number')}>00</div>
                            <span>Senconds</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('offers_right')}>
                    <div className={cx('offers_header')}>
                        <div className={cx('header_title')}>
                            <SupTitle className={cx('suptitle-max')} right small title={'Deals & Offers'} />
                            <SupTitle className={cx('suptitle-1000px')} right left small title={'Deals & Offers'} />
                            <h2>Last Minute Amazing Deals</h2>
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
                        <SliderCard
                            ref={sliderRef1}
                            slidesToShow={3}
                            animation
                            slidesToShowOn770={2}
                            slidesToShowOn1024={2}
                            slidesToShowOn1200={3}
                            slidesToShowOn1450={3}
                            large
                            textInImg
                            sellOff
                            slides={DATA_OFFERS}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('map', 'destination', 'category')}>
                <SupTitle left right primary small title={'Top Destinations'} />
                <h2>Explore the World For Yourself</h2>
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
                            <SupTitle primary right small title={'Featured Tours'} />
                            <h2>Most Popular Tours</h2>
                        </div>
                        <Button primary large>
                            View All Tours
                        </Button>
                    </div>
                    <div className={cx('featured_tour')}>
                        <TourItem data={tours} />
                    </div>
                </div>
            </div>
            <div
                className={cx('team', 'destination', 'category')}
                style={{ backgroundImage: `url(${images.bg_map_3})` }}
            >
                <SupTitle left right primary small title={'Testimonials'} />
                <h2>What Our Customer Say</h2>
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
                            <h2>Get Special Offers And More From Travon</h2>
                            <p>Sign up now and get the best deals straight in your inbox!</p>
                            <form className={cx('form_input')}>
                                <input placeholder="Enter Email Address" className={cx('input_email')} />
                                <Button primary large>
                                    SUBCRIBE
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('new')}>
                <div className={cx('new_suptitle')}>
                    <div>
                        <SupTitle right primary small title={'News & Updates'} />
                        <h2>Our Latest News & Articles</h2>
                    </div>
                    <Button large primary>
                        VIEW ALL POST
                    </Button>
                </div>
                <div className={cx('new_slider')}>
                    <NewItem data={DATA_NEWS} />
                </div>
            </div>
        </div>
    );
}

export default Home;
