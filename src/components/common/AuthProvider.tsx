// src/components/common/AuthProvider.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../../store/slices/authSlice";
import { useLazyGetUserQuery } from "../../services/authApi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const [getUser] = useLazyGetUserQuery();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          getUser()
            .unwrap()
            .then((user) => {
              dispatch(setCredentials({ token, user }));
            })
            .catch(() => {
              dispatch(logout()); // if token is invalid, force logout
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
    }, [dispatch, getUser]);
    
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return <>{children}</>;
}
