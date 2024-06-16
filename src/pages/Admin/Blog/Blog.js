import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, getBlogs } from '~/utils/httpRequest';
import { formattedDate, showNotifications } from '~/utils/constants';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

export default function Blog() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            const response = await getBlogs();
            setBlogs(response.data);
        };
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteBlog(id);
            setBlogs(response.data);
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
                accessorKey: 'topic', //access nested data with dot notation
                header: 'Blog Name',
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
                            src={row.original.image && row.original.image?.url}
                            loading="lazy"
                            style={{ borderRadius: '10px', width: '150px' }}
                        />
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 200,
                Cell: ({ row }) => {
                    let statusLabel;
                    switch (row.original.status) {
                        case 2:
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
                accessorKey: 'create_at', //normal accessorKey
                header: 'Day create',
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
        data: blogs,
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
                navigate(`/admin-blog/${row.original.id}`);
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
                    onClick={() => navigate(routes.admin_blog_create)}
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
                        const selectedRows = table.getSelectedRowModel().rows;
                        selectedRows.forEach((row) => {
                            handleDelete(row.original.id);
                        });
                    }}
                    variant="contained"
                >
                    Delete Selected Blogs
                </Button>
                <Button
                    primary
                    small
                    color="error"
                    disabled={!table.getIsSomeRowsSelected() || table.getSelectedRowModel().rows.length !== 1}
                    onClick={() => {
                        const selectedRows = table.getSelectedRowModel().rows;
                        if (selectedRows.length > 0) {
                            const blog = selectedRows[0].original; // Select the first blog
                            navigate(`/admin-blog/${blog.id}`, { state: blog }); // Pass as an object with a key
                        }
                    }}
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
