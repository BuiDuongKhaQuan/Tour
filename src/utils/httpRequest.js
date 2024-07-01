import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

request.interceptors.request.use(
    (config) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.accessToken) {
            config.headers['x-access-token'] = user.accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const getUsers = async () => {
    try {
        const response = await request.get('/users/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const updateRoles = async (userId, selectedRoles) => {
    try {
        const response = await request.put(`/users/${userId}/roles`, { roles: selectedRoles });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findUserById = async (id) => {
    try {
        const response = await request.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const register = async (name, email, password) => {
    try {
        const response = await request.post('/users/register', {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verify = async (email, otp) => {
    try {
        const response = await request.put('/users/verify', {
            otp,
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await request.post('/users/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response || error.message || error);
        throw error;
    }
};
export const updateUser = async (id, data) => {
    try {
        const response = await request.put(`/users/${id}/edit`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const logout = async () => {
    try {
        const response = await request.post('users/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCategories = async () => {
    try {
        const response = await request.get('/categories/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getDestinations = async () => {
    try {
        const response = await request.get('/destinations/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const searchTours = async (data) => {
    try {
        const response = await request.post('/tours/search', data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const searchBlog = async (data) => {
    try {
        const response = await request.post('/blogs/search', data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const searchDestination = async (data) => {
    try {
        const response = await request.post('/destinations/search', data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findDestinationById = async (id) => {
    try {
        const response = await request.get(`/destinations/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getDestinationsSize = async () => {
    try {
        const response = await request.get('/destinations/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getDestinationsLimit = async (start, page) => {
    try {
        const response = await request.get(`/destinations?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const createDestination = async (data) => {
    try {
        const response = await request.post(`/destinations`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateDestination = async (id, data) => {
    try {
        const response = await request.put(`/destinations/${id}/edit`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDestination = async (id) => {
    try {
        const response = await request.delete(`/destinations/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const getTours = async () => {
    try {
        const response = await request.get('/tours/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findTourById = async (id) => {
    try {
        const response = await request.get(`/tours/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findTourByDeal = async (id) => {
    try {
        const response = await request.get(`/tours/deal`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findAllTourByColumn = async (column, value) => {
    try {
        const response = await request.get(`/tours?column=${column}&value=${value}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const deleteTour = async (id) => {
    try {
        const response = await request.delete(`/tours/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getToursSize = async () => {
    try {
        const response = await request.get('/tours/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getToursLimit = async (start, page) => {
    try {
        const response = await request.get(`/tours?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateTour = async (id, data) => {
    try {
        const response = await request.put(`/tours/${id}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createTour = async (data) => {
    try {
        const response = await request.post(`/tours`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const deleteImgTour = async (data) => {
    try {
        const response = await request.post(`/tours/image`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateImgTour = async (data) => {
    try {
        const response = await request.post(`/tours/update-image`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const addImgTour = async (id, data) => {
    try {
        const response = await request.post(`/tours/${id}/add-image`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const book = async (data) => {
    try {
        const response = await request.post('/bookings', data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getBookings = async (data) => {
    try {
        const response = await request.get('/bookings/all', data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateBookings = async (id, data) => {
    try {
        const response = await request.put(`/bookings/${id}/edit`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findOrderById = async (id) => {
    try {
        const response = await request.get(`/bookings/${id}}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getBookingsByStatus = async (userId, status) => {
    try {
        const response = await request.get(`/bookings?userId=${userId}&status=${status}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const paypalOrder = async (tourId, price) => {
    try {
        const data = {
            cart: [
                {
                    id: tourId,
                    quantity: '1',
                },
            ],
            price,
        };

        const response = await request.post('/paypal/orders', data);

        return response.data;
    } catch (error) {
        throw new Error('Error creating PayPal order: ' + error.message);
    }
};
export const paypalCapture = async (orderID) => {
    try {
        const response = await request.post(`/paypal/orders/${orderID}/capture`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const paypalSendMail = async (orderData, email, tourBookedId) => {
    try {
        const response = await request.post('/paypal/orders/sendMail', { orderData, email, tourBookedId });

        return response.data;
    } catch (error) {
        throw new Error('Error creating PayPal order: ' + error.message);
    }
};

export const getBlogs = async () => {
    try {
        const response = await request.get('/blogs/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findBlogById = async (id) => {
    try {
        const response = await request.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateBlog = async (id, data) => {
    try {
        const response = await request.put(`/blogs/${id}/edit`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createBlog = async (data) => {
    try {
        const response = await request.post(`/blogs`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const deleteBlog = async (id) => {
    try {
        const response = await request.delete(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const getBlogSize = async () => {
    try {
        const response = await request.get('/blogs/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getBlogLimit = async (start, page) => {
    try {
        const response = await request.get(`/blogs?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

//Contact
export const getContacts = async () => {
    try {
        const response = await request.get('/contacts/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findContactById = async (id) => {
    try {
        const response = await request.get(`/contacts/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateContact = async (id, data) => {
    try {
        const response = await request.post(`/contacts/${id}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createContact = async (data) => {
    try {
        const response = await request.post(`/contacts`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const answerContact = async (id, data) => {
    try {
        const response = await request.put(`/contacts/${id}/answer`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const deleteContact = async (id) => {
    try {
        const response = await request.delete(`/contacts/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const getContactSize = async () => {
    try {
        const response = await request.get('/contacts/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getContactLimit = async (start, page) => {
    try {
        const response = await request.get(`/contacts?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

//Ticket
export const getTickets = async () => {
    try {
        const response = await request.get('/tickets/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findTicketById = async (id) => {
    try {
        const response = await request.get(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateTicket = async (id, data) => {
    try {
        const response = await request.put(`/tickets/${id}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createTicket = async (data) => {
    try {
        const response = await request.post(`/tickets`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const answerTicket = async (id, data) => {
    try {
        const response = await request.put(`/tickets/${id}/answer`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const deleteTicket = async (id) => {
    try {
        const response = await request.delete(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const getTicketSize = async () => {
    try {
        const response = await request.get('/tickets/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getTicketLimit = async (start, page) => {
    try {
        const response = await request.get(`/tickets?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

//Deals
export const getDeals = async () => {
    try {
        const response = await request.get('/deals/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findDealsByExpiry = async () => {
    try {
        const response = await request.get(`/deals/expiry-date`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findDealsById = async (id) => {
    try {
        const response = await request.get(`/deals/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateDeals = async (id, data) => {
    try {
        const response = await request.put(`/deals/${id}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createDeals = async (data) => {
    try {
        const response = await request.post(`/deals`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const deleteDeals = async (id) => {
    try {
        const response = await request.delete(`/deals/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const getDealsSize = async () => {
    try {
        const response = await request.get('/deals/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getDealsLimit = async (start, page) => {
    try {
        const response = await request.get(`/deals?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

//Review
export const getReview = async () => {
    try {
        const response = await request.get('/reviews/all');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findReviewById = async (id) => {
    try {
        const response = await request.get(`/reviews/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const findReviewByTourId = async (tourId) => {
    try {
        const response = await request.get(`/reviews?tourId=${tourId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateReview = async (id, data) => {
    try {
        const response = await request.put(`/reviews/${id}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createReview = async (data) => {
    try {
        const response = await request.post(`/reviews`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const answerReview = async (id, data) => {
    try {
        const response = await request.put(`/reviews/${id}/answer`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const deleteReview = async (id) => {
    try {
        const response = await request.delete(`/reviews/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

export const getReviewSize = async () => {
    try {
        const response = await request.get('/reviews/all-size');
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const getReviewLimit = async (start, page) => {
    try {
        const response = await request.get(`/reviews?start=${start}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

//Company
export const findCompanyById = async () => {
    try {
        const response = await request.get(`/company/1`);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
export const updateCompany = async (data) => {
    try {
        const response = await request.put(`/company/1/edit`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default request;
