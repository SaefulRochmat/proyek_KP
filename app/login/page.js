'use client'; // Karena kita menggunakan state dan efek

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, action: 'login' }),
    });

    console.log('Status:', res.status); // Log status respons

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token); // Simpan token di local storage
      router.push('/dashboard'); // Redirect ke dashboard
    } else {
      const data = await res.json();
      console.log('Error:', data.error);
      alert('Login gagal, silakan periksa kembali username dan password.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-4 border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 border p-2 w-full"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
