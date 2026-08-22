import express from "express";
import {
    signUp,
    signIn,
    logOut,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    forgotPassword,
    resetPassword,
    verifyEmail
} from "../controllers/auth.controller.js";
import { protect, manager } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authLimiter } from "../middlewares/limiter.middleware.js";
import { 
    signUpValidator, 
    signInValidator, 
    forgotPasswordValidator, 
    resetPasswordValidator 
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", authLimiter, validate(signUpValidator), signUp);
router.post("/signin", authLimiter, validate(signInValidator), signIn);
router.post("/logout", logOut);
router.post("/forgot-password", authLimiter, validate(forgotPasswordValidator), forgotPassword);
router.post("/reset-password", validate(resetPasswordValidator), resetPassword);
router.post("/verify-email", verifyEmail);

router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route("/:id")
    .delete(protect, manager, deleteUser);

export default router;
