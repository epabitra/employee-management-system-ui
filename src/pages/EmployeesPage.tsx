import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function EmployeesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col pt-16 md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Employees page content will be displayed here.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}