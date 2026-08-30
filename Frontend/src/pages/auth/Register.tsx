import { ArrowRight, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "../../slices/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import toast from "react-hot-toast";

// 1. Zod Schema
const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name must be less than 20 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function Register() {
  const [signup, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. React Hook Form Setup
  const { 
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const passwordValue = watch("password");

  // 3. Form Submit Handler
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const res = await signup({ name: data.name, email: data.email, password: data.password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Account created successfully!");
      reset();
      navigate("/");
    } catch (err: any) {
      if (err?.data?.field === "email") {
        setError("email", { type: "server", message: err.data.message });
      } else {
        toast.error(err?.data?.message || "Failed to create account.");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center font-[Syne] bg-linear-to-r from-blue-900 via-primary to-gray-500 bg-clip-text text-transparent font-bold mb-6">
        Create Account
      </h1>

      {/* HTML Form wired to handleSubmit */}
      <div className="w-full flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-4 sm:px-0">
          <fieldset className="fieldset rounded-box w-full">
            
            {/* Name Input */}
            <label className="label text-sm font-bold font-display">Full Name</label>
            <input
              type="text"
              {...register("name")}
              className="input w-full rounded-xl border-2"
              placeholder="Full Name"
            />
            {errors.name && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.name.message}</p>}

            {/* Email Input */}
            <label className="label text-sm font-bold font-display mt-3">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="input w-full rounded-xl border-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.email.message}</p>}

            {/* Password Input */}
            <div className="flex justify-between items-center mt-3">
              <label className="label text-sm font-bold font-display">Password</label>
              {passwordValue && (
                <span className={`text-xs font-semibold ${passwordValue.length >= 6 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {passwordValue.length >= 6 ? '✓ Strong' : 'Min 6 chars'}
                </span>
              )}
            </div>
            <input
              type="password"
              {...register("password")}
              className="input w-full rounded-xl border-2"
              placeholder="Password"
            />
            {errors.password && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.password.message}</p>}

            {/* Confirm Password Input */}
            <label className="label text-sm font-bold font-display mt-3">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="input w-full rounded-xl border-2"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.confirmPassword.message}</p>}

            {/* Submit Button guarded by isValid */}
            <button 
              type="submit"
              disabled={!isValid || isLoading}
              className="btn btn-neutral mt-6 w-full rounded-lg text-lg sm:text-xl font-bold font-display flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? "Creating..." : "Register"}</span>
              <UserPlus className="w-5 h-5" />
            </button>
          </fieldset>
        </form>
      </div>

      {/* Footer Link */}
      <div className="flex items-center justify-center gap-2 mt-6 text-sm sm:text-base font-display">
        <span className="text-text-secondary font-semibold">Already have an Account?</span>
        <Link
          to="/login"
          className="font-bold text-cyan hover:text-cyan/80 transition-all inline-flex items-center gap-1 underline underline-offset-4"
        >
          Login
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}