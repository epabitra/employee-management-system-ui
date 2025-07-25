import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  description: z.string().min(1, "Team description is required"),
})

type TeamFormValues = z.infer<typeof teamSchema>

interface EditTeamDialogProps {
  teamName: { uuid: string; teamName: string; description: string }
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (teamName: string, description: string) => void
}

export function EditTeamDialog({ teamName, open, onOpenChange, onSave }: EditTeamDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: teamName.teamName,
      description: teamName.description,
    },
  })

  const onSubmit = async (data: TeamFormValues) => {
    setIsSubmitting(true)
    try {
      await onSave(data.teamName, data.description) // Direct call to parent
      onOpenChange(false)
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
              name="teamName"
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team description" {...field} />
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
