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

export default function UserDialogForm({ mode, user, action, trigger }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editează User" : "Adaugă un User"}
          </DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            setError("");
            try {
              await action(formData);
              setDialogOpen(false);
            } catch (err) {
              setError(err.message || "Eroare");
            }
          }}
          className="grid gap-4"
        >
          {isEdit && <input type="hidden" name="id" value={user?.id} />}

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              defaultValue={isEdit ? user?.username : ""}
              placeholder="Nume de utilizator"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">
              {isEdit ? "Parolă nouă (opțional)" : "Parolă"}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={isEdit ? "Nouă parolă" : "Parolă"}
              required={!isEdit}
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
              {isEdit ? "Salvează" : "Creează"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
