'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5050/login', {
        username,
        password,
      });

      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('author_id', res.data.author_id);
        router.push('/post');
      }
    } catch (err) {
      setError('Login failed. Please check your username and password.');
      console.error(err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-full max-w-md bg-pink-300 border-4 border-black p-8 shadow-[8px_8px_0px_rgb(0,0,0)] text-black">
        <h1 className="text-3xl font-extrabold text-center mb-8 border-4 border-black bg-white py-3">
          Login Admin
        </h1>

        <form className="space-y-5 mb-10" onSubmit={handleLogin}>
          <div>
            <label className="block font-bold mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
              placeholder="Masukkan username"
              value={username} // 4. Ikat value ke state
              onChange={(e) => setUsername(e.target.value)} // 5. Perbarui state saat ada perubahan
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
              placeholder="Masukkan password"
              value={password} // Ikat value ke state
              onChange={(e) => setPassword(e.target.value)} // Perbarui state saat ada perubahan
            />
          </div>

          {error && <p className="text-red-600 font-bold">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-400 border-4 border-black text-black font-extrabold shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-transform active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
          >
            LOGIN
          </button>
        </form>

        <div className="text-center flex-col">
          <p className="font-bold">Kamu bukan admin? Langsung masuk aja 👇</p>
          <a href="/post">
            <div className="inline-block mt-4">
              <p className="text-black font-extrabold rounded-md px-4 py-2 bg-green-300 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                Lihat Blog
              </p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
