"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { createNewPorject } from "@/lib/api/api";
import { useRouter } from "next/navigation";

const NewProject = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createNewPorject({ name, description });
      setIsOpen(false);
      // Reset form
      setName("");
      setDescription("");
      // Refresh the page to show new data
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-card hover:bg-accent hover:text-accent-foreground border-2 border-dashed border-border hover:border-accent transition-all duration-200 h-auto py-2 px-4 rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-background border border-border rounded-xl shadow-lg">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Project
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Provide details for your new project. Fill in the information below
            to get started.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="project-title"
              className="text-sm font-medium text-foreground"
            >
              Project Title *
            </Label>
            <Input
              id="project-title"
              placeholder="Enter project title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border-border focus:ring-ring focus:border-ring"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="project-description"
              className="text-sm font-medium text-foreground"
            >
              Project Description
            </Label>
            <Textarea
              id="project-description"
              placeholder="Provide a brief description of your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-input border-border focus:ring-ring focus:border-ring min-h-[100px] resize-none"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
