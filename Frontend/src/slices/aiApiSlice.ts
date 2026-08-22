import { apiSlice } from "./apiSlice";
import { PROJECTS_URL, AI_URL } from "../constants";

export const aiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    triggerProjectAudit: builder.mutation({
      query: (projectId: string) => ({
        url: `${PROJECTS_URL}/${projectId}/audit`,
        method: "POST",
      }),
      invalidatesTags: ["Project", "Notification"],
    }),

    chatWithAI: builder.mutation({
      query: (data: { prompt: string; history?: any[] }) => ({
        url: `${AI_URL}/chat`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useTriggerProjectAuditMutation,
  useChatWithAIMutation,
} = aiApiSlice;