import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { API_BASE_URL } from '@/config/apiConfig'

// Reuse axiosBaseQuery as defined in your shared utility
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

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
//   baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.restful-api.dev/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<any[], void>({
      query: () => ({
        url: 'objects',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),

    // You can add other dashboard-related queries here in the future
    getStats: builder.query<any, void>({
      query: () => ({
        url: 'dashboard/stats',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
})

// Export hooks
export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetStatsQuery,
  useLazyGetStatsQuery,
} = dashboardApi
