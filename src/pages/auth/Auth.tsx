import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuthTheme, UserType } from "@/hooks/useAuthTheme";

export default function Auth() {
  const { userType, setUserType } = useAuthTheme();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };

  const title = authMode === "login" ? "Welcome Back" : "Create Account";
  const subtitle = authMode === "login"
    ? "Sign in to continue your healthcare journey"
    : "Join PharmEco to get started";

  return (
    <AuthLayout
      userType={userType}
      onUserTypeChange={handleUserTypeChange}
      title={title}
      subtitle={subtitle}
    >
      <AnimatePresence mode="wait">
        {authMode === "login" ? (
          <LoginForm
            key="login"
            userType={userType}
            onSwitchToRegister={() => setAuthMode("register")}
          />
        ) : (
          <RegisterForm
            key="register"
            userType={userType}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
