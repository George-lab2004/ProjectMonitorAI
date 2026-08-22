import { apiSlice } from "./apiSlice";
import { MESSAGES_URL } from "../constants";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (channel: string) => ({
        url: `${MESSAGES_URL}/${channel}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    sendMessage: builder.mutation({
      query: (data: { channel: string; body: string; fileUrl?: string; fileName?: string }) => ({
        url: MESSAGES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `${MESSAGES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),

    markChannelAsRead: builder.mutation({
      query: (channel: string) => ({
        url: `${MESSAGES_URL}/${channel}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useMarkChannelAsReadMutation,
} = messageApiSlice;