import { apiSlice } from "./apiSlice";
import { NOTIFICATIONS_URL } from "../constants";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: NOTIFICATIONS_URL,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    markAsRead: builder.mutation({
      query: (id: string) => ({
        url: `${NOTIFICATIONS_URL}/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    markAllAsRead: builder.mutation({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/read-all`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    deleteNotification: builder.mutation({
      query: (id: string) => ({
        url: `${NOTIFICATIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),

    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: NOTIFICATIONS_URL,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} = notificationsApiSlice;