import { AppDispatch } from "@/store/store";
import { setCredentials } from "@/store/slices/authSlice";
import { GetUserApi } from "@/services/authApi";
import { useLazyGetUserQuery } from "@/services/authApi";


// Shared function for login/signup
export const handleAuthSuccess = async (
  token: string,
  triggerGetUser: ReturnType<typeof useLazyGetUserQuery>,
  dispatch: AppDispatch,
  onSuccess?: () => void
) => {
  try {
    localStorage.setItem("token", token);
    const user = await triggerGetUser().unwrap();
    dispatch(setCredentials({ token, user }));
    console.log("✅ Auth and user fetch successful");

    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Failed to fetch user after login/signup", err);
    localStorage.removeItem("token");
  }
};
