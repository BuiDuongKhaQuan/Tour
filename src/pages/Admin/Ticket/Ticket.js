import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Ticket.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { deleteTicket, getTickets } from '~/utils/httpRequest';
import { formattedDate, showNotifications } from '~/utils/constants';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function Ticket() {
    const navigate = useNavigate();
    const [destinations, setTickets] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getTickets();
            setTickets(response.data);
        };
        getData();
    }, []);
    const handleDelete = async (id) => {
        try {
            const response = await deleteTicket(id);
            setTickets(response.data);
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
                accessorKey: 'id', //access nested data with dot notation
                header: 'Stt',
                size: 200,
                Cell: ({ renderedCellValue, row }) => {
                    return (
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/admin-ticket/${row.original.id}`)}
                        >
                            {renderedCellValue}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'type', //normal accessorKey
                header: 'Type',
                size: 200,
                Cell: ({ renderedCellValue, row }) => {
                    return (
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/admin-ticket/${row.original.id}`)}
                        >
                            {renderedCellValue}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'value', //normal accessorKey
                header: 'Value',
                size: 200,
                Cell: ({ renderedCellValue }) => <span>{renderedCellValue}%</span>,
            },
            {
                accessorKey: 'status', //normal accessorKey
                header: 'Status',
                size: 200,
                Cell: ({ row }) => {
                    let statusLabel;
                    switch (row.original.status) {
                        case 0:
                            statusLabel = 'Not posted';
                            break;
                        case 1:
                            statusLabel = 'Posted';
                            break;
                        case 3:
                            statusLabel = 'Hide';
                            break;
                        default:
                            statusLabel = 'Unknown';
                    }
                    return <span>{statusLabel}</span>;
                },
            },
            {
                accessorKey: 'createdAt', //normal accessorKey
                header: 'Day created',
                size: 200,
                Cell: ({ renderedCellValue }) => {
                    const date = new Date(renderedCellValue);
                    return <span>{formattedDate(date)}</span>;
                },
            },
        ],
        [navigate],
    );

    const table = useMaterialReactTable({
        columns,
        data: destinations,
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
                    onClick={() => navigate(routes.admin_ticket_create)}
                    variant="contained"
                >
                    Create Ticket
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
                    Delete Selected Ticket
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected() || table.getSelectedRowModel().rows.length !== 1}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const ticket = selectedRows[0].original; // Select the first ticket
                            navigate(`/admin-ticket/${ticket.id}`); // Pass as an object with a key
                        }
                    }}
                    variant="contained"
                >
                    Edit Selected Ticket
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
