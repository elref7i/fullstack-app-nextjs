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
import { createNewProject } from "@/lib/api/api";

const NewTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createNewProject({ name, description });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 py-8">
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-card hover:bg-accent hover:text-accent-foreground border-2 border-dashed border-border hover:border-accent transition-all duration-200 h-auto py-4 px-6 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] bg-background border border-border rounded-xl shadow-lg">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Create New Task
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Provide details for your new Task. Fill in the information below
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
                Task Title *
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
                Task Description
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
    </div>
  );
};

export default NewTask;
