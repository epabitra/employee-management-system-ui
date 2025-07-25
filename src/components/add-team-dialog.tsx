import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createTeam } from "../services/team-service";

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  description: z.string().min(1, "Description is required"),
});

type TeamFormValues = z.infer<typeof teamSchema>;

interface AddTeamDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onTeamCreated: () => Promise<void>;
}

export function AddTeamDialog({
  isOpen,
  setIsOpen,
  onTeamCreated,
}: AddTeamDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      description: "",
    },
  });

const onSubmit = async (data: TeamFormValues) => {
  setIsSubmitting(true);
  try {
    await createTeam(data);
    console.log("Team successfully created, calling onAddTeam...");
    console.log(data)
    await new Promise(res => setTimeout(res, 500));
    await onTeamCreated();
    form.reset();
    setIsOpen(false);
  } catch (error) {
    console.error("Error adding team:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
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
                onClick={() => setIsOpen(false)}
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
                {isSubmitting ? "Creating..." : "Create Team"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
