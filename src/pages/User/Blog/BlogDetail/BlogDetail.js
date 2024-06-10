import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';
import images from '~/assets/images';
import { Calendar, Tag, User } from '@phosphor-icons/react';
import Image from '~/components/Image';
import LayoutWithSideBar from '../../LayoutWithSideBar';
import { useParams } from 'react-router-dom';
import { findBlogById } from '~/utils/httpRequest';
import { formattedDate } from '~/utils/constants';

const cx = classNames.bind(styles);

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        topic: '',
        information: '',
        createdAt: '',
        image: { url: '' },
    });

    useEffect(() => {
        const getBlog = async () => {
            const response = await findBlogById(id);
            setBlog(response.data);
        };
        getBlog();
    }, []);

    const BlogContent = () => (
        <div className={cx('blog_wrapper')}>
            <Image pointer height={500} animation src={blog.image?.url} alt={blog.topic} />
            <div className={cx('blog_content')}>
                <div className={cx('blog_infor')}>
                    <span className={cx('infor_item')}>
                        <User className={cx('infor_item_icon')} weight="fill" />
                        Travel
                    </span>
                    <span className={cx('infor_item')}>
                        <Calendar className={cx('infor_item_icon')} weight="f   ill" />
                        {formattedDate(new Date(blog.createdAt))}
                    </span>
                    <span className={cx('infor_item')}>
                        <Tag className={cx('infor_item_icon')} weight="fill" />
                        Travel
                    </span>
                </div>
                <h2>{blog.topic}</h2>
            </div>
            <div className={cx('main_content')}>
                <div className="ql-snow">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: blog.information }} />
                </div>
            </div>
        </div>
    );

    return (
        <LayoutWithSideBar searchBar categoryBar>
            <BlogContent />
        </LayoutWithSideBar>
    );
}
