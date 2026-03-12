import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryParams } from "../../../Utils/helper";
import { getApiBaseUrl } from "../../../Config/env";

const baseUrl = `${getApiBaseUrl()}/album/`;

export const albumApiService = createApi({
  reducerPath: "albumApi",
  tagTypes: ['Album'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (data) => {
        return {
          url: data?._id ? `get/${data?._id}` : "get",
          params: data?._id ? {} : data,
        };
      },
      providesTags: ['Album'],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
    }),
  }),
});

export const { useGetAlbumsQuery } = albumApiService;
