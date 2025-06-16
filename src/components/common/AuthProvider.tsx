// src/components/common/AuthProvider.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../../store/slices/authSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        
        if (token && user && user !== "undefined") {
            dispatch(setCredentials({ token, user: JSON.parse(user) }));
        }
    }, [dispatch]);

    return <>{children}</>;
}
