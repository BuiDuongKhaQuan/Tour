import { MagnifyingGlass } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import FilterBar from '~/components/FilterBar';
import Input from '~/components/Input';
import Pagination from '~/components/Pagination';
import TourCardItem from '~/components/SliderCard/TourCardItem';
import { getCategories, getDestinations } from '~/utils/httpRequest';
import LayoutWithSideBar from '../LayoutWithSideBar';
import styles from './TourLoved.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function TourLoved() {
    const [destinations, setDestinations] = useState([]);
    const [categories, setCategories] = useState([]);
    const toursLoved = JSON.parse(localStorage.getItem('tours-loved')) || [];
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 8;
    const currentItems = toursLoved.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(toursLoved.length / 8);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getDestinations();
                const response1 = await getCategories();
                setDestinations(response.data);
                setCategories(response1.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 8) % toursLoved.length;
        setItemOffset(newOffset);
    };

    const TourContent = () => {
        if (toursLoved.length === 0) {
            return (
                <div className={cx('no-tours')}>
                    Chưa có tour nào được yêu thích. Xem tour{' '}
                    <Link className={cx('link-tours')} to={routes.tour}>
                        Tại đây
                    </Link>
                </div>
            );
        }

        return (
            <div className={cx('tour_row')}>
                {currentItems.map((result, index) => (
                    <TourCardItem data={result} key={index} />
                ))}
            </div>
        );
    };

    return (
        <LayoutWithSideBar
            filterBar={<FilterBar destinations={destinations} categories={categories} />}
            searchBar={
                <div className={cx('background_item')}>
                    <form className={cx('search-form')}>
                        <Input
                            placeholder={'Enter Keyword'}
                            // value={searchKeyword}
                            // onChange={handleSearchInputChange}
                            button={
                                <Button
                                    type="submit"
                                    primary
                                    className={cx('icon')}
                                    leftIcon={<MagnifyingGlass size={20} color="#ffffff" />}
                                />
                            }
                        />
                    </form>
                </div>
            }
            categoryBar
            classNameSideBar={cx('side-bar')}
        >
            <TourContent />
            {toursLoved.length > 8 && (
                <div className={cx('pagination_')}>
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            )}
        </LayoutWithSideBar>
    );
}
