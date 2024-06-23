import { MagnifyingGlass } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import FilterBar from '~/components/FilterBar';
import Input from '~/components/Input';
import Pagination from '~/components/Pagination';
import TourCardItem from '~/components/SliderCard/TourCardItem';
import { getCategories, getDestinations, searchTours } from '~/utils/httpRequest';
import LayoutWithSideBar from '../LayoutWithSideBar';
import styles from './Tour.module.scss';
import routes from '~/config/routes';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export default function Tour() {
    const { t } = useTranslation();
    const location = useLocation();
    const [tours, setTours] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [toursSize, setToursSize] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [filters, setFilters] = useState({ destinations: [], categories: [], name: '', hasDeal: false });
    const [searchKeyword, setSearchKeyword] = useState('');

    // Lấy danh sách destinations và categories khi component được mount
    useEffect(() => {
        getData();
    }, [location]);

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

    // Lấy danh sách tour mỗi khi itemOffset hoặc filters thay đổi
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await searchTours({ ...filters, offset: itemOffset, limit: 8 });
                setTours(response.data);
                console.log(response.data);
                setToursSize(response.total);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const data = location.state;
        if (data) {
            setTours(data);
        } else {
            fetchTours();
        }
    }, [itemOffset, filters, location]);

    const pageCount = Math.ceil(toursSize / 8);

    const handlePageClick = (event) => {
        const newOffset = event.selected * 8;
        setItemOffset(newOffset);
    };
    const handleSearchInputChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await searchTours({ name: searchKeyword });
            setToursSize(response.total);
            setTours(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const resetFilters = () => {
        setFilters({ destinations: [], categories: [], name: '', hasDeal: false });
        setItemOffset(0);
    };

    const TourContent = () => {
        if (tours?.length === 0) {
            return (
                <div className={cx('no-tours')}>
                    {t('common.thereAre')}{' '}
                    <Link className={cx('link-tours')} to={routes.tour} onClick={resetFilters}>
                        {t('common.here')}
                    </Link>
                </div>
            );
        }

        return (
            <div className={cx('tour_row')}>
                {tours.map((result, index) => (
                    <TourCardItem data={result} key={index} />
                ))}
            </div>
        );
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setItemOffset(0); // Đặt lại offset khi thay đổi bộ lọc
    };

    return (
        <LayoutWithSideBar
            filterBar={
                <FilterBar destinations={destinations} categories={categories} onFilterChange={handleFilterChange} />
            }
            searchBar={
                <div className={cx('background_item')}>
                    <form
                        className={cx('search-form')}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <Input
                            placeholder={t('common.enterKey')}
                            value={searchKeyword}
                            onChange={handleSearchInputChange}
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
            {toursSize > 8 && (
                <div className={cx('pagination_')}>
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            )}
        </LayoutWithSideBar>
    );
}
