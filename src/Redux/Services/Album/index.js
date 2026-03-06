import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryParams } from "../../../Utils/helper";
import { getApiBaseUrl } from "../../../Config/env";

const baseUrl = `${getApiBaseUrl()}/album/`;

export const albumApiService = createApi({
  reducerPath: "albumApi",
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
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetAlbumsQuery } = albumApiService;
