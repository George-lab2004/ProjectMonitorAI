import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, LogIn } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import { useLoginMutation } from '../../slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import toast from 'react-hot-toast';
// /1st zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be more than 6 characters")
})
// 2nd infer the type of the schema
type loginForm = z.infer<typeof loginSchema>
export default function Login() {
  const [login] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 3rd react hook form setup and call for --"register" to send data, --"handle submit" to prevent browser reload, run zod validation we made, --"formstate" its an object contains live metadata like errors, issubmitting, isValid, --"watch" for live check used for confirm password, --"reset" to resent the values from fields, --"setValue for" you can set the values of the fields from outside the form
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset
  } = useForm<loginForm>({
    resolver: zodResolver(loginSchema), // passing the validation schema
    mode: "onChange", // it will re validate the form when the user is typing
    defaultValues: {
      email: "",
      password: ""
    }

  })
  // 4th submit handler and link to the api
  const onSubmit: SubmitHandler<loginForm> = async (data) => {
    try {
      const res = await login({ email: data.email, password: data.password }).unwrap()
      dispatch(setCredentials(res)); // using dispatch hook to save the credentials in the redux store to make it available in other components
      toast.success("Login successfully!")
      reset()
      navigate("/")
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to login.");
    }
  }
  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      {/* Responsive Title: 4xl on mobile -> 6xl on desktop */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center font-[Syne] bg-linear-to-r from-blue-900 via-primary to-gray-500 bg-clip-text text-transparent font-bold mb-6">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Responsive Form Fieldset */}
        <div className="w-full flex justify-center items-center">
          <fieldset className="fieldset rounded-box w-full max-w-md px-4 sm:px-0">
            <label className="label text-sm font-bold font-display">Email Address</label>
            <input
              type="email"
              className="input w-full rounded-xl border-2"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="text-rose-400 shadow-md text-xs mt-1">{errors.email.message}</p>}
            <label className="label text-sm font-bold font-display mt-3">Password</label>
            <input
              type="password"
              className="input w-full rounded-xl border-2"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p className="text-rose-400 shadow-md text-xs mt-1">{errors.password.message}</p>}
            <button className="btn btn-neutral mt-6 w-full rounded-lg text-lg sm:text-xl font-bold font-display flex items-center justify-center gap-2">
              <span>{isLoading ? "logging In" : "Login"}</span>
              <LogIn className="w-5 h-5" />
            </button>
          </fieldset>
        </div>

        {/* Responsive Register Footer Link */}
        <div className="flex items-center justify-center gap-2 mt-6 text-sm sm:text-base font-display">
          <span className="text-text-secondary font-semibold">Don't have an Account?</span>
          <Link
            to="/register"
            className="font-bold text-cyan hover:text-cyan/80 transition-all inline-flex items-center gap-1 underline underline-offset-4"
          >
            Register
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </form>
    </div>
  );
}
