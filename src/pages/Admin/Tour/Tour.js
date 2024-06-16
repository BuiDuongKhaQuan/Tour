import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tour.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { deleteTour, getTours } from '~/utils/httpRequest';
import CurrencyFormat from 'react-currency-format';
import routes from '~/config/routes';
import { showNotifications } from '~/utils/constants';

const cx = classNames.bind(styles);

export default function Tour() {
    const navigate = useNavigate();
    const [tours, setTours] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getTours();
            setTours(response.data);
        };
        getData();
    }, []);
    const handleDelete = async (id) => {
        try {
            const response = await deleteTour(id);
            setTours(response.data);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Delete Error',
                type: 'danger',
                message: 'Network error, please try again later',
            });
            console.error(error);
        }
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Tour Name',
                size: 250,
                Cell: ({ renderedCellValue, row }) => {
                    const handleClick = () => {
                        const tour = row.original;
                        navigate(`/admin-tour/${tour.id}`); // Pass as an object with a key
                    };
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                            }}
                            onClick={handleClick}
                        >
                            <img
                                alt="avatar"
                                height={100}
                                src={row.original.images && row.original.images[0]?.url}
                                loading="lazy"
                                style={{ borderRadius: '10px', width: '150px' }}
                            />
                            <span>{renderedCellValue}</span>
                        </Box>
                    );
                },
            },
            {
                accessorKey: 'destination', //normal accessorKey
                header: 'Position',
                size: 200,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue ? renderedCellValue.name : ''}</span>,
            },
            {
                accessorKey: 'personQuantity',
                header: 'Persion',
                size: 150,
            },
            {
                accessorKey: 'date',
                header: 'Day',
                size: 150,
            },
            {
                accessorKey: 'price',
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
        ],
        [navigate],
    );

    const table = useMaterialReactTable({
        columns,
        data: tours,
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
                    onClick={() => navigate(routes.admin_tour_creat)}
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
                        const selectedRows = table.getSelectedRowModel().rows;
                        selectedRows.forEach((row) => {
                            handleDelete(row.original.id);
                        });
                    }}
                    variant="contained"
                >
                    Delete Selected Tours
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected() || table.getSelectedRowModel().rows.length !== 1}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const tour = selectedRows[0].original; // Select the first tour
                            navigate(`/admin-tour/${tour.id}`); // Pass as an object with a key
                        }
                    }}
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
