import React, { useState } from 'react';
import styles from './FilterBar.module.scss';
import classNames from 'classnames/bind';
import H2Decoration from '../H2Decoration';
import Button from '../Button';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export default function FilterBar({ destinations, categories, onFilterChange }) {
    const { t } = useTranslation();
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [hasDeal, setHasDeal] = useState(false);

    const handleCheckboxChange = (setState, state, value) => {
        setState(state.includes(value) ? state.filter((item) => item !== value) : [...state, value]);
    };

    const handleFilterChange = () => {
        onFilterChange({ destinations: selectedDestinations, categories: selectedCategories, hasDeal });
    };
    return (
        <div className={cx('background_item')}>
            <H2Decoration>{t('common.tourFilter')}</H2Decoration>
            <div className={cx('filter')}>
                <div className={cx('filter-item')}>
                    <span className={cx('filter-title')}>{t('common.destination')}</span>
                    {destinations.map((des, index) => (
                        <label className={cx('content')} key={index}>
                            <input
                                type="checkbox"
                                value={des.id}
                                onChange={() =>
                                    handleCheckboxChange(setSelectedDestinations, selectedDestinations, des.id)
                                }
                            />
                            {des.name}
                        </label>
                    ))}
                </div>
                <div className={cx('filter-item')}>
                    <span className={cx('filter-title')}>{t('common.categories')}</span>
                    {categories.map((cat, index) => (
                        <label className={cx('content')} key={index}>
                            <input
                                type="checkbox"
                                value={cat.id}
                                onChange={() => handleCheckboxChange(setSelectedCategories, selectedCategories, cat.id)}
                            />
                            {cat.name}
                        </label>
                    ))}
                </div>
                <div className={cx('filter-item')}>
                    <span className={cx('filter-title')}>{t('common.deals')}</span>
                    <label className={cx('content')}>
                        <input type="checkbox" onChange={() => setHasDeal(!hasDeal)} />
                        Has Deal
                    </label>
                </div>
                <Button primary small onClick={handleFilterChange}>
                    {t('common.applyFilter')}
                </Button>
            </div>
        </div>
    );
}
