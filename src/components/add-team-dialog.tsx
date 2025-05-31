
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { createTeam } from "../services/team-service"

const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
})

type TeamFormValues = z.infer<typeof teamSchema>

interface AddTeamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTeam: (team: TeamFormValues) => void
}

export function AddTeamDialog({ open, onOpenChange, onAddTeam }: AddTeamDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: TeamFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      await createTeam(data).catch(() => {
        // Fallback for demo purposes
        console.log("Using mock implementation for team creation")
      })
      onAddTeam(data)
      form.reset()
    } catch (error) {
      console.error("Error adding team:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-900 hover:bg-purple-800 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Team"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
