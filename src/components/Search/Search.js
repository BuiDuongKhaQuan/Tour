import React from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Select from '../Select';
import Input from '../Input';
import Button from '../Button';

const cx = classNames.bind(styles);

// Sử dụng React.memo để tối ưu hóa component Search
const Search = React.memo(({ handleSearchByCriteria, DATA_SELECT, setSearchCriteria, keyword, setKeyword }) => {
    return (
        <div className={cx('search')}>
            <div className={cx('search_container')}>
                <div className={cx('search_box')}>
                    <form className={cx('tour_search')} onSubmit={handleSearchByCriteria}>
                        <Select onChange={setSearchCriteria} className={cx('search_box-select')} data={DATA_SELECT} />
                        <Input
                            classNameInput={cx('search_box-input')}
                            placeholder={'Enter keyword'}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <Button large primary type="submit">
                            SEARCH
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Search;
