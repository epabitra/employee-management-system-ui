import type React from "react"

import { Routes, Route, Navigate } from "react-router-dom"
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
import { AuthProvider, useAuth } from "./context/AuthContext"

// Replace the ProtectedRoute component with a ViewOnlyRoute component
// This allows viewing the dashboard but requires login for functionality

const ViewOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  // We'll allow viewing, but components will check auth status for functionality
  return <>{children}</>
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

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
          <ViewOnlyRoute>
            <EmployeesPage />
          </ViewOnlyRoute>
        }
      />

      <Route
        path="/company"
        element={
          <ViewOnlyRoute>
            <CompanyPage />
          </ViewOnlyRoute>
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
          <ViewOnlyRoute>
            <LeavePage />
          </ViewOnlyRoute>
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
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App