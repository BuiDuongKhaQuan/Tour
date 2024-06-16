import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Destination.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { deleteDestination, getDestinations } from '~/utils/httpRequest';
import { formattedDate, showNotifications } from '~/utils/constants';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function Destination() {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getDestinations();
            setDestinations(response.data);
        };
        getData();
    }, []);
    const handleDelete = async (id) => {
        try {
            const response = await deleteDestination(id);
            setDestinations(response.data);
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
                header: 'Destination Name',
                size: 250,
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            alt="avatar"
                            height={100}
                            src={row.original.image && row.original.image.url}
                            loading="lazy"
                            style={{ borderRadius: '10px', width: '150px' }}
                        />
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: 'trips', //normal accessorKey
                header: 'Trip',
                size: 200,
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
                Cell: ({ row }) => {
                    const date = new Date(row.original.createdAt);
                    return <span>{formattedDate(date)}</span>;
                },
            },
        ],
        [],
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
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                navigate(`/admin-destination/${row.original.id}`);
            },
            sx: {
                cursor: 'pointer',
            },
        }),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                <Button
                    primary
                    small
                    color="secondary"
                    onClick={() => navigate(routes.admin_destination_create)}
                    variant="contained"
                >
                    Create Destination
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
                    Delete Selected Destination
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected() || table.getSelectedRowModel().rows.length !== 1}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const destination = selectedRows[0].original; // Select the first destination
                            navigate(`/admin-destination/${destination.id}`, { state: destination }); // Pass as an object with a key
                        }
                    }}
                    variant="contained"
                >
                    Edit Selected Destination
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
