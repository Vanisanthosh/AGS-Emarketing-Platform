import { AppDispatch } from "@/store/store";
import { setCredentials } from "@/store/slices/authSlice";
import { GetUserApi } from "@/services/authApi";

export const handleAuthSuccess = async (
  token: string,
  dispatch: AppDispatch,
  onSuccess?: () => void
) => {
  try {
    localStorage.setItem("token", token);

    // ✅ Don't fetch user here. UserLoader will do it on route change.
    dispatch(setCredentials({ token, user: null }));
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Token set failed", err);
    localStorage.removeItem("token");
  }
};
