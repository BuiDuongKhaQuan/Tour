import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Destination.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const data = [
    {
        name: 'Switzerland',
        trip: '6+',
        img: images.dest_2_1,
    },
    {
        name: 'Barcelona',
        trip: '8+',
        img: images.dest_2_2,
    },
    {
        name: 'Amsterdam',
        trip: '6+',
        img: images.dest_2_3,
    },
    {
        name: 'Budapest City',
        trip: '5+',
        img: images.dest_2_4,
    },
    {
        name: 'Switzerland',
        trip: '6+',
        img: images.dest_2_1,
    },
    {
        name: 'Barcelona',
        trip: '8+',
        img: images.dest_2_2,
    },
    {
        name: 'Amsterdam',
        trip: '6+',
        img: images.dest_2_3,
    },
    {
        name: 'Budapest City',
        trip: '5+',
        img: images.dest_2_4,
    },
];
export default function Destination() {
    const navigation = useNavigate();
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Destination Name',
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
                accessorKey: 'trip', //normal accessorKey
                header: 'Trip',
                size: 200,
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
                    onClick={() => navigation('/admin-destination-detail')}
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
