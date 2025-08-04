"use client";

import { useState, useEffect } from "react";
import { fetchUsers, registerUser } from "@/lib/api";

interface User {
  username: string;
  full_name?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(username, password);
    setUsername("");
    setPassword("");
    await loadUsers();
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <ul className="mb-4 list-disc pl-5">
        {users.map((u) => (
          <li key={u.username}>{u.username}</li>
        ))}
      </ul>
      <form onSubmit={handleRegister} className="flex gap-2">
        <input
          className="border p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-500 px-4 text-white">
          Add
        </button>
      </form>
    </div>
  );
}

