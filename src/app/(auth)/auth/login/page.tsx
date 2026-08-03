"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/Button";
import Title from "./components/Title";
import { AuthAction } from "@/modules/auth/application/auth.action";
import {
  loginInput,
  loginSchema,
} from "@/modules/auth/application/validators/loginSchema";

const page = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const authAction = new AuthAction();
      const formData = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as loginInput;
      const validatedInputs = loginSchema.parse(formData);
      const result = await authAction.loginAction(validatedInputs);
      if (result.success) {
        router.push("/administrator/control-panel");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] ">
      <Title />
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 w-full max-w-[260px]"
      >
        <div className="form flex flex-col justify-center gap-2 ">
          <div className="form_label flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="bg-(--color-bg-section) p-2 rounded-lg"
            />
          </div>
          <div className="form_label flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="bg-(--color-bg-section) p-2 rounded-lg"
            />
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <Button variant="primary" className="mt-2" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default page;
