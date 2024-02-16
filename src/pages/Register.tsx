import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/api/reqresApi/reqresApi";
import { isCustomError } from "@/redux/api/reqresApi/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .max(20, {
        message: "Password must be less than 20 characters long",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export function Register() {
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "pistol",
      confirmPassword: "pistol",
    },
  });

  async function onSubmit(formData: RegisterSchema) {
    const { email, password } = formData;

    try {
      const res = await registerMutation({ email, password });

      if (isCustomError(res)) {
        form.setError("root", {
          type: "error",
          message: "Something went wrong! Please try again.",
        });
        return console.error(
          `Status: ${res.error.status}\n Error: ${res.error.data.error}`
        );
      }

      console.log(res);
      form.setError("root", {
        type: "success",
        message: "Registration successful!",
      });

      form.setValue("email", "");
      form.setValue("password", "");
      form.setValue("confirmPassword", "");
    } catch (error) {
      if (isCustomError(error)) {
        console.error("Custom error details:", error.error.data.error);
        console.error("HTTP status code:", error.error.status);
      } else {
        console.error("Generic error details:", error);
      }
    }
  }

  return (
    <div className="min-h-[calc(100lvh-6.375rem-3.375rem)] max-w-screen">
      <div className="pl-4 pr-4 pt-[calc(10%)] pb-12 m-auto flex flex-col items-start gap-16 max-w-[1440px] justify-center text-center">
        <h1 className="w-full text-3xl font-bold">Register</h1>

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
                    <Input placeholder="Email" type="text" {...field} />
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
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
            {form.formState.errors.root?.type === "success" && (
              <Button>
                <NavLink to={"/login"}>Go to Login</NavLink>
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
