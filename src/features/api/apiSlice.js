// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "./endpoints";

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

// export const apiSlice = createApi({
//   baseQuery,
//   endpoints: () => ({}),
// });





import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../services/baseQueryWithAxios';

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: () => ({}),
});
