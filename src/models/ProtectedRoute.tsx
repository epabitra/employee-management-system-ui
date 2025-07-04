import { useAuth } from "@/context/useAuth";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
  </div>
)

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

const userRoles = Array.isArray(user?.roles) ? user.roles.map((r) => r.toUpperCase()) : [];
const isAuthorized = userRoles.some((role) => allowedRoles.includes(role));


  useEffect(() => {
    if (!loading && !isAuthorized && !hasShownToast.current) {
      toast.error("Unauthorized access");
      hasShownToast.current = true;
      navigate(-1); 
    }
  }, [loading, isAuthorized]);

  if (loading) return <LoadingSpinner />;

  // Block access while redirecting
  if (!isAuthorized) return null;

  return <>{children}</>;
};
