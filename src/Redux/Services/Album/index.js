import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryParams } from "../../../Utils/helper";

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/album/`;

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
        console.log(data, "wow");
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
