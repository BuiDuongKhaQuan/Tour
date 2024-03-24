import React from 'react';
import classNames from 'classnames/bind';
import styles from './DestinationDetail.module.scss';
import Breadcumb from '~/components/Breadcumb';
import { MapPin } from '@phosphor-icons/react';
import images from '~/assets/images';
import SliderCard, { TourCardItem } from '~/components/SliderCard';

const cx = classNames.bind(styles);

export default function DestinationDetail({ data }) {
    const DATA_TOURS = [
        {
            name: 'Bali One Life Adventure',
            img: images.tour_4_1,
            position: 'Lasvegus, USA',
            persion: '52+',
            day: '07',
            price: '350',
            review: 5,
        },
        {
            name: 'Places To Travel November',
            img: images.tour_4_2,
            position: ' Barcelona, Spain',
            persion: '100+',
            day: '13',
            price: '350',
            review: 5,
        },
        {
            name: 'Brooklyn Beach Resort Tour',
            img: images.tour_4_3,
            position: ' Madrid, Spain',
            persion: '50+',
            day: '10',
            price: '650',
            review: 5,
        },
    ];

    return (
        <div className={cx('des_detail_wrapper')}>
            <Breadcumb breadcumb_wrapper={'Home'} />
            <div className={cx('des_detail_container')}>
                <div className={cx('des_detail_top')}>
                    <h2>
                        <MapPin weight="fill" color="#3cb371" />
                        Paris
                    </h2>
                    <p>
                        Dynamically leverage other's excellent collaboration and idea-sharing via multimedia based
                        applications. Appropriately incentivize go forward leadership skills rather than business
                        processes. Globally synthesize focused innovation vis-à-vis resource sucking technology.
                        Monotonically recapitalize client-centered markets rather than excellent paradigms. Objectively
                        orchestrate multifunctional. Efficiently implement accurate e-services after superior
                        imperatives.{<br />}
                        Collaboratively architect one-to-one niche markets vis-à-vis alternative niche market.
                        Completely engineer alternative mindshare vis-à-vis strategic total linkage. Efficiently
                        formulate worldwide schemas without interdependent metric. Dramatically morph compelling growth
                        strategies whereas standardized processes. Credibly embrace extensive core competencies after
                        reliable channel. Conveniently parallel task strategic sources for team driven leadership
                        skills. Distinctively build cross-media potentialities via unique technology. Energetically
                        reintermediation. Monotonically monetize reliable networks vis-à-vis extensive mindshare.
                        Monotonically restore standards compliant e-tailers before equity invested e-business.
                        Assertively mecarbinate interdependent infrastructures whereas cooperative e-services.
                        Proactively restore emerging.
                    </p>
                    <h2 className={cx('h3')}>Hiking</h2>
                    <p>
                        Seamlessly streamline world-class paradigms and 2.0 materials. Completely network excellent
                        bandwidth without extensive convergence. Continually facilitate user-centric portals whereas
                        highly efficient core competencies. Synergistically grow enterprise result for
                        principle-centered niche market. Monotonically parallel task cross-media data for economically
                        sound partnerships. Objectively pontificate equity invested partnerships through multimedia
                        based relationships. Proactively visualize resource maximizing leadership skills and fully
                        tested solutions. Dramatically simplify focused results via innovative action items. Seamlessly
                        incubate just in time e-markets after revolutionary ideas. Completely parallel task dynamic
                        total linkage after e-business niche markets. {<br />}Compellingly maintain client-focused
                        technology for functionalized innovation. Competently maximize interactive interfaces via
                        intermediated action items. Conveniently utilize extensible functionalities before high-payoff
                        initiatives. Rapaciously transition efficient markets vis-à-vis adaptive leadership. Globally
                        disintermediate synergistic networks through web-enabled results. Globally harness
                        cross-platform content via economically sound partnerships. Proactively.
                    </p>
                </div>
                <div className={cx('tour_list')}>
                    <SliderCard slidesToShow={3}>
                        {DATA_TOURS.map((result, index) => (
                            <TourCardItem data={result} key={index} />
                        ))}
                    </SliderCard>
                </div>
                <div className={cx('des_detail_top')}>
                    <h2 className={cx('h3')}>Hot Air Ballon</h2>
                    <p>
                        Dynamically leverage other's excellent collaboration and idea-sharing via multimedia based
                        applications. Appropriately incentivize go forward leadership skills rather than business
                        processes. Globally synthesize focused innovation vis-à-vis resource sucking technology.
                        Monotonically recapitalize client-centered markets rather than excellent paradigms. Objectively
                        orchestrate multifunctional. Efficiently implement accurate e-services after superior
                        imperatives.{<br />}
                        Collaboratively architect one-to-one niche markets vis-à-vis alternative niche market.
                        Completely engineer alternative mindshare vis-à-vis strategic total linkage. Efficiently
                        formulate worldwide schemas without interdependent metric. Dramatically morph compelling growth
                        strategies whereas standardized processes. Credibly embrace extensive core competencies after
                        reliable channel. Conveniently parallel task strategic sources for team driven leadership
                        skills. Distinctively build cross-media potentialities via unique technology. Energetically
                        reintermediation. Monotonically monetize reliable networks vis-à-vis extensive mindshare.
                        Monotonically restore standards compliant e-tailers before equity invested e-business.
                        Assertively mecarbinate interdependent infrastructures whereas cooperative e-services.
                        Proactively restore emerging.
                    </p>
                </div>
                <div className={cx('tour_list')}>
                    <SliderCard slidesToShow={3}>
                        {DATA_TOURS.map((result, index) => (
                            <TourCardItem data={result} key={index} />
                        ))}
                    </SliderCard>
                </div>
            </div>
        </div>
    );
}
