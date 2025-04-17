import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Users, Building2, FileText, DollarSign } from 'lucide-react'
import { EmployeeChart } from "./employee-chart"
import { SalaryChart } from "./salary-chart"
import { TodayEvents } from "./today-events"
import { TeamLeads } from "./team-leads"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface DashboardContentProps {
  dashboardType: "admin" | "employee";
  setDashboardType: (type: "admin" | "employee") => void;
}

export function DashboardContent({ dashboardType, setDashboardType }: DashboardContentProps) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleTabChange = (value: string) => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    setDashboardType(value as "admin" | "employee")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="admin" value={dashboardType} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          <TabsTrigger value="employee">Employees Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="space-y-6">
          {/* Metric Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Employees" value="700" icon={Users} iconColor="bg-purple-900" />
            <MetricCard title="Companies" value="30" icon={Building2} iconColor="bg-amber-500" />
            <MetricCard title="Leaves" value="3" icon={FileText} iconColor="bg-red-500" />
            <MetricCard title="Salary" value="$5.8M" icon={DollarSign} iconColor="bg-green-500" />
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <EmployeeChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Salary By Unit</CardTitle>
              </CardHeader>
              <CardContent>
                <SalaryChart />
              </CardContent>
            </Card>
          </div>

          {/* Additional Sections */}
          <div className="grid gap-4 md:grid-cols-2">
            <TodayEvents />
            <TeamLeads />
          </div>
        </TabsContent>

        <TabsContent value="employee">
          <Card>
            <CardHeader>
              <CardTitle>Employee Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Employee dashboard content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Define the MetricCardProps interface
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
}

function MetricCard({ title, value, icon: Icon, iconColor }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-md ${iconColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}