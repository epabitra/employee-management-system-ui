
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"

interface AddTeamMemberDialogProps {
  team: { id: number; name: string }
  open: boolean
  onOpenChange: (open: boolean) => void
  employees: any[]
  onAddMember: (employeeId: string) => void
}

export function AddTeamMemberDialog({ team, open, onOpenChange, employees, onAddMember }: AddTeamMemberDialogProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedEmployee) return

    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onAddMember(selectedEmployee)
    } catch (error) {
      console.error("Error adding team member:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add Member to {team.name}</DialogTitle>
        </DialogHeader>

        {employees.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-gray-500">No available employees to add.</p>
            <p className="text-gray-500 text-sm mt-2">Add employees first or all employees are already in this team.</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[400px] pr-4">
            <RadioGroup value={selectedEmployee || ""} onValueChange={setSelectedEmployee}>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center space-x-4 border rounded-md p-3">
                    <RadioGroupItem value={employee.id} id={`employee-${employee.id}`} />
                    <Label
                      htmlFor={`employee-${employee.id}`}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Avatar>
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.firstName} />
                        <AvatarFallback>
                          {employee.firstName?.charAt(0)}
                          {employee.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{employee.jobTitle}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </ScrollArea>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
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
            onClick={handleSubmit}
            className="bg-purple-900 hover:bg-purple-800 w-full sm:w-auto"
            disabled={!selectedEmployee || isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
