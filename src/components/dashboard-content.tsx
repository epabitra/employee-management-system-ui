import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Users, Handshake, Landmark, IndianRupee } from 'lucide-react'
import { EmployeeChart } from "./employee-chart"
import { SalaryChart } from "./salary-chart"
import { TodayEvents } from "./today-events"
import { TeamLeads } from "./team-leads"
import { useAuth } from "../context/useAuth"
import { useEffect, useState } from "react"
import axios from "axios"
import { TOTAL_COUNT } from "@/constants/constants"

export function DashboardContent() {
  const { user } = useAuth()
  const roleArray = user?.roles
  const role = Array.isArray(roleArray) ? roleArray[0]?.toUpperCase()?.trim() : null

  console.log("User Role:", role)

  const [metrics, setMetrics] = useState<{ employeeCount?: number, totalDepartments?: number, totalTeams?: number, totalSalary?: number,  }>({});

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        if (role === "ADMIN") {
          const response = await axios.get(TOTAL_COUNT);
          setMetrics(response.data); 
        }
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };

    fetchMetrics();
  }, [role]);


  if (role === "ADMIN") {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Employees" 
            value={metrics.employeeCount?.toString() || "Loading..."} 
            icon={Users} 
            iconColor="bg-purple-900" 
          />
          <MetricCard 
            title="Departments" 
            value={metrics.totalDepartments?.toString() || "Loading..."} 
            icon={Landmark} 
            iconColor="bg-amber-500" 
          />
          <MetricCard 
            title="Teams" 
            value={metrics.totalTeams?.toString() || "Loading..."} 
            icon={Handshake} 
            iconColor="bg-red-500"
          />
          <MetricCard 
            title="Salary" 
            value={metrics.totalSalary?.toString() || "Loading..."}  
            icon={IndianRupee} 
            iconColor="bg-green-500" />
        </div>

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

        <div className="grid gap-4 md:grid-cols-2">
          <TodayEvents />
          <TeamLeads />
        </div>
      </div>
    )
  }

  if (role === "EMPLOYEE") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Employee Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Employee dashboard content will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center text-red-600 font-medium">
      Unauthorized: Invalid role or not logged in.
    </div>
  )
}

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
