import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout, { DefaultLayoutAdmin } from '~/layouts';
import { privateRoutes, publicRouters } from '~/routes';
import { ProtectedRoute } from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './hooks/useAuth';

function App() {
    const { user } = useAuth();

    const renderRoute = (route, index, Layout) => {
        const Page = route.component;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        <Page />
                    </Layout>
                }
            />
        );
    };

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Layout = route.layout || (route.layout === null ? Fragment : DefaultLayout);
                        return renderRoute(route, index, Layout);
                    })}
                    <Route element={<ProtectedRoute isAllowed={!!user} />}>
                        {privateRoutes.map((route, index) => {
                            const Layout = route.layout || (route.layout === null ? Fragment : DefaultLayoutAdmin);
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ProtectedRoute isAllowed={!!user && user.roles.includes(route.roles)}>
                                            <Layout>
                                                <route.component />
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
