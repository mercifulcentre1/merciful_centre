"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    
    // If there's no token and we're not already on the login page, redirect to login
    if (!token && pathname !== "/mcadminportal/login") {
      router.push("/mcadminportal/login");
    } else if (token && pathname === "/mcadminportal/login") {
      // If we have a token and are on the login page, redirect to dashboard
      router.push("/mcadminportal");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Don't render children until authentication is verified (unless on login page)
  if (!isAuthenticated && pathname !== "/mcadminportal/login") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
