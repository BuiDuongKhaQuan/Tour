import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { deleteContact, getContacts } from '~/utils/httpRequest';
import { showNotifications } from '~/utils/constants';
import { ContentCopy } from '@mui/icons-material';

const cx = classNames.bind(styles);

export default function Contact() {
    const navigate = useNavigate();
    const [contact, setContacts] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getContacts();
            setContacts(response.data);
        };
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteContact(id);
            setContacts(response.data);
            showNotifications({ message: response.message });
        } catch (error) {
            showNotifications({
                title: 'Update Error',
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
                header: 'Name',
                size: 250,
            },
            {
                accessorKey: 'email', //normal accessorKey
                header: 'Email',
                size: 200,
                enableClickToCopy: true,
                muiCopyButtonProps: {
                    fullWidth: true,
                    startIcon: <ContentCopy />,
                    sx: { justifyContent: 'flex-start' },
                },
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
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
                Cell: ({ row }) => {
                    let statusLabel;
                    switch (row.original.status) {
                        case 1:
                            statusLabel = 'Not answered';
                            break;
                        case 2:
                            statusLabel = 'Answered';
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
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: contact,
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
                navigate(`/admin-contact/${row.original.id}`);
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
                    Delete Selected Contacts
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const contact = selectedRows[0].original; // Select the first contact
                            navigate(`/admin-contact/${contact.id}`); // Pass as an object with a key
                        }
                    }}
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
