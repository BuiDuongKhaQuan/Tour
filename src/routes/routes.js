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
} from '~/pages/User';

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.about_us, component: AboutUs },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blog_detail, component: BlogDetail },
    { path: config.routes.destination, component: Destination },
    { path: config.routes.destination_detail, component: DestinationDetail },
    { path: config.routes.tour, component: Tour },
    { path: config.routes.tour_detail, component: TourDetail },
    { path: config.routes.error_404, component: Error404 },
];

const privateRoutes = [
    { path: config.routes.admin, component: AdminHome },
    { path: config.routes.admin_account, component: AdminAccount },
    { path: config.routes.admin_account_detail, component: AdminAccountDetail },
    { path: config.routes.admin_tour, component: AdminTour },
    { path: config.routes.admin_tour_detail, component: AdminTourDetail },
    { path: config.routes.admin_destination, component: AdminDestination },
    { path: config.routes.admin_destination_detail, component: AdminDestinationDetail },
    { path: config.routes.admin_blog, component: AdminBlog },
    { path: config.routes.admin_blog_detail, component: AdminBlogDetail },
    { path: config.routes.admin_contact, component: AdminContact },
    { path: config.routes.admin_contact_detail, component: AdminContactDetail },
];

export { publicRouters, privateRoutes };
