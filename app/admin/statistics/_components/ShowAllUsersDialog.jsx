"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaMinus, FaPlus } from "react-icons/fa6";
export default function ShowAllUsersLogsDialog({ trigger, allLogs }) {
  const [open, setOpen] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState({});

  const toggleUser = (username) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  // Grupăm logurile după username
  const logsByUser = allLogs.reduce((acc, log) => {
    const username = log.user?.username || "Fără nume";
    if (!acc[username]) acc[username] = [];
    acc[username].push(log);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Orele tuturor utilizatorilor</DialogTitle>
        </DialogHeader>

        {Object.entries(logsByUser).map(([username, logs]) => {
          const isExpanded = expandedUsers[username];

          return (
            <div key={username} className="mb-6">
              <button
                onClick={() => toggleUser(username)}
                className="flex items-center gap-2 text-lg font-semibold mb-2 text-black hover:underline"
              >
                <span className="text-xl">
                  {isExpanded ? <FaMinus /> : <FaPlus />}
                </span>
                {username}
              </button>

              {isExpanded && (
                <ul className="space-y-1 pl-6">
                  {logs.map((log) => {
                    const h = Math.floor(log.minutes / 60);
                    const m = log.minutes % 60;
                    return (
                      <li
                        key={log.id}
                        className="text-sm text-gray-800 border p-2 rounded"
                      >
                        <strong>
                          {h}h {m}m
                        </strong>{" "}
                        – {log.reason} –{" "}
                        {new Date(log.createdAt).toLocaleString()}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {allLogs.length === 0 && (
          <p className="text-gray-500">Nicio înregistrare găsită.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
