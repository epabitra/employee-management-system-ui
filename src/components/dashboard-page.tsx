import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { DashboardContent } from "./dashboard-content"

export function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col pt-16 md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
