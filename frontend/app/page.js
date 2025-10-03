'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('http://localhost:5050/login', {
        username,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('author_id', res.data.author_id); // ✅ fix sesuai backend
        alert('Login berhasil!');
        router.push('/post');
      }
    } catch (err) {
      console.error('Login failed:', err);
      const msg = err.response?.data?.error || 'Login gagal, coba lagi';
      alert(msg);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-full max-w-md bg-pink-300 border-4 border-black rounded-lg p-8 shadow-[8px_8px_0px_rgb(0,0,0)] text-black">
        <h1 className="text-3xl font-extrabold text-center mb-8 border-4 border-black bg-white py-3">
          Login Admin
        </h1>

        <form className="space-y-5 mb-10" onSubmit={handleLogin}>
          <div>
            <label className="block font-bold mb-1">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border-4 border-black rounded-md bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border-4 border-black rounded-md bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-400 border-4 border-black text-black font-extrabold rounded-md shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-transform"
          >
            LOGIN
          </button>
        </form>

        <div className="text-center flex-col">
          <p className="font-semibold">Kamu bukan admin? Langsung masuk aja</p>
          <a href="/post">
            <div className="rounded-md px-4 py-2 w-fit h-fit bg-green-300 border-4 border-black shadow-[4px_4px_0px_#000] m-auto mt-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-transform">
              <p className="text-black font-extrabold">Lihat Blog</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
