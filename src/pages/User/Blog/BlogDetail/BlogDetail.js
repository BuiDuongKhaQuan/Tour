import React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';
import images from '~/assets/images';
import { Calendar, Tag, User } from '@phosphor-icons/react';
import Image from '~/components/Image';
import LayoutWithSideBar from '../../LayoutWithSideBar';

const cx = classNames.bind(styles);

export default function BlogDetail() {
    const DATA_BLOG = {
        img: images.tour_1_1,
        time: '21 June, 2024',
        user: 'admin',
        content:
            'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
        title: 'Get Tips For Making the Most of Your Summer',
    };

    const BlogContent = () => (
        <div className={cx('blog_wrapper')}>
            <Image pointer animation src={DATA_BLOG.img} alt={DATA_BLOG.title} />
            <div className={cx('blog_content')}>
                <div className={cx('blog_infor')}>
                    <span className={cx('infor_item')}>
                        <User className={cx('infor_item_icon')} weight="fill" />
                        {DATA_BLOG.user}
                    </span>
                    <span className={cx('infor_item')}>
                        <Calendar className={cx('infor_item_icon')} weight="f   ill" />
                        {DATA_BLOG.time}
                    </span>
                    <span className={cx('infor_item')}>
                        <Tag className={cx('infor_item_icon')} weight="fill" />
                        Travel
                    </span>
                </div>
                <h2>{DATA_BLOG.title}</h2>
                <div className={cx('main_content')}></div>
            </div>
        </div>
    );

    return (
        <LayoutWithSideBar searchBar>
            <BlogContent />
        </LayoutWithSideBar>
    );
}
