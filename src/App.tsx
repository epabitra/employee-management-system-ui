import type React from "react"
import { Routes, Route, Navigate, } from "react-router-dom"
import { DashboardPage } from "./components/dashboard-page"
import EmployeesPage from "./pages/EmployeesPage"
import CompanyPage from "./pages/CompanyPage"
import CalendarPage from "./pages/CalendarPage"
import LeavePage from "./pages/LeavePage"
import ReviewsPage from "./pages/ReviewsPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { UserProvider, } from "./context/useAuth"
import { ToastContainer } from "react-toastify"
import { ProtectedRoute } from "./models/ProtectedRoute"



const ViewOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  // We will allow viewing, but components will check auth status
  return <>{children}</>
}



function AppRoutes() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ViewOnlyRoute>
            <DashboardPage />
          </ViewOnlyRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <CompanyPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ViewOnlyRoute>
            <CalendarPage />
          </ViewOnlyRoute>
        }
      />

      <Route
        path="/leave"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <LeavePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reviews"
        element={
          <ViewOnlyRoute>
            <ReviewsPage />
          </ViewOnlyRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE", "ADMIN"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ViewOnlyRoute>
            <SettingsPage />
          </ViewOnlyRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {

  return (
    <UserProvider>
      <AppRoutes />
      <ToastContainer />
    </UserProvider>
  )
}

export default App
