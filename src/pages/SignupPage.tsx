"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useAuth } from "../context/AuthContext"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"

const signupSchema = z
  .object({
    first_name: z.string().min(3, { message: "First name must be at least 3 characters" }),
    last_name: z.string().min(3, { message: "Last name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password_hash: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string(),
    image_url: z.any().optional(),
    lang_key: z.string().default("en").optional(),
    timezone_id: z.string(),
    phone: z.string().min(5, { message: "Please enter a valid phone number" }),
    dob: z.date({
      required_error: "Please select a date of birth",
    }),
    department: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password_hash === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeZones, setTimeZones] = useState<string[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const navigate = useNavigate()
  const { signup } = useAuth()

  const form = useForm<SignupFormValues, any>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password_hash: "",
      confirm_password: "",
      lang_key: "en",
      timezone_id: "",
      phone: "",
      department: "",
      role: "",
    },
  })

  useEffect(() => {
    try {
      const tzList = Intl.DateTimeFormat().resolvedOptions().timeZone
        ? ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo", "Asia/Kolkata"]
        : ["UTC"];
      setTimeZones(tzList)
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
      form.setValue("timezone_id", userTz)
    } catch (error) {
      console.error("Error fetching timezones:", error)
      setTimeZones(["UTC", "America/New_York", "Europe/London", "Asia/Tokyo", "Asia/Kolkata"])
    }
  }, [form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image_url", file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setError("")

    try {
      const userDetails = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password_hash: data.password_hash,
        image_url: imagePreview,
        lang_key: data.lang_key,
        timezone_id: data.timezone_id,
        phone: data.phone,
        dob: format(data.dob, "yyyy-MM-dd"),
        role: data.role,
        department: data.department,
      }
      
      const success = await signup(userDetails)
      if (success) {navigate("/"); console.log(userDetails);} 
      else setError("Failed to create account. Email might already be in use.")
    } catch (err) {
      setError("An error occurred during signup")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-[#4b0082] items-top justify-center">
        <h1 className="text-7xl font-bold italic text-white mt-[250px]">EmpMng</h1>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-4xl font-bold italic text-[#4b0082]">EmpMng</h1>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <p className="text-gray-500">Create your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="first_name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl><Input placeholder="Enter your first name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="last_name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl><Input placeholder="Enter your last name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="Enter your email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="password_hash" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="Create a password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="confirm_password" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl><Input type="password" placeholder="Confirm password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="phone" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input placeholder="Enter your phone number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="dob" control={form.control} render={({ field }) => (
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
              )} />

              <FormField name="department" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="role" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField
                control={form.control}
                name="timezone_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {timeZones.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Profile Picture</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Create Account"}
              </Button>

              <p className="text-center text-sm mt-2">
                Already have an account? <Link to="/login" className="text-blue-600 underline">Log in</Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
