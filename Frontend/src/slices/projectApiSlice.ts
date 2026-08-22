import { apiSlice } from "./apiSlice";
import { PROJECTS_URL } from "../constants";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: PROJECTS_URL,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    getProjectById: builder.query({
      query: (id: string) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: PROJECTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;