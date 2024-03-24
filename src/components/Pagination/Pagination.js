import React from 'react';
import ReactPaginate from 'react-paginate';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

const cx = classNames.bind(styles);

export default function Pagination({ handlePageClick, pageCount }) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<Button square leftIcon={<ArrowRight size={20} />} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<Button square leftIcon={<ArrowLeft size={20} />} />}
            renderOnZeroPageCount={null}
            className={cx('pagination')}
            pageClassName={cx('page_item')}
            pageLinkClassName={cx('page_link')}
            activeClassName={cx('active')}
        />
    );
}
