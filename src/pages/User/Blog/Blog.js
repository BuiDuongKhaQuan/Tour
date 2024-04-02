import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const data = [
    {
        img: images.tour_1_1,
        time: '21 June, 2024',
        user: 'admin',
        content:
            'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
        title: 'Get Tips For Making the Most of Your Summer',
    },
    {
        img: images.tour_1_1,
        time: '21 June, 2024',
        user: 'admin',
        content:
            'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
        title: 'Get Tips For Making the Most of Your Summer',
    },
    {
        img: images.tour_1_1,
        time: '21 June, 2024',
        user: 'admin',
        content:
            'Phosfluorescently unleash highly efficient experiences for team driven scenarios. Conveniently enhance cross-unit communities with accurate testing procedures. Dynamically embrace team building expertise. Proactively monetize parallel solutions.',
        title: 'Get Tips For Making the Most of Your Summer',
    },
];
export default function Blog() {
    const navigation = useNavigate();
    const columns = useMemo(
        () => [
            {
                accessorKey: 'title', //access nested data with dot notation
                header: 'Blog Name',
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
                accessorKey: 'user',
                header: 'User',
                size: 200,
            },
            {
                accessorKey: 'time', //normal accessorKey
                header: 'Time',
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
                        alert('Create New Blog');
                    }}
                    variant="contained"
                >
                    Create Blog
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => {
                        alert('Delete Selected Blogs');
                    }}
                    variant="contained"
                >
                    Delete Selected Blogs
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => navigation('/admin-blog-detail')}
                    variant="contained"
                >
                    Edit Selected Blogs
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
