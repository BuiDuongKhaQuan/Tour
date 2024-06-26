import config from '~/config';
import {
    AdminAccount,
    AdminAccountDetail,
    AdminHome,
    AdminTour,
    AdminTourDetail,
    AdminDestination,
    AdminDestinationDetail,
    AdminBlog,
    AdminBlogDetail,
    AdminContact,
    AdminContactDetail,
    AdminTicket,
    AdminTicketDetail,
    AdminDeals,
    AdminDealsDetail,
    AdminCompany,
    AdminOrder,
    AdminOrderDetail,
} from '~/pages/Admin';
import {
    AboutUs,
    Blog,
    BlogDetail,
    Contact,
    Destination,
    DestinationDetail,
    Error404,
    Home,
    Profile,
    Tour,
    TourDetail,
    TourLoved,
    Order,
    OrderDetail,
    Payment,
} from '~/pages/User';

const { routes, roles } = config;

const publicRouters = [
    { path: routes.home, component: Home },
    { path: routes.profile, roles: roles.user, component: Profile },
    { path: routes.contact, component: Contact },
    { path: routes.about_us, component: AboutUs },
    { path: routes.blog, component: Blog },
    { path: routes.blog_detail, component: BlogDetail },
    { path: routes.destination, component: Destination },
    { path: routes.destination_detail, component: DestinationDetail },
    { path: routes.tour, component: Tour },
    { path: routes.tour_loved, roles: roles.user, component: TourLoved },
    { path: routes.tour_detail, component: TourDetail },
    { path: routes.error_404, component: Error404 },
    { path: routes.payment, roles: roles.user, component: Payment },
    { path: routes.order, roles: roles.user, component: Order },
    { path: routes.order_detail, roles: roles.user, component: OrderDetail },
];

const privateRoutes = [
    { path: routes.admin, roles: roles.admin, component: AdminHome },
    { path: routes.admin_account, roles: roles.admin, component: AdminAccount },
    { path: routes.admin_account_detail, roles: roles.admin, component: AdminAccountDetail },
    { path: routes.admin_tour, roles: roles.admin, component: AdminTour },
    { path: routes.admin_tour_detail, roles: roles.admin, component: AdminTourDetail },
    {
        path: routes.admin_tour_creat,
        roles: roles.admin,
        component: (props) => <AdminTourDetail {...props} create={true} />,
    },
    { path: routes.admin_destination, roles: roles.admin, component: AdminDestination },
    { path: routes.admin_destination_detail, roles: roles.admin, component: AdminDestinationDetail },
    {
        path: routes.admin_destination_create,
        roles: roles.admin,
        component: (props) => <AdminDestinationDetail {...props} create={true} />,
    },
    { path: routes.admin_blog, roles: roles.admin, component: AdminBlog },
    { path: routes.admin_blog_detail, roles: roles.admin, component: AdminBlogDetail },
    {
        path: routes.admin_blog_create,
        roles: roles.admin,
        component: (props) => <AdminBlogDetail {...props} create={true} />,
    },
    { path: routes.admin_contact, roles: roles.admin, component: AdminContact },
    { path: routes.admin_contact_detail, roles: roles.admin, component: AdminContactDetail },
    { path: routes.admin_ticket, roles: roles.admin, component: AdminTicket },
    { path: routes.admin_ticket_detail, roles: roles.admin, component: AdminTicketDetail },
    {
        path: routes.admin_ticket_create,
        roles: roles.admin,
        component: (props) => <AdminTicketDetail {...props} create={true} />,
    },
    { path: routes.admin_deals, roles: roles.admin, component: AdminDeals },
    { path: routes.admin_deals_detail, roles: roles.admin, component: AdminDealsDetail },
    {
        path: routes.admin_deals_create,
        roles: roles.admin,
        component: (props) => <AdminDealsDetail {...props} create={true} />,
    },
    { path: routes.admin_company, roles: roles.admin, component: AdminCompany },
    { path: routes.admin_order, roles: roles.admin, component: AdminOrder },
    { path: routes.admin_order_detail, roles: roles.admin, component: AdminOrderDetail },
];

export { publicRouters, privateRoutes };
