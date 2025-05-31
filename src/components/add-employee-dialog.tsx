
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronUp } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  sendInvite: z.boolean().default(false).optional(),
  country: z.string().min(1, "Country is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  jobTitle: z.string().min(1, "Job title is required"),
  employmentType: z.enum(["permanent", "freelancer"]),
  team: z.string().min(1, "Team is required"),
  lineManager: z.string().min(1, "Line manager is required"),
  office: z.string().min(1, "Office is required"),
  currency: z.string().min(1, "Currency is required"),
  amount: z.string().min(1, "Amount is required"),
  frequency: z.enum(["monthly", "annually"]),
  salaryStartDate: z.date({
    required_error: "Salary start date is required",
  }),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

interface AddEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEmployee: (employee: any) => void
  availableTeams: any[]
}

export function AddEmployeeDialog({ open, onOpenChange, onAddEmployee, availableTeams }: AddEmployeeDialogProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "basic-details",
    "employment-details",
    "teams-offices",
    "salary-details",
  ])

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      sendInvite: false,
      country: "",
      jobTitle: "",
      employmentType: "permanent",
      team: "",
      lineManager: "",
      office: "",
      currency: "",
      amount: "",
      frequency: "monthly",
      startDate: new Date(), // Initialize with current date
      salaryStartDate: new Date(), // Initialize with current date
    },
  })

  const onSubmit = (data: EmployeeFormValues) => {
    const newEmployee = {
      id: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      jobTitle: data.jobTitle,
      employmentType: data.employmentType,
      team: data.team,
      lineManager: data.lineManager,
      office: data.office,
      currency: data.currency,
      amount: data.amount,
      frequency: data.frequency,
      salaryStartDate: format(data.salaryStartDate, "yyyy-MM-dd"),
      status: "active",
      permissions: "Team Lead",
    }

    onAddEmployee(newEmployee)
    form.reset()
  }

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section))
    } else {
      setExpandedSections([...expandedSections, section])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto w-[calc(100%-2rem)] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Details */}
            <div className="border rounded-md">
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
                onClick={() => toggleSection("basic-details")}
              >
                <div>
                  <h3 className="font-medium">Basic Details</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Organized and secure.</p>
                </div>
                {expandedSections.includes("basic-details") ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </div>

              {expandedSections.includes("basic-details") && (
                <div className="p-3 sm:p-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="sendInvite"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-xs sm:text-sm">
                              Send them an invite email so they can log in immediately
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Employment Details */}
            <div className="border rounded-md">
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
                onClick={() => toggleSection("employment-details")}
              >
                <div>
                  <h3 className="font-medium">Employment Details</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Let everyone know the essentials so they're fully prepared.
                  </p>
                </div>
                {expandedSections.includes("employment-details") ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </div>

              {expandedSections.includes("employment-details") && (
                <div className="p-3 sm:p-4 border-t space-y-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Employment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="IND">India</SelectItem>
                            <SelectItem value="EU">European Union</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) field.onChange(date)
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="permanent" />
                              </FormControl>
                              <FormLabel className="font-normal">Permanent</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="freelancer" />
                              </FormControl>
                              <FormLabel className="font-normal">Freelancer</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Teams and Offices */}
            <div className="border rounded-md">
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
                onClick={() => toggleSection("teams-offices")}
              >
                <div>
                  <h3 className="font-medium">Teams and Offices</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Keep things tidy — and save time setting appointments and public holidays.
                  </p>
                </div>
                {expandedSections.includes("teams-offices") ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </div>

              {expandedSections.includes("teams-offices") && (
                <div className="p-3 sm:p-4 border-t space-y-4">
                  <FormField
                    control={form.control}
                    name="team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTeams.length > 0 ? (
                              availableTeams.map((team) => (
                                <SelectItem key={team.id} value={team.name}>
                                  {team.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="default">No teams available</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lineManager"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Line Manager</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select line manager" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Abhishek">Abhishek</SelectItem>
                            <SelectItem value="Santanu">Santanu</SelectItem>
                            <SelectItem value="Lalat">Lalat</SelectItem>
                            <SelectItem value="Debasish">Debasish</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="office"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Name</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select office" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="TCS">TCS</SelectItem>
                            <SelectItem value="Tech Mahindra">Tech Mahindra</SelectItem>
                            <SelectItem value="Infosys">Infosys</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Salary Details */}
            <div className="border rounded-md">
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
                onClick={() => toggleSection("salary-details")}
              >
                <div>
                  <h3 className="font-medium">Salary Details</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Stored securely, only visible to Super Admins, Payroll Admins, and themselves.
                  </p>
                </div>
                {expandedSections.includes("salary-details") ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </div>

              {expandedSections.includes("salary-details") && (
                <div className="p-3 sm:p-4 border-t space-y-4">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD (US Dollar)</SelectItem>
                            <SelectItem value="INR">INR (Indian Rupee)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) field.onChange(date)
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-900 hover:bg-purple-800 w-full sm:w-auto">
                Add Team Member
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
