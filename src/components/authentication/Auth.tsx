import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

import { useAppDispatch } from "@/hooks/redux";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "@/redux/api/authApiSlice";
import {
  onCloseLogin,
  onCloseRegister,
  onToggle,
} from "@/redux/reducer/accountSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

interface AuthProps {
  title: string;
  description: string;
  btnTitle: string;
  btnText: string;
  btnLink: string;
  submitBtnLabel: string;
  mode: "model" | "page";
  formType: "register" | "login";
}

const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(7, {
    message: "Password must be at least 8 characters.",
  }),
});

const formRegisterSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(7, {
    message: "Password must be at least 8 characters.",
  }),
});

const Auth: React.FC<AuthProps> = ({
  description,
  title,
  btnTitle,
  btnText,
  btnLink,
  submitBtnLabel = "Sign up",
  mode = "model",
  formType,
}) => {
  const dispatch = useAppDispatch();
  const [register] = useRegistrationMutation();

  const [login] = useLoginMutation();

  // 1. Define your form.
  const loginForm = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  async function onRegisterSubmit(values: z.infer<typeof formRegisterSchema>) {
    try {
      const { id } = await register(values).unwrap();
      if (id) {
        toast.success("Register Success");
        dispatch(onCloseRegister());
      }
    } catch (err) {
      console.error(err);
      toast.error("Register failed");
    }
  }

  async function onLoginSubmit(values: z.infer<typeof formLoginSchema>) {
    try {
      const { id } = await login(values).unwrap();
      if (id) {
        toast.success("Login success");
        dispatch(onCloseLogin());
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  }

  const handleToggleMode = () => {
    dispatch(onToggle({ formType }));
  };

  if (mode === "model") {
    return (
      <>
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>

          {formType === "register" && (
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                className="grid gap-4"
              >
                <RegisterForm form={registerForm} />

                <Button type="submit" className="w-full">
                  {submitBtnLabel}
                </Button>
              </form>
            </Form>
          )}

          {formType === "login" && (
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="grid gap-4"
              >
                <LoginForm form={loginForm} />

                <Button type="submit" className="w-full">
                  {submitBtnLabel}
                </Button>

                {/* Demo Account Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-4 flex items-center">
                    <h2 className="flex-1 text-lg font-semibold text-pretty">
                      Email
                    </h2>
                    <p className="text-sm text-gray-800 font-bold">
                      demo@demo.com
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center">
                    <h2 className="grow text-lg font-semibold text-pretty">
                      Password
                    </h2>
                    <p className="text-sm text-gray-800 font-bold">12345678</p>
                  </div>
                </div>
              </form>
            </Form>
          )}

          <div className="mt-4 text-center text-sm">
            {btnText}{" "}
            <Button onClick={handleToggleMode} variant={"link"}>
              {btnTitle}
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[729px] 2xl:min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[400px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-balance text-muted-foreground">
                {description}
              </p>
            </div>

            {formType === "register" && (
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="grid gap-4"
                >
                  <RegisterForm form={registerForm} />

                  <Button type="submit" className="w-full">
                    {submitBtnLabel}
                  </Button>
                </form>
              </Form>
            )}

            {formType === "login" && (
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="grid gap-4"
                >
                  <LoginForm form={loginForm} />

                  <Button type="submit" className="w-full">
                    {submitBtnLabel}
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-4 text-center text-sm">
              {btnText}{" "}
              <Link to={btnLink} className="underline">
                {btnTitle}
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default Auth;
