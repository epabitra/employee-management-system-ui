import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function LeavePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col pt-16 md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Leave management content will be displayed here.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}