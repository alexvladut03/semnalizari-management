"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

export default function UserRegister() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Eroare la înregistrare");
      return;
    }

    // ✅ Resetare formular + închidere dialog + refresh
    setUsername("");
    setPassword("");
    setDialogOpen(false);
    router.refresh();
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center border-b border-amber-500 pb-4">
        Users
      </h1>

      <div className="flex justify-end w-full">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="my-4 bg-gray-500/70 hover:bg-gray-400/90 text-white">
              Adaugă User
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Adaugă un User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegister} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Nume de utilizator"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Parolă</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Parolă"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-300 hover:bg-red-500"
                  >
                    Anulează
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-gray-300 hover:bg-green-500 border"
                >
                  Creează
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
