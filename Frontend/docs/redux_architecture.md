# Project Monitor AI — Frontend Redux & RTK Query Architecture

## 📌 Overview

The **Project Monitor AI** frontend uses **Redux Toolkit (RTK) & RTK Query** as its core state management and asynchronous data-fetching engine. This architecture provides centralized state management, automated server-data caching, tag-based cache invalidation, and auto-generated custom React hooks.

---

## 🏗️ 1. File Building Sequence & Dependency Tree

To maintain strict modularity, files are constructed in a bottom-up sequence:

```text
constants.ts ──► apiSlice.ts ──► Feature API Slices ──► store.ts ──► main.tsx
                                 ├── authApiSlice.ts
                                 ├── projectApiSlice.ts
                                 ├── taskApiSlice.ts
                                 ├── messageApiSlice.ts
                                 ├── notificationsApiSlice.ts
                                 ├── aiApiSlice.ts
                                 └── userApiSlice.ts
```

### Order of Operations:
1. **`constants.ts`**: Centralized URL mapping for all Express backend routes.
2. **`apiSlice.ts`**: Global parent API slice defining `fetchBaseQuery` (base URL, `credentials: 'include'`), re-authentication handling, and global cache `tagTypes`.
3. **Feature API Slices**: Endpoint injection using `apiSlice.injectEndpoints()` for domain modules (Auth, Projects, Tasks, Messages, Notifications, AI, Users).
4. **`authSlice.ts`**: Client-side local Redux slice for user session management and `localStorage` persistence.
5. **`store.ts`**: Central store assembly combining `apiSlice.reducer` and `authSlice.reducer`.
6. **`main.tsx`**: React root wrapper using Redux `<Provider store={store}>`.

---

## ⚡ 2. RTK Query Core Concepts

### A. The `builder` Tool
Redux passes a `builder` object into the `endpoints` callback of every slice. It provides two core methods:
* **`builder.query({ ... })`**: Used strictly for **READ** operations (`GET` requests).
* **`builder.mutation({ ... })`**: Used strictly for **WRITE** operations (`POST`, `PUT`, `PATCH`, `DELETE` requests).

### B. Automated Cache Invalidation Engine
RTK Query avoids manual data re-fetching using a tag-based caching system:
* **`providesTags`**: Attached to `.query()` endpoints. Labels the cached response with a specific tag (e.g. `["Task"]` or `["Project"]`).
* **`invalidatesTags`**: Attached to `.mutation()` endpoints. Signals RTK Query that database data has changed, causing all active queries with matching tags to automatically re-fetch in the background.

---

## 📋 3. Complete Feature API Slices Reference

### 🔐 Auth API Slice (`authApiSlice.ts`)
* `useLoginMutation`: `POST /api/auth/signin`
* `useRegisterMutation`: `POST /api/auth/signup`
* `useLogoutMutation`: `POST /api/auth/logout`
* `useGetProfileQuery`: `GET /api/auth/profile`
* `useForgotPasswordMutation`: `POST /api/auth/forgot-password`
* `useResetPasswordMutation`: `POST /api/auth/reset-password`

### 📁 Projects API Slice (`projectApiSlice.ts`)
* `useGetProjectsQuery`: `GET /api/projects`
* `useGetProjectByIdQuery`: `GET /api/projects/:id`
* `useCreateProjectMutation`: `POST /api/projects`
* `useUpdateProjectMutation`: `PUT /api/projects/:id`
* `useDeleteProjectMutation`: `DELETE /api/projects/:id`

### 📌 Tasks API Slice (`taskApiSlice.ts`)
* `useGetTasksQuery`: `GET /api/tasks`
* `useGetTaskByIdQuery`: `GET /api/tasks/:id`
* `useCreateTaskMutation`: `POST /api/tasks`
* `useUpdateTaskMutation`: `PUT /api/tasks/:id`
* `useUpdateTaskStatusMutation`: `PATCH /api/tasks/:id/status` (Kanban Status Swaps)
* `useDeleteTaskMutation`: `DELETE /api/tasks/:id`
* `useAddTaskCommentMutation`: `POST /api/tasks/:id/comments`
* `useDeleteTaskCommentMutation`: `DELETE /api/tasks/:id/comments/:commentId`

### 💬 Messages API Slice (`messageApiSlice.ts`)
* `useGetMessagesQuery`: `GET /api/messages/:channel`
* `useSendMessageMutation`: `POST /api/messages`
* `useDeleteMessageMutation`: `DELETE /api/messages/:id`
* `useMarkChannelAsReadMutation`: `PATCH /api/messages/:channel/read`

### 🔔 Notifications API Slice (`notificationsApiSlice.ts`)
* `useGetNotificationsQuery`: `GET /api/notifications`
* `useMarkAsReadMutation`: `PATCH /api/notifications/:id/read`
* `useMarkAllAsReadMutation`: `PATCH /api/notifications/read-all`
* `useDeleteNotificationMutation`: `DELETE /api/notifications/:id`
* `useDeleteAllNotificationsMutation`: `DELETE /api/notifications`

### 🤖 AI API Slice (`aiApiSlice.ts`)
* `useTriggerProjectAuditMutation`: `POST /api/projects/:id/audit`
* `useChatWithAIMutation`: `POST /api/ai/chat`

---

## 🔄 4. Runtime Data Flow Diagram

```text
React Component (e.g. Login.tsx)
    │
    ▼ (invokes custom hook)
useLoginMutation({ email, password })
    │
    ▼ (HTTP POST with credentials: include)
Express Backend API (/api/auth/signin)
    │
    ▼ (Sets HTTP-Only Cookie + Returns User Object)
Redux Store (dispatch setCredentials -> updates auth state & localStorage)
    │
    ▼
React UI automatically re-renders & redirects!
```
