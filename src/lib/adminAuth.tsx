import React from "react";
import { useAuth } from "@/lib/auth";

// Re-export useAuth as useAdminAuth for backward compat with admin pages
export function useAdminAuth() {
  const auth = useAuth();
  return {
    isAuthenticated: auth.isAdmin,
    logout: auth.signOut,
  };
}

// AdminAuthProvider is now a passthrough — real auth is in AuthProvider
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
