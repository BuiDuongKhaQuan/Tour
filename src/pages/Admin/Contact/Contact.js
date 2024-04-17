import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const data = [
    {
        name: 'Bali One Life Adventure',
        email: 'quan@gmail.com',
        phone: 'Lasvegus, USA',
        topic: '52+',
        message: '07',
    },
    {
        name: 'Bali One Life Adventure',
        email: 'quan@gmail.com',
        phone: 'Lasvegus, USA',
        topic: '52+',
        message: '07',
    },
    {
        name: 'Bali One Life Adventure',
        email: 'quan@gmail.com',
        phone: 'Lasvegus, USA',
        topic: '52+',
        message: '07',
    },
    {
        name: 'Bali One Life Adventure',
        email: 'quan@gmail.com',
        phone: 'Lasvegus, USA',
        topic: '52+',
        message: '07',
    },
];
export default function Contact() {
    const navigation = useNavigate();
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Contact Name',
                size: 250,
            },
            {
                accessorKey: 'email', //normal accessorKey
                header: 'Email',
                size: 200,
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                size: 150,
            },
            {
                accessorKey: 'topic',
                header: 'Topic',
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
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => {
                        alert('Delete Selected Contacts');
                    }}
                    variant="contained"
                >
                    Delete Selected Contacts
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => navigation('/admin-contact-detail')}
                    variant="contained"
                >
                    Answer Selected Contacts
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
