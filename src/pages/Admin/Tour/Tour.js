import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Tour.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const data = [
    {
        name: 'Bali One Life Adventure',
        img: images.tour_1_1,
        position: 'Lasvegus, USA',
        persion: '52+',
        day: '07',
        price: '350',
        review: 5,
    },
    {
        name: 'Places To Travel November',
        img: images.tour_1_2,
        position: ' Barcelona, Spain',
        persion: '100+',
        day: '13',
        price: '350',
        review: 5,
    },
    {
        name: 'Brooklyn Beach Resort Tour',
        img: images.tour_1_3,
        position: ' Madrid, Spain',
        persion: '50+',
        day: '10',
        price: '650',
        review: 5,
    },
    {
        name: 'Brooklyn Christmas Lights',
        img: images.tour_1_4,
        position: ' Lasvegus, USA',
        persion: '312+',
        day: '15',
        price: '450',
        review: 5,
    },
];
export default function Tour() {
    const navigation = useNavigate();
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Tour Name',
                size: 250,
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt="avatar"
                            height={100}
                            src={row.original.img}
                            loading="lazy"
                            style={{ borderRadius: '10px' }}
                        />
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: 'position', //normal accessorKey
                header: 'Position',
                size: 200,
            },
            {
                accessorKey: 'persion',
                header: 'Persion',
                size: 150,
            },
            {
                accessorKey: 'day',
                header: 'Day',
                size: 150,
            },
            {
                accessorKey: 'price',
                header: 'Price',
                size: 150,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        muiTableBodyCellProps: ({ row }) => ({
            //conditionally style selected rows
            sx: {
                fontSize: '15px',
                '&:hover': {
                    fontWeight: 'bold',
                },
            },
        }),
        muiTableCellProps: {
            // Tăng kích thước của tất cả các ô trong bảng
            sx: {
                fontSize: '15px',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'normal',
                fontSize: '20px',
            },
        },
        muiPaginationProps: {
            showRowsPerPage: true,
            shape: 'rounded',
        },
        paginationDisplayMode: 'pages',
        enableRowSelection: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                <Button
                    primary
                    small
                    color="secondary"
                    onClick={() => {
                        alert('Create New Tour');
                    }}
                    variant="contained"
                >
                    Create Tour
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => {
                        alert('Delete Selected Tours');
                    }}
                    variant="contained"
                >
                    Delete Selected Tours
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => navigation('/admin-tour-detail')}
                    variant="contained"
                >
                    Edit Selected Tours
                </Button>
            </Box>
        ),
    });

    return (
        <div className={cx('wrapper')}>
            <MaterialReactTable table={table} />
        </div>
    );
}
