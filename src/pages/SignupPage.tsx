import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useAuth } from "../context/useAuth"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { GET_ALL_DEPARTMENTS, GET_ALL_ROLES } from "../constants/constants"
import { SignupFormValues, signupSchema } from "@/models/SignupForm"



type Role = {
  id: number
  uuid: string
  name: string
}

type Dept = {
  id: number
  uuid: string
  name: string
}

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  // const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [departments, setDepartments] = useState<Dept[]>([])
  const { registerUser } = useAuth()



  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      passwordHash: "",
      confirmPassword: "",
      langKey: "en",
      mobileNumber: "",
      roleUuid: "",
      departmentUuid: "",
    },
  })

  // // profile image handler
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     form.setValue("imageUrl", file)
  //     const reader = new FileReader()
  //     reader.onloadend = () => setImagePreview(reader.result as string)
  //     reader.readAsDataURL(file)
  //   }
  // }

  //Create Account
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setError("")

    const payload = {
      ...data,
      dateOfBirth: data.dateOfBirth.toISOString().split("T")[0], // 'yyyy-MM-dd'
    };

    console.log("Register Payload:", payload); 
    await registerUser(payload);
    setIsLoading(false);

  }

  //fetch all roles
  async function getAllRoles() {
    try {
      const response = await axios.get<Role[]>(GET_ALL_ROLES)
      if (response.status === 200) {
        setRoles(response.data)
      }
    } catch (error) {
      console.error("Error fetching roles:", error)
    }
  }

  //fetch all departments
  async function getAllDepartments() {
    try {
      const response = await axios.get<Dept[]>(GET_ALL_DEPARTMENTS)
      if (response.status === 200) {
        setDepartments(response.data)
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }
  

  useEffect(() => {
    getAllRoles()
    getAllDepartments()
  }, [])

  return (
    <div className="flex min-h-screen">
      <div className="fixed w-1/2 hidden h-screen md:flex md:w-1/2 bg-[#4b0082] items-center justify-center">
        <h1 className="text-7xl font-bold italic text-white ">Work Track</h1>
      </div>

      <div className="w-full md:ml-[50%] md:w-1/2 overflow-y-auto flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-4xl font-bold italic text-[#4b0082]">Work Track</h1>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <p className="text-gray-500">Create your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="passwordHash"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="mobileNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="dateOfBirth"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="departmentUuid"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          departments.map((dept) => (
                            <SelectItem key={dept.uuid} value={dept.uuid}>
                              {dept.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="roleUuid"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.uuid} value={role.uuid}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />



              {/* <div>
                <FormLabel>Profile Picture</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="mt-2 w-20 h-20 rounded-full object-cover"
                  />
                )}
              </div> */}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-[#4b0082] hover:bg-[#3b0062]" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Create Account"}
              </Button>

              <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline">
                  Log in
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
