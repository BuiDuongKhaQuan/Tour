import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { getBookings } from '~/utils/httpRequest';
import CurrencyFormat from 'react-currency-format';
import routes from '~/config/routes';
import { formattedDate } from '~/utils/constants';

const cx = classNames.bind(styles);

export default function Booking() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getBookings();
            setBookings(response.data);
        };
        getData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'user', //access nested data with dot notation
                header: 'User name',
                size: 150,
                Cell: ({ row }) => <span>{row.original.user?.name}</span>,
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                size: 150,
            },
            {
                accessorKey: 'adultQuantity', //normal accessorKey
                header: 'Adult',
                size: 150,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue} người</span>,
            },
            {
                accessorKey: 'childQuantity',
                header: 'Child',
                size: 150,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue} người</span>,
            },
            {
                accessorKey: 'date',
                header: 'Date',
                size: 150,
            },
            {
                accessorKey: 'totalPrice',
                header: 'Price',
                size: 150,
                Cell: ({ cell }) => (
                    <CurrencyFormat
                        value={cell.getValue()}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'}
                        decimalScale={2}
                    />
                ),
            },
            {
                accessorKey: 'createdAt', //normal accessorKey
                header: 'Day created',
                size: 200,
                Cell: ({ row }) => {
                    const date = new Date(row.original.createdAt);
                    return <span>{formattedDate(date)}</span>;
                },
            },
        ],
        [navigate],
    );

    const table = useMaterialReactTable({
        columns,
        data: bookings,
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
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                navigate(`/admin-order/${row.original.id}`);
            },
            sx: {
                cursor: 'pointer',
            },
        }),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                <Button primary small color="secondary" onClick={() => navigate(routes.order)} variant="contained">
                    Create Booking
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected() || table.getSelectedRowModel().rows.length !== 1}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const order = selectedRows[0].original; // Select the first order
                            navigate(`/admin-order/${order.id}`); // Pass as an object with a key
                        }
                    }}
                    variant="contained"
                >
                    See Selected Bookings
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
