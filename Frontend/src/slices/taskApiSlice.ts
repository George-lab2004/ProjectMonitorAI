import { apiSlice } from "./apiSlice";
import { TASKS_URL } from "../constants";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: TASKS_URL,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    getTaskById: builder.query({
      query: (id: string) => ({
        url: `${TASKS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: TASKS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    updateTaskStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `${TASKS_URL}/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    addTaskComment: builder.mutation({
      query: ({ id, body }: { id: string; body: string }) => ({
        url: `${TASKS_URL}/${id}/comments`,
        method: "POST",
        body: { body },
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTaskComment: builder.mutation({
      query: ({ id, commentId }: { id: string; commentId: string }) => ({
        url: `${TASKS_URL}/${id}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useAddTaskCommentMutation,
  useDeleteTaskCommentMutation,
} = taskApiSlice;