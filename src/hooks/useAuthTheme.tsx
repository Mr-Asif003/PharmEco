import { useState, useEffect } from "react";

export type UserType = "customer" | "retailer";

export function useAuthTheme() {
  const [userType, setUserType] = useState<UserType>("customer");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("auth-customer", "auth-retailer");
    root.classList.add(`auth-${userType}`);
  }, [userType]);

  return { userType, setUserType };
}
