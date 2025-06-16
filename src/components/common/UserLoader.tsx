import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useLazyGetUserQuery } from "@/services/authApi";
import { setCredentials } from "@/store/slices/authSlice";

export default function UserLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [triggerGetUser] = useLazyGetUserQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      triggerGetUser()
        .unwrap()
        .then((user) => {
          dispatch(setCredentials({ token, user }));
        });
    }
  }, [dispatch, triggerGetUser]);

  return <>{children}</>;
}