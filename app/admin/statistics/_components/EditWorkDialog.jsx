"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditWorkDialog({ trigger, actions, workLog, user }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [localLogs, setLocalLogs] = useState(workLog); // înlocuiește workLog

  const handleSubmit = async (formData) => {
    setError("");
    try {
      await actions.update(formData);
      setDialogOpen(false);
    } catch (err) {
      setError(err.message || "Eroare la salvare");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editare intrări ore muncă</DialogTitle>
        </DialogHeader>

        {workLog.length > 0 ? (
          <form action={handleSubmit} className="space-y-4">
            {workLog.map((log) => {
              const totalMinutes = log.minutes;
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;

              return (
                <div key={log.id} className="border-b pb-4 mb-4">
                  <div className="grid gap-1 text-sm text-muted-foreground mb-2">
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
                      <Label htmlFor={`hours-${log.id}`} className="mb-2">
                        Ore
                      </Label>
                      <Input
                        id={`hours-${log.id}`}
                        name={`hours-${log.id}`}
                        type="number"
                        defaultValue={hours}
                        min={0}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`minutes-${log.id}`} className="mb-2">
                        Minute
                      </Label>
                      <Input
                        id={`minutes-${log.id}`}
                        name={`minutes-${log.id}`}
                        type="number"
                        defaultValue={minutes}
                        min={0}
                        max={59}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`reason-${log.id}`} className="mb-2">
                        Motiv
                      </Label>
                      <Input
                        id={`reason-${log.id}`}
                        name={`reason-${log.id}`}
                        type="text"
                        defaultValue={log.reason}
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={async () => {
                        setError("");
                        try {
                          await actions.delete(log.id);
                          setLocalLogs((prev) =>
                            prev.filter((l) => l.id !== log.id)
                          ); // elimină vizual
                        } catch (err) {
                          setError(err.message || "Eroare la ștergere");
                        }
                      }}
                      className="bg-red-300 hover:bg-red-500 border"
                    >
                      Șterge
                    </Button>
                  </div>
                </div>
              );
            })}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="bg-green-300 hover:bg-green-500 border"
            >
              Salvează
            </Button>
          </form>
        ) : (
          <p className="text-gray-500">
            Nu există loguri de muncă pentru editare.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
