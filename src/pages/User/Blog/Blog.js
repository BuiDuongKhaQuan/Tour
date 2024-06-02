import React, { useState } from 'react';
import styles from './Blog.module.scss';
import classNames from 'classnames/bind';
import LayoutWithSideBar from '../LayoutWithSideBar';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ArrowRight, Calendar, Tag, User } from '@phosphor-icons/react';
import Pagination from '~/components/Pagination';
import routes from '~/config/routes';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Blog() {
    const DATA_BLOG = [
        {
            img: images.tour_1_1,
            time: '21 June, 2024',
            user: 'admin',
            content:
                'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
            title: 'Get Tips For Making the Most of Your Summer',
        },
        {
            img: images.tour_1_1,
            time: '21 June, 2024',
            user: 'admin',
            content:
                'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
            title: 'Get Tips For Making the Most of Your Summer',
        },
        {
            img: images.tour_1_1,
            time: '21 June, 2024',
            user: 'admin',
            content:
                'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
            title: 'Get Tips For Making the Most of Your Summer',
        },
    ];
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 4;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = DATA_BLOG.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(DATA_BLOG.length / 4);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 4) % DATA_BLOG.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };
    const BlogContent = () => (
        <>
            <div className={cx('blog_row')}>
                {currentItems.map((result, index) => (
                    <div className={cx('blog_wrapper')} key={index}>
                        <Link to={routes.blog_detail}>
                            <Image pointer animation src={result.img} alt={result.title} />
                        </Link>
                        <div className={cx('blog_content')}>
                            <div className={cx('blog_infor')}>
                                <span className={cx('infor_item')}>
                                    <User className={cx('infor_item_icon')} weight="fill" />
                                    {result.user}
                                </span>
                                <span className={cx('infor_item')}>
                                    <Calendar className={cx('infor_item_icon')} weight="fill" />
                                    {result.time}
                                </span>
                                <span className={cx('infor_item')}>
                                    <Tag className={cx('infor_item_icon')} weight="fill" />
                                    Travel
                                </span>
                            </div>
                            <Link to={routes.blog_detail}>
                                <h2>{result.title}</h2>
                            </Link>
                            <p>{result.content}</p>
                            <Button
                                to={routes.blog_detail}
                                primary
                                large
                                rightIcon={<ArrowRight size={20} weight="bold" />}
                            >
                                READ MODE
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('pagination_')}>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </div>
        </>
    );

    return (
        <LayoutWithSideBar searchBar>
            <BlogContent />
        </LayoutWithSideBar>
    );
}
