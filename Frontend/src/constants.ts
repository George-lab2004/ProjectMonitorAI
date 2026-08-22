export const BASE_URL = import.meta.env.DEV
    ? "http://localhost:3000"  // your local backend port
    : ""  // use Vercel reverse proxy in production

// Auth API URLs
export const AUTH_URL = "/api/auth"
export const LOGIN_URL = "/api/auth/signin"
export const REGISTER_URL = "/api/auth/signup"
export const LOGOUT_URL = "/api/auth/logout"
export const PROFILE_URL = "/api/auth/profile"
export const FORGOT_PASSWORD_URL = "/api/auth/forgot-password"
export const RESET_PASSWORD_URL = "/api/auth/reset-password"
export const VERIFY_EMAIL_URL = "/api/auth/verify-email"

// Module API URLs
export const PROJECTS_URL = "/api/projects"
export const TASKS_URL = "/api/tasks"
export const MESSAGES_URL = "/api/messages"
export const NOTIFICATIONS_URL = "/api/notifications"
export const PUSHER_URL = "/api/pusher"
export const AI_URL = "/api/ai"


