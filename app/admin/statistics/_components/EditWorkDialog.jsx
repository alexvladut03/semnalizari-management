"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditWorkDialog({ trigger, action, workLog, user }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  // const { update, refetch } = action;
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editare intrări ore muncă</DialogTitle>
        </DialogHeader>

        {workLog.length > 0 ? (
          workLog.map((log) => {
            const totalMinutes = log.minutes;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            return (
              <form
                key={log.id}
                action={async (formData) => {
                  setError("");
                  try {
                    await action(formData);
                    setDialogOpen(false);
                  } catch (err) {
                    setError(err.message || "Eroare la salvare");
                  }
                }}
                className="grid gap-4 border-b pb-4 mb-4"
              >
                <input type="hidden" name="id" value={log.id} />

                <div className="grid gap-1 text-sm text-muted-foreground">
                  <div>
                    <strong>Utilizator:</strong> {user}
                  </div>
                  <div>
                    <strong>Creat la:</strong>{" "}
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-end">
                  <div>
                    <Label htmlFor={`hours-${log.id}`} className="mb-1">
                      Ore
                    </Label>
                    <Input
                      id={`hours-${log.id}`}
                      name="hours"
                      type="number"
                      defaultValue={hours}
                      min={0}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`minutes-${log.id}`} className="mb-1">
                      Minute
                    </Label>
                    <Input
                      id={`minutes-${log.id}`}
                      name="minutes"
                      type="number"
                      defaultValue={minutes}
                      min={0}
                      max={59}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`reason-${log.id}`} className="mb-1">
                      Motiv
                    </Label>
                    <Input
                      id={`reason-${log.id}`}
                      name="reason"
                      type="text"
                      defaultValue={log.reason}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-red-300 hover:bg-red-500 border"
                  >
                    Sterge
                  </Button>
                </div>

                {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
              </form>
            );
          })
        ) : (
          <p className="text-gray-500">
            Nu există loguri de muncă pentru editare.
          </p>
        )}

        <Button
          type="submit"
          className="bg-green-300 hover:bg-green-500 border"
        >
          Salvează
        </Button>
      </DialogContent>
    </Dialog>
  );
}
