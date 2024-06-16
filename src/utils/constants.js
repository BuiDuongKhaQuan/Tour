import { GenderIntersex } from '@phosphor-icons/react';
import moment from 'moment-timezone';
import { AiOutlineBorderInner } from 'react-icons/ai';
import { GrStatusDisabled } from 'react-icons/gr';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { Store } from 'react-notifications-component';
import images from '~/assets/images';

const notification = {
    title: 'Successfully!',
    message: 'Configurable',
    type: 'success',
    insert: 'top',
    container: 'top-right',
    dismiss: {
        duration: 3000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
    },
    animationIn: ['animate__animated animate__bounceIn'], // `animate.css v4` classes
    animationOut: ['animate__animated animate__flipOutX'], // `animate.css v4` classes
};
const showNotifications = (data) =>
    Store.addNotification({
        ...notification,
        ...data,
    });
const initialOptions = {
    'client-id': 'AR1QUPTEt9oj4C3raLjQOGYEGcrFzgWLqHISnrWaX5vFSpT6Vt0sXsndBIqPrEfLuktbyT_rexxOnGO-',
    'enable-funding': 'venmo',
    'disable-funding': '',
    currency: 'USD',
    'data-page-type': 'product-details',
    components: 'buttons',
    'data-sdk-integration-source': 'developer-studio',
};
const DATA_CATE = [
    {
        title: 'Hill Tracking(8)',
        to: '/index',
    },
    {
        title: 'Adventure(5)',
        to: '/index',
    },
    {
        title: 'Village Beauty(6)',
        to: '/index',
    },
    {
        title: 'Night View(8)',
        to: '/index',
    },
    {
        title: 'Religious Place(7)',
        to: '/index',
    },
    {
        title: 'Lake View(3)',
        to: '/index',
    },
    {
        title: 'Sea Area(5)',
        to: '/index',
    },
    {
        title: 'Resourt(4)',
        to: '/index',
    },
];
const DATA_DEAL = [
    { title: 'Brooklyn Christmas Lights', img: images.cat_1_1, price: 250 },
    { title: 'Brooklyn Christmas Lights', img: images.cat_1_1, price: 250 },
    { title: 'Brooklyn Christmas Lights', img: images.cat_1_1, price: 250 },
];
const DATA_SELECT = [
    {
        id: 1,
        title: 'Ticket Types',
        items: [
            {
                value: '1',
                label: 'Basic Ticket',
            },
            {
                value: '2',
                label: 'Standard Ticket (+30%)',
            },
            {
                value: '3',
                label: 'Vip Ticket (+60%)',
            },
        ],
    },
    {
        id: 2,
        title: 'Adult',
        items: [
            {
                value: '1',
                label: '1 Adult',
            },
            {
                value: '2',
                label: '2 Adult',
            },
            {
                value: '3',
                label: '3 Adult',
            },
        ],
    },
    {
        id: 3,
        title: 'Child',
        items: [
            {
                value: '0',
                label: '0 Child',
            },
            {
                value: '1',
                label: '1 Child',
            },
            {
                value: '2',
                label: '2 Child',
            },
            {
                value: '3',
                label: '3 Child',
            },
        ],
    },
];
const DATA_GENDER_SELECT = {
    id: 1,
    title: 'Gender',
    icon: <GenderIntersex weight="bold" size={23} />,
    items: [
        {
            value: '1',
            label: 'Male',
        },
        {
            value: '2',
            label: 'Female',
        },
    ],
};
const DATA_STATUS_SELECT = {
    id: 1,
    title: 'Status',
    icon: <GrStatusDisabled size={18} />,
    items: [
        {
            value: 1,
            label: 'Posted',
        },
        {
            value: 2,
            label: 'Not posted',
        },
        {
            value: 3,
            label: 'Hide',
        },
    ],
};

const DATA_STATUS_USER_SELECT = {
    id: 1,
    title: 'Status',
    icon: <GrStatusDisabled size={23} />,
    items: [
        {
            value: 1,
            label: 'Active',
        },
        {
            value: 2,
            label: 'Not active',
        },
        {
            value: 3,
            label: 'Lock',
        },
    ],
};
const DATA_ROLE_SELECT = {
    id: 1,
    title: 'Role',
    icon: <AiOutlineBorderInner size={27} />,
    items: [
        {
            value: '1',
            label: 'Admin',
        },
        {
            value: '2',
            label: 'User',
        },
    ],
};
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
];

const modulesQuill = {
    toolbar: toolbarOptions,
};
const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const formattedDate = (date) => {
    const formatted = moment(date).tz('Asia/Ho_Chi_Minh').format('YYYY MMMM DD, HH:mm:ss');
    return toTitleCase(formatted);
};

const formattedDay = (date) => {
    const formatted = moment(date).tz('Asia/Ho_Chi_Minh').format('YYYY MMMM DD');
    return toTitleCase(formatted);
};

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export {
    DATA_CATE,
    DATA_DEAL,
    DATA_GENDER_SELECT,
    DATA_ROLE_SELECT,
    DATA_SELECT,
    DATA_STATUS_SELECT,
    DATA_STATUS_USER_SELECT,
    formattedDate,
    formattedDay,
    getTodayDate,
    initialOptions,
    modulesQuill,
    notification,
    showNotifications,
    toTitleCase,
};
