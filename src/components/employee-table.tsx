"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

interface EmployeeTableProps {
  employees: any[]
  viewMode: "grid" | "list"
  onStatusChange: (id: string, status: string) => void
}

export function EmployeeTable({ employees, viewMode, onStatusChange }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No employees found. Add your first employee to get started.</p>
      </div>
    )
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="border rounded-lg p-4 flex flex-col items-center">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.firstName} />
              <AvatarFallback>
                {employee.firstName.charAt(0)}
                {employee.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-center">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-500">{employee.team}</p>
            <div className="mt-2 w-full">
              <Select value={employee.status} onValueChange={(value) => onStatusChange(employee.id, value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="invite">Invite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Line Manager</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="hidden md:table-cell">Office</TableHead>
            <TableHead className="hidden lg:table-cell">Permissions</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.firstName} />
                    <AvatarFallback>
                      {employee.firstName.charAt(0)}
                      {employee.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{employee.lineManager}</TableCell>
              <TableCell>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-md">{employee.team}</span>
              </TableCell>
              <TableCell className="hidden md:table-cell">{employee.office}</TableCell>
              <TableCell className="hidden lg:table-cell">Team Lead</TableCell>
              <TableCell>
                <Select value={employee.status} onValueChange={(value) => onStatusChange(employee.id, value)}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="invite">Invite</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
