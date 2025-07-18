// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import authReducer from './slices/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { dashboardApi } from '@/services/dashboardApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(dashboardApi.middleware),

  
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
