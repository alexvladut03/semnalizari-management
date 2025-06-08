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

export default function AddWorkDialog({ trigger, action }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Adaugă Ore de Muncă</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            setError("");
            try {
              await action(formData);
              setDialogOpen(false);
            } catch (err) {
              setError(err.message || "Eroare la salvare");
            }
          }}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="hours">Ore</Label>
            <Input
              id="hours"
              name="hours"
              type="number"
              placeholder="Ex: 2"
              min={0}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="minutes">Minute</Label>
            <Input
              id="minutes"
              name="minutes"
              type="number"
              placeholder="Ex: 30"
              min={0}
              max={59}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Motiv</Label>
            <Input
              id="reason"
              name="reason"
              type="text"
              placeholder="Ex: Proiect X"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-red-300 hover:bg-red-500 border"
              >
                Anulează
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-green-300 hover:bg-green-500 border"
            >
              Salvează
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
