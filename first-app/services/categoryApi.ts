// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {BASE_URL} from "@/constants/urls";
import {IGenericResponse} from "@/types/IGenericResponse";

// Define a service using a base URL and expected endpoints

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/api' }),
    endpoints: (builder) => ({
        getCategories: builder.query<IGenericResponse<ICategoryResponse[]>, void>({
            query:() => '/categories',
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useGetCategoriesQuery } = categoryApi