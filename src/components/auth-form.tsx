import { register, siginin } from "@/lib/api/api";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const intial = { email: "", password: "", firstName: "", lastName: "" };

const AuthForm = ({ mode }: { mode: string }) => {
  // Status
  const [formState, setFormState] = useState({ ...intial });

  // Navigation
  const Route = useRouter();

  const handleSubmit = async (e) => {
    e.PrevntSubmit();

    if (mode === "register") {
      await register(formState);
    } else {
      await siginin(formState);
    }
  };
};
export default AuthForm;
