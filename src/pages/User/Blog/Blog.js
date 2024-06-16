import { ArrowRight, Calendar, Tag, User } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Pagination from '~/components/Pagination';
import { formattedDate } from '~/utils/constants';
import { getBlogLimit, getBlogSize } from '~/utils/httpRequest';
import LayoutWithSideBar from '../LayoutWithSideBar';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [blogsSize, setBlogsSize] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    // Lấy kích thước danh sách blog một lần khi component được mount
    useEffect(() => {
        const fetchBlogsSize = async () => {
            try {
                const size = await getBlogSize();
                setBlogsSize(size.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogsSize();
    }, []);

    // Lấy danh sách blog mỗi khi itemOffset thay đổi
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogLimit(itemOffset, 5);
                setBlogs(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, [itemOffset]);

    const pageCount = Math.ceil(blogsSize / 5);

    const handlePageClick = (event) => {
        const newOffset = event.selected * 5;
        setItemOffset(newOffset);
    };

    const BlogContent = () => (
        <div className={cx('blog_row')}>
            {blogs.map((result, index) => (
                <div className={cx('blog_wrapper')} key={index}>
                    <Link to={`/blog/${result.id}`}>
                        <Image pointer animation src={result.image?.url} alt={result?.topic} height={550} />
                    </Link>
                    <div className={cx('blog_content')}>
                        <div className={cx('blog_infor')}>
                            <span className={cx('infor_item')}>
                                <User className={cx('infor_item_icon')} weight="fill" />
                                Travel
                            </span>
                            <span className={cx('infor_item')}>
                                <Calendar className={cx('infor_item_icon')} weight="fill" />
                                {formattedDate(new Date(result.createdAt))}
                            </span>
                            <span className={cx('infor_item')}>
                                <Tag className={cx('infor_item_icon')} weight="fill" />
                                Travel
                            </span>
                        </div>
                        <Link to={`/blog/${result.id}`}>
                            <h2>{result.topic}</h2>
                        </Link>
                        <Button
                            to={`/blog/${result.id}`}
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
    );

    return (
        <LayoutWithSideBar searchBar categoryBar>
            <BlogContent />
            <div className={cx('pagination_')}>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </div>
        </LayoutWithSideBar>
    );
}
