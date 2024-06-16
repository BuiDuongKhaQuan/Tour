import { createContext, useContext, useMemo } from 'react';
import { useSessionStorage } from './useSessionStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useSessionStorage('user', null);

    const saveData = async (data) => {
        setUser(data);
    };

    const removeData = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            saveData,
            removeData,
        }),
        [user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
