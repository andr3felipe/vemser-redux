import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/reqresApi/reqresApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(20, {
      message: "Password must be less than 20 characters long",
    }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function Login() {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });

  async function onSubmit(formData: LoginSchema) {
    const { email, password } = formData;

    await loginMutation({ email, password })
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        localStorage.setItem("token", JSON.stringify(payload.token));
        form.setError("root", {
          type: "success",
          message: "Login successful!",
        });

        navigate("/auth/panel");
      })
      .catch((error) => {
        console.error("rejected", error);
        form.setError("root", {
          type: "error",
          message: error.data.error,
        });
      });
  }

  return (
    <div className="min-h-[calc(100lvh-6.375rem-3.375rem)] max-w-screen">
      <div className="pl-4 pr-4 pt-[calc(10%)] pb-12 m-auto flex flex-col items-start gap-16 max-w-[1440px] justify-center text-center">
        <h1 className="w-full text-3xl font-bold">Login</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md gap-4 m-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Password"
                      autoComplete="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center justify-center w-full gap-2 disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="p-2 border-2 rounded-full size-5 border-primary-foreground/50 border-t-primary-foreground animate-spin"></svg>{" "}
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {form.formState.errors.root?.message && (
              <p
                className={`${
                  form.formState.errors.root.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {form.formState.errors.root?.message}
              </p>
            )}
          </form>

          <FormDescription className="w-full">
            Don't have an account?
            <Link to="/register" className="ml-2 text-primary">
              Register here
            </Link>
          </FormDescription>
        </Form>
      </div>
    </div>
  );
}
