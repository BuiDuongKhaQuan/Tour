import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { ContentCopy } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '~/utils/httpRequest';
import AvatarCustom from '~/components/AvatarCustom/AvatarCustom';

const cx = classNames.bind(styles);

export default function Account() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getUsers();
            setUsers(response.data);
        };
        getData();
    }, []);
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Last Name',
                size: 200,
                Cell: ({ renderedCellValue, row }) => {
                    const handleClick = () => {
                        const user = row.original;
                        navigate(`/admin-account/${user.id}`);
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
                            <AvatarCustom
                                src={row.original.avatar && row.original.avatar.url}
                                stringAva={renderedCellValue ? renderedCellValue : ''}
                            />
                            <span>{renderedCellValue}</span>
                        </Box>
                    );
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
                enableClickToCopy: true,
                muiCopyButtonProps: {
                    fullWidth: true,
                    startIcon: <ContentCopy />,
                    sx: { justifyContent: 'flex-start' },
                },
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
                size: 200,
            },
            {
                accessorKey: 'gender',
                header: 'Gender',
                size: 150,
            },
        ],
        [navigate],
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
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
                        alert('Create New Account');
                    }}
                    variant="contained"
                >
                    Create Account
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={() => {
                        alert('Delete Selected Accounts');
                    }}
                    variant="contained"
                >
                    Delete Selected Accounts
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected() || table.getSelectedRowModel().rows.length !== 1}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const user = selectedRows[0].original; // Select the first destination
                            navigate(`/admin-account/${user.id}`);
                        }
                    }}
                    variant="contained"
                >
                    Edit Selected Accounts
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
