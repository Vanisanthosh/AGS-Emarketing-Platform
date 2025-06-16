import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { API_BASE_URL } from '@/config/apiConfig';
 
const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params, headers })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
 
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: { id: string; name: string; email: string }; token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        data: credentials,
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response: any) => {
        return {
          user: response.user,
          token: response.token,
        };
      },
    }),
    register: builder.mutation<
      { user: { id: string; name: string; email: string }; token: string },
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        data: userData,
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response: any) => {
        return {
          user: response.user
        };
      },
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: 'user', // adjust this endpoint
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
})
 
// Export hooks
export const { useLoginMutation, useRegisterMutation, useLazyGetUserQuery } = authApi
 
 