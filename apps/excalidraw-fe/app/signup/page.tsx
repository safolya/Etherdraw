"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FormInput, 
  AuthContainer, 
  AuthHeader, 
  AuthButton 
} from "../../components/auth/auth-components";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign up failed");
        return;
      }

      router.push("/signin");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthHeader 
        title="Create Account" 
        subtitle={
          <>
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Username"
          type="text"
          required
          minLength={3}
          maxLength={20}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Choose a username"
        />

        <FormInput
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Enter your email"
        />

        <FormInput
          label="Password"
          type="password"
          required
          minLength={5}
          maxLength={10}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Create a password"
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <AuthButton type="submit" loading={loading}>
          Create account
        </AuthButton>
      </form>
    </AuthContainer>
  );
}