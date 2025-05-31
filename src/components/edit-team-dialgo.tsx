
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
})

type TeamFormValues = z.infer<typeof teamSchema>

interface EditTeamDialogProps {
  team: { id: number; name: string }
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (name: string) => void
}

export function EditTeamDialog({ team, open, onOpenChange, onSave }: EditTeamDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name,
    },
  })

  const onSubmit = async (data: TeamFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      await updateTeam(team.id, data).catch(() => {
        // Fallback for demo purposes
        console.log("Using mock implementation for team update")
      })
      onSave(data.name)
    } catch (error) {
      console.error("Error updating team:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
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
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

async function updateTeam(teamId: number, data: TeamFormValues) {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Team with ID ${teamId} updated with data:`, data)
      resolve(null)
    }, 500)
  })
}
